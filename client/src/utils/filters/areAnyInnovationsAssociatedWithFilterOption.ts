import { FilterType } from '~/pages/index/vue/composables/useSharedValue';

import { useInnovations } from '~/pages/index/vue/composables/useInnovations';

const areAnyInnovationsAssociatedWithFilterOption = (filterType: FilterType, value: string | number) => {
  const { apiDataTotal } = useInnovations();

  if (!apiDataTotal.value || apiDataTotal.value.totalCount === 0) {
    return false;
  }

  const equivalentFilterKeyMap: Record<FilterType, string> = {
    [FilterType.ScalingReadiness]: 'readinessScale',
    [FilterType.InnovationTypeId]: 'innovationType',
    [FilterType.SdgId]: 'sdgs',
    [FilterType.CountryIds]: 'countries',
    [FilterType.ActorName]: 'actors',
    [FilterType.ActorIds]: 'actors'
  };

  const filterKey = equivalentFilterKeyMap[filterType];

  return apiDataTotal.value.innovations.some(innovation => {
    const filterValue = (innovation as any)[filterKey];

    if (filterValue === undefined || filterValue === null) {
      return false;
    }

    // Special handling for actors - check both id and name
    if (filterType === FilterType.ActorName || filterType === FilterType.ActorIds) {
      if (Array.isArray(filterValue)) {
        return filterValue.some((actor: any) => {
          if (filterType === FilterType.ActorIds) {
            return actor.id === value || actor.actorTypeId === value;
          } else {
            return actor.name === value || actor.actorTypeName === value;
          }
        });
      }
    }

    // Special handling for innovationType object
    if (filterType === FilterType.InnovationTypeId) {
      return filterValue?.id === value;
    }

    // Handle arrays (SDGs, countries)
    if (Array.isArray(filterValue)) {
      return filterValue.some((item: any) => {
        return item.id === value || item.sdgId === value || item.name === value;
      });
    }

    // Direct value comparison
    return filterValue === value;
  });
};

export default areAnyInnovationsAssociatedWithFilterOption;
