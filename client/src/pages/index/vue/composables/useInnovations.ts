// composables/useInnovations.ts
import { ref, computed } from 'vue';
import { useApi } from '~/composables/useApi';
import type { InnovationCatalogV2, InnovationCatalogV2Stats } from '~/interfaces/innovation-catalog-v2.interface';

export function useInnovations() {
  const { getInnovations, getInnovationStats } = useApi();

  // State
  const apiData = ref<InnovationCatalogV2 | null>(null);
  const apiDataStats = ref<InnovationCatalogV2Stats | null>(null);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  // Pagination
  const currentPage = ref(0);
  const rowsPerPage = ref(6);
  const totalRecords = ref(0);

  // Computed
  const offset = computed(() => currentPage.value * rowsPerPage.value);
  const limit = computed(() => rowsPerPage.value);

  // Methods
  const fetchInnovations = async (filters: any, pageOffset = 0, pageLimit = 6) => {
    try {
      isLoading.value = true;
      error.value = null;

      const params: any = {
        phase: '428',
        offset: pageOffset,
        limit: pageLimit
      };

      if (filters.scalingReadiness !== null && filters.scalingReadiness !== undefined) {
        params.readinessScale = filters.scalingReadiness + 1;
      }
      if (filters.innovationTypeId) {
        params.innovationTypeId = filters.innovationTypeId;
      }
      if (filters.sdgId) {
        params.sdgId = filters.sdgId;
      }
      if (filters.countryIds && filters.countryIds.length > 0) {
        params.countryIds = filters.countryIds;
      }

      const data = await getInnovations(params);
      apiData.value = data;

      console.log('Fetched innovations data:', data);

      if (data.totalCount !== undefined) {
        totalRecords.value = data.totalCount;
      }
    } catch (err: any) {
      console.error('Error fetching data from API:', err);
      error.value = err instanceof Error ? err : new Error(String(err));

      if (err.message.includes('ETIMEDOUT') || err.message.includes('503')) {
        error.value = new Error('VPN connection timeout. Please check your VPN connection and try again.');
      }
    } finally {
      isLoading.value = false;
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getInnovationStats({ phaseId: '428' });
      apiDataStats.value = data;
      totalRecords.value = data.innovationCount || 0;
    } catch (err) {
      console.error('Error fetching info stats:', err);
    }
  };

  const onPageChange = (event: any, filters: any) => {
    currentPage.value = event.page;
    rowsPerPage.value = event.rows;
    const newOffset = event.page * event.rows;
    fetchInnovations(filters, newOffset, event.rows);
  };

  return {
    // State
    apiData,
    apiDataStats,
    isLoading,
    error,
    currentPage,
    rowsPerPage,
    totalRecords,

    // Computed
    offset,
    limit,

    // Methods
    fetchInnovations,
    fetchStats,
    onPageChange
  };
}
