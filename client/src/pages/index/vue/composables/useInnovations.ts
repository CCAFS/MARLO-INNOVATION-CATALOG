// composables/useInnovations.ts
import { ref, computed, readonly, watch } from 'vue';
import { useApi } from '~/composables/database-api/useApi';
import { phaseId } from '~/content/vars';
import type { InnovationCatalog, InnovationCatalogStats, InnovationResume } from '~/interfaces/innovation-catalog.interface';
import type { Filters } from '~/interfaces/search-filters.interface';
import { matchesActorIdsFilter } from '~/utils/filters/matchesActorIdsFilter';
import { searchCompleteToCatalog } from '~/utils/innovations/searchCompleteToCatalog';
import { matchesInnovationSearch } from '~/utils/search/matchesInnovationSearch';

const SEARCH_DEBOUNCE_MS = 300;
const POOL_LIMIT = 1000;

const buildInnovationParams = (
  filters: Filters,
  pagination: { offset: number; limit: number }
): Record<string, unknown> => {
  const params: Record<string, unknown> = {
    phase: phaseId,
    offset: pagination.offset,
    limit: pagination.limit
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

  return params;
};

const applyActorFilter = (catalog: InnovationCatalog, actorIds: number[] | null): InnovationCatalog => {
  if (!actorIds?.length) {
    return catalog;
  }

  const innovations = catalog.innovations.filter(innovation => matchesActorIdsFilter(innovation, actorIds));

  return {
    ...catalog,
    innovations,
    totalCount: innovations.length
  };
};

const sliceCatalogPage = (
  catalog: InnovationCatalog,
  pageOffset: number,
  pageLimit: number
): InnovationCatalog => {
  const pool = catalog.innovations;

  return {
    ...catalog,
    innovations: pool.slice(pageOffset, pageOffset + pageLimit),
    totalCount: pool.length
  };
};

// Move state OUTSIDE the function to make it shared across all components
const apiData = ref<InnovationCatalog | null>(null);
const apiDataForCountry = ref<InnovationCatalog | null>(null);
const apiDataTotal = ref<InnovationCatalog | null>(null);
const apiDataStats = ref<InnovationCatalogStats | null>(null);
const isLoading = ref(false);
const error = ref<Error | null>(null);
const currentPage = ref(0);
const rowsPerPage = ref(6);
const totalRecords = ref(0);
const isSearchActive = ref(false);
const isMatchingSearch = ref(false);
const isSearchFiltering = ref(false);

// Search-related state
const searchQuery = ref('');
const filteredInnovations = ref<InnovationResume[]>([]);
let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;

const getSearchPool = (): InnovationResume[] => {
  return apiDataForCountry.value?.innovations ?? apiData.value?.innovations ?? [];
};

const runSearch = (query: string) => {
  const trimmed = query.trim();
  if (!trimmed) {
    filteredInnovations.value = [];
    isMatchingSearch.value = false;
    isSearchFiltering.value = false;
    return;
  }

  filteredInnovations.value = getSearchPool().filter(innovation => matchesInnovationSearch(innovation, trimmed));
  isMatchingSearch.value = filteredInnovations.value.length > 0;
  isSearchFiltering.value = false;
};

watch(apiDataForCountry, () => {
  if (isSearchActive.value && searchQuery.value.trim()) {
    runSearch(searchQuery.value);
  }
});

export function useInnovations() {
  const { getInnovationsComplete, getInnovationStats } = useApi();

  // Computed
  const offset = computed(() => currentPage.value * rowsPerPage.value);
  const limit = computed(() => rowsPerPage.value);

  const limitedInnovations = computed(() => {
    if (isSearchActive.value) {
      return filteredInnovations.value.slice(0, rowsPerPage.value);
    }
    return apiData.value?.innovations ?? [];
  });

  // Methods
  const fetchInnovations = async (filters: Filters, pageOffset = 0, pageLimit = 6) => {
    isLoading.value = true;
    error.value = null;

    try {
      const poolParams = buildInnovationParams(filters, { offset: 0, limit: POOL_LIMIT });

      const [filteredComplete, totalComplete] = await Promise.all([
        getInnovationsComplete(poolParams),
        getInnovationsComplete({ phase: phaseId.toString(), offset: 0, limit: POOL_LIMIT })
      ]);

      const dataForCountry = applyActorFilter(searchCompleteToCatalog(filteredComplete), filters.actorIds);
      apiDataForCountry.value = dataForCountry;
      apiDataTotal.value = searchCompleteToCatalog(totalComplete);

      const pool = dataForCountry.innovations;
      totalRecords.value = pool.length;
      apiData.value = sliceCatalogPage(dataForCountry, pageOffset, pageLimit);
    } catch (err: unknown) {
      console.error('Error fetching data from API:', err);
      const message = err instanceof Error ? err.message : String(err);
      error.value = err instanceof Error ? err : new Error(message);

      if (message.includes('ETIMEDOUT') || message.includes('503')) {
        error.value = new Error('VPN connection timeout. Please check your VPN connection and try again.');
      }

      apiDataForCountry.value = null;
      apiData.value = null;
      apiDataTotal.value = {
        innovations: [],
        totalCount: 0,
        appliedFilters: {
          phase: phaseId,
          readinessScale: null,
          innovationTypeId: null,
          innovationId: null,
          sdgId: null,
          searchType: ''
        }
      };
      totalRecords.value = 0;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getInnovationStats({ phaseId: phaseId.toString() });
      apiDataStats.value = data;
    } catch (err) {
      console.error('Error fetching info stats:', err);
    }
  };

  const onPageChange = (event: any, filters: Filters) => {
    currentPage.value = event.page;
    rowsPerPage.value = event.rows;
    const newOffset = event.page * event.rows;

    if (apiDataForCountry.value) {
      totalRecords.value = apiDataForCountry.value.innovations.length;
      apiData.value = sliceCatalogPage(apiDataForCountry.value, newOffset, event.rows);
      return;
    }

    fetchInnovations(filters, newOffset, event.rows);
  };

  const onSearchActive = () => {
    isSearchActive.value = true;
    currentPage.value = 0;
  };

  const onSearchDeactive = (filters: Filters) => {
    isSearchActive.value = false;
    currentPage.value = 0;
    fetchInnovations(filters, 0, rowsPerPage.value);
  };

  const clearSearch = () => {
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = null;
    }
    searchQuery.value = '';
    filteredInnovations.value = [];
    isMatchingSearch.value = false;
    isSearchActive.value = false;
    isSearchFiltering.value = false;
  };

  const handleSearch = (query: string) => {
    searchQuery.value = query;

    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
    }

    if (!query.trim()) {
      runSearch('');
      return;
    }

    isSearchFiltering.value = true;

    searchDebounceTimer = setTimeout(() => {
      runSearch(query);
    }, SEARCH_DEBOUNCE_MS);
  };

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
    isMatchingSearch: readonly(isMatchingSearch),
    isSearchFiltering: readonly(isSearchFiltering),

    // Search state
    searchQuery,
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
    handleSearch,
    clearSearch
  };
}
