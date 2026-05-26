// composables/useInnovations.ts
import { ref, computed, readonly } from 'vue';
import { useApi } from '~/composables/database-api/useApi';
import { phaseId } from '~/content/vars';
import type { InnovationCatalog, InnovationCatalogStats, InnovationResume } from '~/interfaces/innovation-catalog.interface';
import type { InnovationFacets } from '~/interfaces/innovation-facets.interface';
import type { Filters } from '~/interfaces/search-filters.interface';
import { innovationFacetsFromCatalog } from '~/utils/innovations/innovationFacetsFromCatalog';
import { matchesInnovationSearch } from '~/utils/search/matchesInnovationSearch';

const SEARCH_DEBOUNCE_MS = 300;
const FACETS_FALLBACK_LIMIT = 1000;

type InnovationParams = {
  phase: string;
  offset?: number;
  limit?: number;
  readinessScale?: number;
  innovationTypeId?: number;
  sdgId?: number;
  countryIds?: number[];
  actorIds?: number[];
  search?: string;
};

const emptyFilters = (): Filters => ({
  scalingReadiness: null,
  innovationTypeId: null,
  sdgId: null,
  countryIds: null,
  actorIds: null
});

const createEmptyCatalog = (): InnovationCatalog => ({
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
});

const buildFilterParams = (filters: Filters, searchTerm?: string): InnovationParams => {
  const params: InnovationParams = {
    phase: phaseId.toString()
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
  if (filters.countryIds?.length) {
    params.countryIds = filters.countryIds;
  }
  if (filters.actorIds?.length) {
    params.actorIds = filters.actorIds;
  }
  if (searchTerm?.trim()) {
    params.search = searchTerm.trim();
  }

  return params;
};

const buildInnovationParams = (
  filters: Filters,
  pagination: { offset: number; limit: number },
  searchTerm?: string
): InnovationParams => ({
  ...buildFilterParams(filters, searchTerm),
  offset: pagination.offset,
  limit: pagination.limit
});

const sliceCatalogPage = (catalog: InnovationCatalog, pageOffset: number, pageLimit: number): InnovationCatalog => ({
  ...catalog,
  innovations: catalog.innovations.slice(pageOffset, pageOffset + pageLimit),
  totalCount: catalog.innovations.length
});

const isMissingFacetsEndpoint = (err: unknown) => {
  const status = typeof err === 'object' && err !== null && 'status' in err ? (err as { status?: number }).status : undefined;
  return status === 404;
};

const hasActiveFilters = (filters: Filters) =>
  (filters.scalingReadiness !== null && filters.scalingReadiness !== undefined) ||
  Boolean(filters.innovationTypeId) ||
  Boolean(filters.sdgId) ||
  Boolean(filters.countryIds?.length) ||
  Boolean(filters.actorIds?.length);

// Move state OUTSIDE the function to make it shared across all components
const apiData = ref<InnovationCatalog | null>(null);
const apiDataForCountry = ref<InnovationCatalog | null>(null);
const apiDataTotal = ref<InnovationCatalog | null>(null);
const apiDataStats = ref<InnovationCatalogStats | null>(null);
const apiFacets = ref<InnovationFacets | null>(null);
const apiTotalFacets = ref<InnovationFacets | null>(null);
const isLoading = ref(true);
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
const searchCatalog = ref<InnovationCatalog | null>(null);
const lastFilters = ref<Filters>(emptyFilters());
let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;
let fetchRequestId = 0;
let searchRequestId = 0;
let facetsRequestId = 0;
let facetsEndpointAvailable: boolean | null = null;
let totalFacetsPromise: Promise<InnovationFacets> | null = null;

export function useInnovations() {
  const { getInnovations, getInnovationFacets, getInnovationStats } = useApi();

  // Computed
  const offset = computed(() => currentPage.value * rowsPerPage.value);
  const limit = computed(() => rowsPerPage.value);
  const limitedInnovations = computed(() => apiData.value?.innovations ?? []);

  // Methods
  const fetchFacetsWithFallback = async (filters: Filters, searchTerm?: string) => {
    const filterParams = buildFilterParams(filters, searchTerm);

    if (facetsEndpointAvailable !== false) {
      try {
        const facets = await getInnovationFacets(filterParams);
        facetsEndpointAvailable = true;
        return facets;
      } catch (err) {
        if (!isMissingFacetsEndpoint(err)) {
          console.warn('Innovation facets endpoint failed, falling back to search-simple:', err);
        }
        facetsEndpointAvailable = false;
      }
    }

    const catalog = await getInnovations({
      ...filterParams,
      offset: 0,
      limit: FACETS_FALLBACK_LIMIT
    });
    return innovationFacetsFromCatalog(catalog);
  };

  const fetchTotalFacets = () => {
    if (apiTotalFacets.value) {
      return Promise.resolve(apiTotalFacets.value);
    }
    if (totalFacetsPromise) {
      return totalFacetsPromise;
    }

    totalFacetsPromise = fetchFacetsWithFallback(emptyFilters()).finally(() => {
      totalFacetsPromise = null;
    });

    return totalFacetsPromise;
  };

  const refreshFacets = async (filters: Filters, searchTerm?: string) => {
    const requestId = ++facetsRequestId;

    try {
      const hasScopedFacets = hasActiveFilters(filters) || Boolean(searchTerm?.trim());
      const [currentFacets, totalFacets] = hasScopedFacets
        ? await Promise.all([fetchFacetsWithFallback(filters, searchTerm), fetchTotalFacets()])
        : await fetchTotalFacets().then(facets => [facets, facets] as const);

      if (requestId !== facetsRequestId) {
        return;
      }

      apiFacets.value = currentFacets;
      apiTotalFacets.value = totalFacets;
      apiDataTotal.value = {
        ...createEmptyCatalog(),
        totalCount: totalFacets.totalCount
      };
    } catch (err) {
      console.error('Error fetching innovation facets:', err);
      if (requestId === facetsRequestId) {
        apiFacets.value = null;
      }
    }
  };

  const applyCatalogPage = (catalog: InnovationCatalog, pageOffset: number, pageLimit: number) => {
    apiData.value = sliceCatalogPage(catalog, pageOffset, pageLimit);
    totalRecords.value = catalog.innovations.length;
  };

  const runSearch = async (query: string, filters: Filters, pageOffset = 0, pageLimit = rowsPerPage.value) => {
    const trimmed = query.trim();
    const requestId = ++searchRequestId;

    if (!trimmed) {
      filteredInnovations.value = [];
      searchCatalog.value = null;
      isMatchingSearch.value = false;
      isSearchFiltering.value = false;
      return;
    }

    isSearchFiltering.value = true;
    isLoading.value = true;
    error.value = null;

    try {
      if (facetsEndpointAvailable === true) {
        const data = await getInnovations(buildInnovationParams(filters, { offset: pageOffset, limit: pageLimit }, trimmed));

        if (requestId !== searchRequestId) {
          return;
        }

        filteredInnovations.value = data.innovations;
        searchCatalog.value = null;
        isMatchingSearch.value = (data.totalCount ?? data.innovations.length) > 0;
        apiData.value = data;
        totalRecords.value = data.totalCount ?? data.innovations.length;
        void refreshFacets(filters, trimmed);
        return;
      }

      const pool = await getInnovations(buildInnovationParams(filters, { offset: 0, limit: FACETS_FALLBACK_LIMIT }));
      const innovations = pool.innovations.filter(innovation => matchesInnovationSearch(innovation, trimmed));

      if (requestId !== searchRequestId) {
        return;
      }

      const catalog = {
        ...pool,
        innovations,
        totalCount: innovations.length
      };

      filteredInnovations.value = innovations;
      searchCatalog.value = catalog;
      isMatchingSearch.value = innovations.length > 0;
      applyCatalogPage(catalog, pageOffset, pageLimit);
      void refreshFacets(filters);
    } catch (err: unknown) {
      if (requestId !== searchRequestId) {
        return;
      }

      console.error('Error searching innovations:', err);
      error.value = err instanceof Error ? err : new Error(String(err));
      filteredInnovations.value = [];
      searchCatalog.value = null;
      isMatchingSearch.value = false;
      apiData.value = null;
      totalRecords.value = 0;
    } finally {
      if (requestId === searchRequestId) {
        isSearchFiltering.value = false;
        isLoading.value = false;
      }
    }
  };

  const fetchInnovations = async (filters: Filters, pageOffset = 0, pageLimit = 6) => {
    const requestId = ++fetchRequestId;
    lastFilters.value = { ...filters };

    if (isSearchActive.value && searchQuery.value.trim()) {
      await runSearch(searchQuery.value, filters, pageOffset, pageLimit);
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      const data = await getInnovations(buildInnovationParams(filters, { offset: pageOffset, limit: pageLimit }));

      if (requestId !== fetchRequestId) {
        return;
      }

      apiData.value = data;
      apiDataForCountry.value = data;
      totalRecords.value = data.totalCount ?? data.innovations.length;
      isMatchingSearch.value = false;
      filteredInnovations.value = [];
      searchCatalog.value = null;
      void refreshFacets(filters);
    } catch (err: unknown) {
      if (requestId !== fetchRequestId) {
        return;
      }

      console.error('Error fetching data from API:', err);
      const message = err instanceof Error ? err.message : String(err);
      error.value = err instanceof Error ? err : new Error(message);

      if (message.includes('ETIMEDOUT') || message.includes('503')) {
        error.value = new Error('VPN connection timeout. Please check your VPN connection and try again.');
      }

      apiDataForCountry.value = null;
      apiData.value = null;
      apiDataTotal.value = createEmptyCatalog();
      totalRecords.value = 0;
    } finally {
      if (requestId === fetchRequestId) {
        isLoading.value = false;
      }
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

    if (isSearchActive.value && searchCatalog.value) {
      applyCatalogPage(searchCatalog.value, newOffset, event.rows);
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
    searchCatalog.value = null;
    fetchInnovations(filters, 0, rowsPerPage.value);
  };

  const clearSearch = () => {
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = null;
    }
    searchQuery.value = '';
    filteredInnovations.value = [];
    searchCatalog.value = null;
    isMatchingSearch.value = false;
    isSearchActive.value = false;
    isSearchFiltering.value = false;
  };

  const handleSearch = (query: string, filters: Filters = lastFilters.value) => {
    searchQuery.value = query;

    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
    }

    if (!query.trim()) {
      filteredInnovations.value = [];
      searchCatalog.value = null;
      isMatchingSearch.value = false;
      isSearchFiltering.value = false;
      return;
    }

    isSearchFiltering.value = true;

    searchDebounceTimer = setTimeout(() => {
      currentPage.value = 0;
      void runSearch(query, filters, 0, rowsPerPage.value);
    }, SEARCH_DEBOUNCE_MS);
  };

  return {
    // State (now shared across all components)
    apiData: readonly(apiData),
    apiDataForCountry: readonly(apiDataForCountry),
    apiDataTotal: readonly(apiDataTotal),
    apiDataStats: readonly(apiDataStats),
    apiFacets: readonly(apiFacets),
    apiTotalFacets: readonly(apiTotalFacets),
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
    refreshFacets,
    fetchStats,
    onPageChange,
    onSearchActive,
    onSearchDeactive,
    handleSearch,
    clearSearch
  };
}
