import { ref } from 'vue';

const DEFAULT_TIMEOUT_MS = 30000;
const DEFAULT_RETRY_DELAY_MS = 1000;
const TRANSIENT_STATUS_CODES = new Set([408, 429, 502, 503, 504]);
const ERROR_BODY_SAMPLE_LENGTH = 500;

type ParsedResponse = {
  data: unknown;
  bodyText: string;
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type RequestOptions = {
  params?: Record<string, any>;
  body?: Record<string, any>;
  timeout?: number;
  retry?: number;
  retryDelay?: number;
};

type BuiltRequestUrl = {
  finalUrl: string;
  safeUrl: string;
};

export class ApiRequestError extends Error {
  status?: number;
  method: string;
  url: string;
  responseBody?: string;
  retriable: boolean;

  constructor(
    message: string,
    details: { status?: number; method: string; url: string; responseBody?: string; retriable?: boolean }
  ) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = details.status;
    this.method = details.method;
    this.url = details.url;
    this.responseBody = details.responseBody;
    this.retriable = details.retriable ?? false;
  }
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const calculateRetryDelay = (baseDelay: number, attempt: number) => {
  const exponentialDelay = baseDelay * 2 ** attempt;
  const jitter = Math.floor(Math.random() * Math.min(250, baseDelay));
  return exponentialDelay + jitter;
};

const getSafeUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    parsedUrl.searchParams.forEach((value, key) => {
      if (/token|secret|password|email|captcha|turnstile/i.test(key)) {
        parsedUrl.searchParams.set(key, '[redacted]');
      }
    });
    return `${parsedUrl.pathname}${parsedUrl.search}`;
  } catch {
    return url;
  }
};

const buildRequestUrl = (method: HttpMethod, url: string, params?: Record<string, any>): BuiltRequestUrl => {
  if (method !== 'GET' || !params) {
    return { finalUrl: url, safeUrl: getSafeUrl(url) };
  }

  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    queryParams.append(key, Array.isArray(value) ? value.join(',') : value.toString());
  });

  const finalUrl = `${url}?${queryParams.toString()}`;
  return { finalUrl, safeUrl: getSafeUrl(finalUrl) };
};

const parseResponse = async (response: Response): Promise<ParsedResponse> => {
  const bodyText = await response.text();

  if (!bodyText) {
    return { data: null, bodyText };
  }

  try {
    return { data: JSON.parse(bodyText), bodyText };
  } catch {
    return { data: bodyText, bodyText };
  }
};

const getResponseMessage = (data: unknown, fallback: string) => {
  if (data && typeof data === 'object' && 'message' in data) {
    const message = (data as { message?: unknown }).message;
    if (typeof message === 'string' && message.trim()) {
      return message;
    }
  }

  return fallback;
};

const isRetriableError = (err: Error) => {
  if (err.name === 'AbortError' || err.name === 'TypeError') {
    return true;
  }

  if (err instanceof ApiRequestError && err.retriable) {
    return true;
  }

  if (err instanceof ApiRequestError && err.status) {
    return TRANSIENT_STATUS_CODES.has(err.status);
  }

  return false;
};

const executeRequestAttempt = async <T>(
  method: HttpMethod,
  url: string,
  options: RequestOptions | undefined,
  attempt: number,
  maxRetries: number
) => {
  const { finalUrl, safeUrl } = buildRequestUrl(method, url, options?.params);
  const controller = new AbortController();
  const timeoutMs = options?.timeout || DEFAULT_TIMEOUT_MS;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = Date.now();

  try {
    const headers: HeadersInit = options?.body ? { 'Content-Type': 'application/json' } : {};
    const response = await fetch(finalUrl, {
      method,
      headers,
      signal: controller.signal,
      ...(options?.body && { body: JSON.stringify(options.body) })
    });

    const { data, bodyText } = await parseResponse(response);

    if (response.ok) {
      return data as T;
    }

    const responseBody = bodyText.slice(0, ERROR_BODY_SAMPLE_LENGTH);
    const message = getResponseMessage(data, `Request failed with status ${response.status}`);

    console.error('API request failed', {
      method,
      url: safeUrl,
      status: response.status,
      durationMs: Date.now() - startedAt,
      attempt: attempt + 1,
      maxAttempts: maxRetries + 1,
      responseBody
    });

    throw new ApiRequestError(message, {
      status: response.status,
      method,
      url: safeUrl,
      responseBody
    });
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new ApiRequestError('Request timeout - please try again later', {
        method,
        url: safeUrl,
        retriable: true
      });
    }

    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
};

const waitForRetry = async (
  err: Error,
  details: { method: HttpMethod; safeUrl: string; attempt: number; maxRetries: number; retryDelay: number }
) => {
  if (details.attempt >= details.maxRetries || !isRetriableError(err)) {
    return false;
  }

  const nextRetryDelay = calculateRetryDelay(details.retryDelay, details.attempt);
  console.warn('API request retry scheduled', {
    method: details.method,
    url: err instanceof ApiRequestError ? err.url : details.safeUrl,
    status: err instanceof ApiRequestError ? err.status : undefined,
    attempt: details.attempt + 1,
    nextAttempt: details.attempt + 2,
    maxAttempts: details.maxRetries + 1,
    retryDelayMs: nextRetryDelay
  });
  await delay(nextRetryDelay);

  return true;
};

export function useApiRequest() {
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const makeRequest = async <T>(
    method: HttpMethod,
    url: string,
    options?: RequestOptions
  ) => {
    isLoading.value = true;
    error.value = null;

    const maxRetries = options?.retry ?? 0;
    const retryDelay = options?.retryDelay ?? DEFAULT_RETRY_DELAY_MS;
    let lastError: Error | null = null;
    const safeUrl = getSafeUrl(url);

    try {
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          return await executeRequestAttempt<T>(method, url, options, attempt, maxRetries);
        } catch (err) {
          lastError = err instanceof Error ? err : new Error(String(err));

          // Retry only transient failures to avoid amplifying persistent backend 500s.
          if (await waitForRetry(lastError, { method, safeUrl, attempt, maxRetries, retryDelay })) {
            continue;
          }

          error.value = lastError;
          throw error.value;
        }
      }

      // This should never be reached, but TypeScript needs it
      throw lastError || new Error('Unknown error');
    } finally {
      isLoading.value = false;
    }
  };

  return {
    makeRequest,
    isLoading,
    error
  };
}
