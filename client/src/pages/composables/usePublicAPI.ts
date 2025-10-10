import { computed, ref, type ComputedRef} from 'vue';

export function usePublicAPI() {

    // Computed property for API URL (safe for SSR)
const apiBaseUrl = computed(() => {
  if (typeof window === 'undefined') {
    // Server-side: return a placeholder
    return '/api';
  }
  // Client-side: access import.meta.env safely
  return import.meta.env.PUBLIC_API || '/api';
});

const apiUrl = computed(() => `${apiBaseUrl.value}`);

    return {
        apiUrl,
        apiBaseUrl
    };
}