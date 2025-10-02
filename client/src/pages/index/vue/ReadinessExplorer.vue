<script setup lang="ts">
import MapFilter from './MapFilter.vue';
import InnovationFilters from './InnovationFilters.vue';
import PrimeProvider from './../../../providers/PrimeProvider.vue';
import { texts } from './../../../content/texts.ts';
</script>

<template>
  <div class="bg-gradient-to-r from-[#DFF5FF] to-[#B1D4C5] p-10 pb-6 mt-10">
    <div class="w-full rounded-lg grid grid-cols-[525px_auto] gap-4">
      <MapFilter />
      <PrimeProvider>
        <InnovationFilters />
      </PrimeProvider>
    </div>

    <div class="flex flex-1 w-full justify-center text-[#439255] text-lg font-light gap-4 items-center">
      {{ texts.home.seeInnovations }} <i class="pi pi-arrow-down block"></i>
    </div>
  </div>
</template>
