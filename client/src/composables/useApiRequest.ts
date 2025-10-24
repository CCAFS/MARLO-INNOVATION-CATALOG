import { ref } from 'vue';

export function useApiRequest() {
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const makeRequest = async <T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    options?: { params?: Record<string, any>; body?: Record<string, any> }
  ) => {
    isLoading.value = true;
    error.value = null;

    try {
      let finalUrl = url;

      if (method === 'GET' && options?.params) {
        const queryParams = new URLSearchParams();
        Object.entries(options.params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
        finalUrl = `${url}?${queryParams.toString()}`;
      }

      const response = await fetch(finalUrl, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        ...(options?.body && { body: JSON.stringify(options.body) })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as T;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
      throw error.value;
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
