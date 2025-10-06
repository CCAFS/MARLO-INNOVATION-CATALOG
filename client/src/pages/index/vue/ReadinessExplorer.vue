<script setup lang="ts">
import MapFilter from './MapFilter.vue';
import InnovationFilters from './InnovationFilters.vue';
import PrimeProvider from './../../../providers/PrimeProvider.vue';
import { texts } from './../../../content/texts.ts';
</script>

<template>
  <div class="container mx-auto mt-10 p-0 xl:p-16 2xl:p-20 h-full overflow-hidden">
    <div class="w-full bg-gradient-to-r from-[#DFF5FF] to-[#B1D4C5] grid grid-cols-2 gap-4 rounded-t-lg">
      <MapFilter />
      <PrimeProvider>
        <InnovationFilters />
      </PrimeProvider>
    </div>

    <div class="flex flex-1 w-full bg-gradient-to-r from-[#DFF5FF] to-[#B1D4C5] justify-center text-[#439255] text-lg font-light gap-4 items-center pb-4 rounded-b-lg">
      {{ texts.home.seeInnovations }} <i class="pi pi-arrow-down block"></i>
    </div>
  </div>
</template>
