// composables/useSharedValue.ts
import { ref, computed } from 'vue';

interface Filters {
  scalingReadiness: number | null;
  innovationTypeId: number | null;
  sdgId: number | null;
  countryId: number | null;
}

// ref declared outside => all components share the same instance
const value = ref<Filters>({
  scalingReadiness: null,
  innovationTypeId: null,
  sdgId: null,
  countryId: null
});

export function useSharedValue() {
  const setValue = (v: Filters) => {
    console.log('Setting shared value to:', v);
    value.value = v;
  };
  const display = computed(() => `This is the value: ${JSON.stringify(value.value)}`);

  return { value, setValue, display };
}
