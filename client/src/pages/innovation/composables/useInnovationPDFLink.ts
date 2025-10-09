import { ref, computed } from 'vue';

const link = ref<string | null>(null);

export function useInnovationPDFLink() {
  const setLink = (url: string) => {
    link.value = url;
  };

  const d = computed(() => {
    return link.value ? `PDF Link: ${link.value}` : 'No PDF link available';
  });

  return {
    link: computed(() => link.value),
    setLink,
    display: d
  };
}
