import type { InnovationCatalog, InnovationResume } from '~/interfaces/innovation-catalog.interface';
import type { SearchComplete } from '~/interfaces/search-complete.interface';

export function searchCompleteToCatalog(complete: SearchComplete): InnovationCatalog {
  return {
    innovations: complete.innovations as InnovationResume[],
    totalCount: complete.totalCount,
    appliedFilters: {
      phase: complete.appliedFilters.phase,
      readinessScale: complete.appliedFilters.readinessScale,
      innovationTypeId: complete.appliedFilters.innovationTypeId,
      innovationId: complete.appliedFilters.innovationId,
      sdgId: complete.appliedFilters.sdgId,
      searchType: complete.appliedFilters.searchType
    }
  };
}
