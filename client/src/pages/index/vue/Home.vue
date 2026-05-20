<script setup lang="ts">
import ReadinessExplorer from './ReadinessExplorer.vue';
import InnovationCards from './InnovationCards.vue';
import InnovationFilters from './InnovationFilters.vue';
import PrimeProvider from '~/providers/PrimeProvider.vue';
import AfricaSubtleBg from '~/images/africa-subtle.svg?url';
</script>

<template>
  <PrimeProvider>
    <div
      class="relative mx-auto overflow-hidden px-4 py-6 max-lg:container lg:px-8 xl:container 2xl:px-12">
      <div
        class="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${AfricaSubtleBg})` }"
        aria-hidden="true" />
      <div class="relative z-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(320px,38%)_1fr] lg:gap-8">
        <ReadinessExplorer />
        <div class="flex min-w-0 flex-col gap-4">
          <InnovationFilters />
          <InnovationCards />
        </div>
      </div>
    </div>
  </PrimeProvider>
</template>
