import { ref, readonly } from 'vue';
import { useApi } from '~/composables/database-api/useApi';
import type { InnovationType, SdgResume } from '~/interfaces/innovation-catalog.interface';

const sdgs = ref<SdgResume[]>([]);
const innovationTypes = ref<InnovationType[]>([]);
const error = ref<Error | null>(null);
const hasCachedCatalog = () => sdgs.value.length > 0 && innovationTypes.value.length > 0 && !error.value;
const isLoading = ref(false);
let loadPromise: Promise<void> | null = null;

export function useFilterCatalog() {
  const { getSustainableDevelopmentGoals, getInnovationTypes } = useApi();

  const loadCatalog = async () => {
    if (hasCachedCatalog()) {
      isLoading.value = false;
      return;
    }

    if (loadPromise !== null) {
      return loadPromise;
    }

    isLoading.value = true;
    error.value = null;

    loadPromise = (async () => {
      try {
        const [sdgResponse, typesResponse] = await Promise.all([getSustainableDevelopmentGoals(), getInnovationTypes()]);
        sdgs.value = sdgResponse;
        innovationTypes.value = typesResponse;
      } catch (err) {
        console.error('Error fetching filter catalog:', err);
        error.value = err instanceof Error ? err : new Error(String(err));
        throw err;
      } finally {
        isLoading.value = false;
        loadPromise = null;
      }
    })();

    return loadPromise;
  };

  return {
    sdgs: readonly(sdgs),
    innovationTypes: readonly(innovationTypes),
    isLoading: readonly(isLoading),
    error: readonly(error),
    loadCatalog
  };
}
