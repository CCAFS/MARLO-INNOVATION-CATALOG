// composables/useSharedValue.ts
import { ref, computed } from 'vue';

interface Filters {
  scalingReadiness: number | null;
  innovationTypeId: number | null;
  sdgId: number | null;
  countryIds: number[] | null;
}

// ref declared outside => all components share the same instance
const value = ref<Filters>({
  scalingReadiness: null,
  innovationTypeId: null,
  sdgId: null,
  countryIds: null
});

export function useSharedValue() {
  const setValue = (v: Partial<Filters>) => {
    console.log('Setting shared value to:', v);
    value.value = { ...value.value, ...v };
  };
  const display = computed(() => `This is the value: ${JSON.stringify(value.value)}`);

  const clearFilters = () => {
    value.value = {
      scalingReadiness: null,
      innovationTypeId: null,
      sdgId: null,
      countryIds: null
    };
  };

  return { value, setValue, display, clearFilters };
}
