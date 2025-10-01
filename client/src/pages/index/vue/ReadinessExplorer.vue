<script setup lang="ts">
import MapFilter from './MapFilter.vue';
import InnovationFilters from './InnovationFilters.vue';
import PrimeProvider from './../../../providers/PrimeProvider.vue';
</script>

<template>
  <div class="w-full bg-gradient-to-r from-[#DFF5FF] to-[#B1D4C5] p-10 rounded-lg mt-10 grid grid-cols-[525px_auto] gap-4">
    <MapFilter />
    <PrimeProvider>
      <InnovationFilters />
    </PrimeProvider>
  </div>
</template>
