// composables/useSharedValue.ts
import { ref, computed } from 'vue';

// ref declarado fuera => todos los componentes comparten la misma instancia
const value = ref(0);

export function useSharedValue() {
  const setValue = (v: number) => (value.value = v);
  const display = computed(() => `El valor seleccionado es ${value.value}`);

  return { value, setValue, display };
}
