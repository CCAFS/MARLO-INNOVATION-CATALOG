<script setup lang="ts">
import MapFilter from './MapFilter.vue';
import InnovationFilters from './InnovationFilters.vue';
import PrimeProvider from './../../../providers/PrimeProvider.vue';
import { texts } from './../../../content/texts.ts';
</script>

<template>
  <div class="container mx-auto mt-10 p-0 xl:px-16 2xl:px-20 h-full overflow-hidden">
    <div class="w-full bg-gradient-to-r from-[#DFF5FF]/[.50] to-[#B1D4C5]/[.74] rounded-lg">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1.75fr] xl:grid-cols-[2fr_2.25fr] 2xl:grid-cols-[2fr_2.75fr] gap-4">
        <MapFilter />
        <PrimeProvider>
          <InnovationFilters />
        </PrimeProvider>
      </div>
      <div
        class="flex flex-1 w-full justify-center text-[#439255] mt-2.5 md:mt-0 text-sm xl:text-base 2xl:text-lg font-light gap-2 items-center pb-6">
        {{ texts.home.seeInnovations }} <i class="pi pi-arrow-down block w-3 xl:w-4 2xl:w-4.5"></i>
      </div>
    </div>
  </div>
</template>
