import type { DeepReadonly } from 'vue';
import { FilterType } from '~/pages/index/vue/composables/useSharedValue';
import { useInnovations } from '~/pages/index/vue/composables/useInnovations';
import type { InnovationResume } from '~/interfaces/innovation-catalog.interface';

export type InnovationForFilterAvailability = DeepReadonly<InnovationResume>;

const matchesFilterValue = (candidate: string | number | undefined, value: string | number): boolean => {
  return candidate?.toString() === value.toString();
};

const equivalentFilterKeyMap: Record<FilterType, string> = {
  [FilterType.ScalingReadiness]: 'readinessScale',
  [FilterType.InnovationTypeId]: 'innovationType',
  [FilterType.SdgId]: 'sdgs',
  [FilterType.CountryIds]: 'countries',
  [FilterType.ActorIds]: 'actors'
};

export const isInnovationAssociatedWithFilterOption = (
  innovations: readonly InnovationForFilterAvailability[],
  filterType: FilterType,
  value: string | number
): boolean => {
  if (innovations.length === 0) {
    return false;
  }

  const filterKey = equivalentFilterKeyMap[filterType];

  return innovations.some(innovation => {
    const filterValue = (innovation as Record<string, unknown>)[filterKey];

    if (filterValue === undefined || filterValue === null) {
      return false;
    }

    if (filterType === FilterType.ActorIds) {
      if (Array.isArray(filterValue)) {
        return filterValue.some(
          (actor: { actorId?: number; actorInfo?: { id?: number } }) =>
            actor.actorId === value || actor.actorInfo?.id === value
        );
      }
    }

    if (filterType === FilterType.InnovationTypeId) {
      return (filterValue as { id?: number })?.id === value;
    }

    if (filterType === FilterType.CountryIds && Array.isArray(filterValue)) {
      return filterValue.some((country: { id?: number; idCountry?: number }) => {
        return matchesFilterValue(country.idCountry ?? country.id, value);
      });
    }

    if (Array.isArray(filterValue)) {
      return filterValue.some((item: { id?: number; sdgId?: number; name?: string }) => {
        return item.id === value || item.sdgId === value || item.name === value;
      });
    }

    return filterValue === value;
  });
};

const areAnyInnovationsAssociatedWithFilterOption = (filterType: FilterType, value: string | number) => {
  const { apiDataTotal } = useInnovations();

  if (!apiDataTotal.value || apiDataTotal.value.totalCount === 0) {
    return false;
  }

  return isInnovationAssociatedWithFilterOption(apiDataTotal.value.innovations, filterType, value);
};

export default areAnyInnovationsAssociatedWithFilterOption;
