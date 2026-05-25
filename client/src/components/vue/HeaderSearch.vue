<script setup lang="ts">
import { watch } from 'vue';
import { useSharedValue } from '~/pages/index/vue/composables/useSharedValue';
import { useInnovations } from '~/pages/index/vue/composables/useInnovations';
import { texts } from '~/content/texts';

const { value } = useSharedValue();
const { searchQuery, handleSearch, onSearchActive, onSearchDeactive } = useInnovations();

watch(searchQuery, (newQuery, oldQuery) => {
  if (newQuery.trim()) {
    onSearchActive();
    handleSearch(newQuery);
  } else if (oldQuery.trim()) {
    handleSearch('');
    onSearchDeactive(value.value);
  }
});
</script>

<template>
  <div
    id="innovation-catalog"
    class="border-border-light bg-bg-200/60 focus-within:border-primary-300 flex w-full items-center gap-2 rounded-full border px-4 py-2 transition-colors focus-within:bg-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="text-text-600 h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"></path>
    </svg>
    <input
      v-model="searchQuery"
      type="search"
      :placeholder="texts.home.innovationFilters.search.placeholder"
      class="text-text-800 placeholder-text-600 w-full bg-transparent text-sm outline-none" />
  </div>
</template>
