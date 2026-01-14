// composables/useSharedValue.ts
import { ref, computed } from 'vue';

export enum FilterType {
  ScalingReadiness = 'scalingReadiness',
  InnovationTypeId = 'innovationTypeId',
  SdgId = 'sdgId',
  CountryIds = 'countryIds',
  ActorName = 'actorName',
  ActorIds = 'actorIds'
}

export interface Filters {
  scalingReadiness: number | null;
  innovationTypeId: number | null;
  sdgId: number | null;
  countryIds: number[] | null;
  actorName: string[] | null;
  actorIds: number[] | null;
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
