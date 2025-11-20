import { ref } from 'vue';

export function useApiRequest() {
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const makeRequest = async <T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    options?: {
      params?: Record<string, any>;
      body?: Record<string, any>;
      timeout?: number;
      retry?: number; // Number of retry attempts (default: 0)
      retryDelay?: number; // Delay between retries in ms (default: 1000)
    }
  ) => {
    isLoading.value = true;
    error.value = null;

    const maxRetries = options?.retry ?? 0;
    const retryDelay = options?.retryDelay ?? 1000;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        let finalUrl = url;

        if (method === 'GET' && options?.params) {
          const queryParams = new URLSearchParams();
          Object.entries(options.params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              if (Array.isArray(value)) {
                const concatVal = value.join(',');
                queryParams.append(key, concatVal);
              } else {
                queryParams.append(key, value.toString());
              }
            }
          });
          finalUrl = `${url}?${queryParams.toString()}`;
        }

        // Create an AbortController for timeout
        const controller = new AbortController();
        const timeoutMs = options?.timeout || 30000; // Default 30 seconds
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        const response = await fetch(finalUrl, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          signal: controller.signal,
          ...(options?.body && { body: JSON.stringify(options.body) })
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data as T;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          lastError = new Error('Request timeout - please try again later');
        } else {
          lastError = err instanceof Error ? err : new Error(String(err));
        }

        // If this is not the last attempt, wait before retrying
        if (attempt < maxRetries) {
          console.log(`Request failed (attempt ${attempt + 1}/${maxRetries + 1}). Retrying in ${retryDelay}ms...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          continue;
        }

        // Last attempt failed, throw the error
        error.value = lastError;
        throw error.value;
      } finally {
        if (attempt === maxRetries) {
          isLoading.value = false;
        }
      }
    }

    // This should never be reached, but TypeScript needs it
    throw lastError || new Error('Unknown error');
  };

  return {
    makeRequest,
    isLoading,
    error
  };
}
