import type { InnovationCatalog } from '~/interfaces/innovation-catalog.interface';
import type { SearchComplete } from '~/interfaces/search-complete.interface';
import { hasEssentialInnovationData } from './hasEssentialInnovationData';

export function filterInnovationCatalogResponse(
  catalog: InnovationCatalog,
  options?: { updateTotalCount?: boolean }
): InnovationCatalog {
  const innovations = catalog.innovations.filter(hasEssentialInnovationData);

  return {
    ...catalog,
    innovations,
    ...(options?.updateTotalCount !== false && catalog.totalCount !== undefined
      ? { totalCount: innovations.length }
      : {})
  };
}

export function filterSearchCompleteResponse(
  response: SearchComplete,
  options?: { updateTotalCount?: boolean }
): SearchComplete {
  const innovations = response.innovations.filter(hasEssentialInnovationData);

  return {
    ...response,
    innovations,
    ...(options?.updateTotalCount !== false && response.totalCount !== undefined
      ? { totalCount: innovations.length }
      : {})
  };
}
