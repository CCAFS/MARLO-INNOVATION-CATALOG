// composables/useSharedValue.ts
import { ref, computed } from 'vue';
import type { Filters } from '~/interfaces/search-filters.interface';

export enum FilterType {
  ScalingReadiness = 'scalingReadiness',
  InnovationTypeId = 'innovationTypeId',
  SdgId = 'sdgId',
  CountryIds = 'countryIds',
  ActorName = 'actorName',
  ActorIds = 'actorIds'
}

// ref declared outside => all components share the same instance
const value = ref<Filters>({
  scalingReadiness: null,
  innovationTypeId: null,
  sdgId: null,
  countryIds: null,
  actorName: null,
  actorIds: null
});

export function useSharedValue() {
  const setValue = (v: Partial<Filters>) => {
    value.value = { ...value.value, ...v };
  };
  const display = computed(() => `This is the value: ${JSON.stringify(value.value)}`);

  const clearFilters = () => {
    value.value = {
      scalingReadiness: null,
      innovationTypeId: null,
      sdgId: null,
      countryIds: null,
      actorName: null,
      actorIds: null
    };
  };

  return { value, setValue, display, clearFilters };
}
