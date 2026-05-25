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
    class="flex items-center gap-2 border border-border-light rounded-full px-4 py-2 w-full bg-bg-200/60 focus-within:border-primary-300 focus-within:bg-white transition-colors">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 text-text-600 shrink-0"
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
      class="bg-transparent text-sm text-text-800 placeholder-text-600 outline-none w-full"
    />
  </div>
</template>
