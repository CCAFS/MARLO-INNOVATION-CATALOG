// composables/useSharedValue.ts
import { ref, computed } from 'vue';

// ref declared outside => all components share the same instance
const value = ref(0);

export function useSharedValue() {
  const setValue = (v: number) => (value.value = v);
  const display = computed(() => `This is the value: ${value.value}`);

  return { value, setValue, display };
}
