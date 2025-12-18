// composables/useInnovations.ts
import { ref, computed, readonly } from 'vue';
import { useApi } from '~/composables/database-api/useApi';
import type { InnovationCatalogV2, InnovationCatalogV2Stats } from '~/interfaces/innovation-catalog-v2.interface';

// Move state OUTSIDE the function to make it shared across all components
const apiData = ref<InnovationCatalogV2 | null>(null);
const apiDataForCountry = ref<InnovationCatalogV2 | null>(null);
const apiDataTotal = ref<InnovationCatalogV2 | null>(null);
const apiDataStats = ref<InnovationCatalogV2Stats | null>(null);
const isLoading = ref(false);
const error = ref<Error | null>(null);
const currentPage = ref(0);
const rowsPerPage = ref(6);
const totalRecords = ref(0);
const isSearchActive = ref(false);

// Search-related state
const searchQuery = ref('');
const filteredInnovations = ref<any[]>([]);
let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;

export function useInnovations() {
  const { getInnovations, getInnovationStats } = useApi();

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
      if (filters.actorName && filters.actorName.length > 0) {
        params.actorName = filters.actorName;
      }
      if (filters.actorIds && filters.actorIds.length > 0) {
        params.actorIds = filters.actorIds;
      }

      const data = await getInnovations(params);
      apiData.value = data;

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

      try {
        const params: any = {
          phase: '428',
          offset: 0,
          limit: 1000
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

        const dataForCountry = await getInnovations(params);
        apiDataForCountry.value = dataForCountry;

        const totalData = await getInnovations({ phase: '428', offset: 0, limit: 1000 });
        apiDataTotal.value = totalData;
      } catch (error: any) {
        console.error('Error fetching data for country filter from API:', error);
        error.value = error instanceof Error ? error : new Error(String(error));
        if (error.message.includes('ETIMEDOUT') || error.message.includes('503')) {
          error.value = new Error('VPN connection timeout. Please check your VPN connection and try again.');
        }
      }
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

  const onSearchActive = (filters: any) => {
    isSearchActive.value = true;
    currentPage.value = 0;
    fetchInnovations(filters, 0, apiData.value?.totalCount || rowsPerPage.value);
  };

  const onSearchDeactive = (filters: any) => {
    isSearchActive.value = false;
    currentPage.value = 0;
    fetchInnovations(filters, 0, rowsPerPage.value);
  };

  // Handle search with debouncing
  const handleSearch = (query: string) => {
    searchQuery.value = query;

    isLoading.value = true;

    // Clear previous timer
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
    }

    // Set new debounce timer (1 second)
    searchDebounceTimer = setTimeout(() => {
      if (query.trim() === '') {
        // Reset to original data when search is empty
        filteredInnovations.value = [];
        isLoading.value = false;
      } else {
        // Create shallow copy and filter
        const innovations = apiData.value?.innovations || [];
        filteredInnovations.value = [...innovations].filter(innovation => {
          const searchTerm = query.toLowerCase();
          return innovation.title?.toLowerCase().includes(searchTerm) || innovation.projectInnovationId?.toString().includes(searchTerm);
        });
        isLoading.value = false;
      }
    }, 1000);
  };

  // Computed for limited innovations (max 6)
  const limitedInnovations = computed(() => {
    if (isSearchActive.value && filteredInnovations.value.length > 0) {
      return filteredInnovations.value.slice(0, rowsPerPage.value);
    }
    return apiData.value?.innovations.slice(0, rowsPerPage.value) || [];
  });

  return {
    // State (now shared across all components)
    apiData: readonly(apiData),
    apiDataForCountry: readonly(apiDataForCountry),
    apiDataTotal: readonly(apiDataTotal),
    apiDataStats: readonly(apiDataStats),
    isLoading: readonly(isLoading),
    error: readonly(error),
    currentPage: currentPage,
    rowsPerPage: readonly(rowsPerPage),
    totalRecords: readonly(totalRecords),
    isSearchActive: readonly(isSearchActive),

    // Search state
    searchQuery: readonly(searchQuery),
    filteredInnovations: readonly(filteredInnovations),
    limitedInnovations,

    // Computed
    offset,
    limit,

    // Methods
    fetchInnovations,
    fetchStats,
    onPageChange,
    onSearchActive,
    onSearchDeactive,
    handleSearch
  };
}
