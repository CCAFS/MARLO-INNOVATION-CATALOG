import { computed } from 'vue';
import { FilterType } from './useSharedValue';
import { useInnovations } from './useInnovations';
import { useFilterCatalog } from './useFilterCatalog';
import { africaCountries } from './useAfrica';
import { isInnovationAssociatedWithFilterOption } from '~/utils/filters/areAnyInnovationsAssociatedWithFilterOption';
import type { AfricaSvgProps } from '~/interfaces/africa-svg-props.interface';
import type { InnovationResume, InnovationType, SdgResume } from '~/interfaces/innovation-catalog.interface';

function compareByAvailability(a: { disabled: boolean }, b: { disabled: boolean }): number {
  if (a.disabled === b.disabled) return 0;
  return a.disabled ? 1 : -1;
}

function sortByAvailability<T extends { disabled: boolean }>(items: T[]): T[] {
  return [...items].sort(compareByAvailability);
}

function withAvailability<T extends { id: number }>(
  items: T[],
  filterType: FilterType,
  innovations: InnovationResume[] | null
): Array<T & { disabled: boolean }> {
  const hasCatalog = innovations !== null && innovations.length > 0;

  const withFlags = items.map(item => ({
    ...item,
    disabled: hasCatalog ? !isInnovationAssociatedWithFilterOption(innovations, filterType, item.id) : false
  }));

  return hasCatalog ? sortByAvailability(withFlags) : withFlags;
}

function withCountryAvailability(countries: AfricaSvgProps[], innovations: InnovationResume[] | null): Array<AfricaSvgProps & { disabled: boolean }> {
  const hasCatalog = innovations !== null && innovations.length > 0;

  const withFlags = countries.map(country => ({
    ...country,
    disabled: hasCatalog ? !isInnovationAssociatedWithFilterOption(innovations, FilterType.CountryIds, Number.parseInt(country.id)) : false
  }));

  return hasCatalog ? sortByAvailability(withFlags) : withFlags;
}

export function useFilterAvailability() {
  const { apiDataTotal } = useInnovations();
  const { sdgs, innovationTypes } = useFilterCatalog();

  const innovationsForAvailability = computed((): InnovationResume[] | null => {
    const catalog = apiDataTotal.value;
    if (!catalog || catalog.totalCount === 0) {
      return null;
    }
    return catalog.innovations;
  });

  const sdgOptions = computed(
    (): Array<SdgResume & { disabled: boolean }> => withAvailability(sdgs.value as SdgResume[], FilterType.SdgId, innovationsForAvailability.value)
  );

  const innovationTypeOptions = computed(
    (): Array<InnovationType & { disabled: boolean }> =>
      withAvailability(innovationTypes.value as InnovationType[], FilterType.InnovationTypeId, innovationsForAvailability.value)
  );

  const countryOptions = computed(() => withCountryAvailability(africaCountries, innovationsForAvailability.value));

  return {
    sdgOptions,
    innovationTypeOptions,
    countryOptions
  };
}
