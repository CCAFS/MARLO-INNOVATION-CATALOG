import type { Innovation } from "~/interfaces/innovation-catalog.interface";
import { ref, computed } from 'vue';


const innovation = ref<Innovation | null>(null);

export function useInnovation() {
  const setInnovation = (data: Innovation) => {
    innovation.value = data;
  };

  const display = computed(() => {
    return innovation.value ? `Innovation: ${innovation.value.title}` : 'No innovation selected';
  });

  return {
    innovation,
    setInnovation,
    display
  };
}