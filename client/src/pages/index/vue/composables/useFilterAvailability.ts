import { computed } from 'vue';
import { useInnovations } from './useInnovations';
import { useFilterCatalog } from './useFilterCatalog';
import { africaCountries } from './useAfrica';
import type { AfricaSvgProps } from '~/interfaces/africa-svg-props.interface';
import type { InnovationType, SdgResume } from '~/interfaces/innovation-catalog.interface';
import type { InnovationFacetCount } from '~/interfaces/innovation-facets.interface';

function compareByAvailability(a: { disabled: boolean }, b: { disabled: boolean }): number {
  if (a.disabled === b.disabled) return 0;
  return a.disabled ? 1 : -1;
}

function sortByAvailability<T extends { disabled: boolean }>(items: T[]): T[] {
  return [...items].sort(compareByAvailability);
}

const hasFacetCount = (counts: readonly InnovationFacetCount[] | null, id: number): boolean => {
  if (!counts) return false;
  return counts.some(item => item.id === id && item.count > 0);
};

function withAvailability<T extends { id: number }>(items: T[], counts: readonly InnovationFacetCount[] | null): Array<T & { disabled: boolean }> {
  const hasCatalog = counts !== null;

  const withFlags = items.map(item => ({
    ...item,
    disabled: hasCatalog ? !hasFacetCount(counts, item.id) : false
  }));

  return hasCatalog ? sortByAvailability(withFlags) : withFlags;
}

function withCountryAvailability(
  countries: AfricaSvgProps[],
  counts: readonly InnovationFacetCount[] | null
): Array<AfricaSvgProps & { disabled: boolean }> {
  const hasCatalog = counts !== null;

  const withFlags = countries.map(country => ({
    ...country,
    disabled: hasCatalog ? !hasFacetCount(counts, Number.parseInt(country.id)) : false
  }));

  return hasCatalog ? sortByAvailability(withFlags) : withFlags;
}

export function useFilterAvailability() {
  const { apiFacets } = useInnovations();
  const { sdgs, innovationTypes } = useFilterCatalog();

  const sdgCounts = computed(() => apiFacets.value?.sdgs ?? null);
  const innovationTypeCounts = computed(() => apiFacets.value?.innovationTypes ?? null);
  const countryCounts = computed(() => apiFacets.value?.countries ?? null);

  const sdgOptions = computed(
    (): Array<SdgResume & { disabled: boolean }> => withAvailability(sdgs.value as SdgResume[], sdgCounts.value)
  );

  const innovationTypeOptions = computed(
    (): Array<InnovationType & { disabled: boolean }> =>
      withAvailability(innovationTypes.value as InnovationType[], innovationTypeCounts.value)
  );

  const countryOptions = computed(() => withCountryAvailability(africaCountries, countryCounts.value));

  return {
    sdgOptions,
    innovationTypeOptions,
    countryOptions
  };
}
