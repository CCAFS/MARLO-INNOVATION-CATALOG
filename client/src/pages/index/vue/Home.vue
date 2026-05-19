<script setup lang="ts">
import ReadinessExplorer from './ReadinessExplorer.vue';
import InnovationCards from './InnovationCards.vue';
import InnovationFilters from './InnovationFilters.vue';
import PrimeProvider from '~/providers/PrimeProvider.vue';
</script>

<template>
  <PrimeProvider>
    <div class="container mx-auto px-4 py-6 lg:px-8 2xl:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-[minmax(320px,38%)_1fr] gap-6 lg:gap-8 items-start">
        <ReadinessExplorer />
        <div class="flex flex-col gap-4 min-w-0">
          <InnovationFilters />
          <InnovationCards />
        </div>
      </div>
    </div>
  </PrimeProvider>
</template>
