<script setup lang="ts">
import MapFilter from './MapFilter.vue';
import InnovationScaling from './InnovationScaling.vue';
import PrimeProvider from './../../../providers/PrimeProvider.vue';
</script>

<template>
  <!-- Mobile: side padding | Desktop (xlg+): original layout -->
  <div class="container mx-auto mt-6 px-4 lg:mt-10 lg:p-4 xl:px-8 2xl:px-12 h-full overflow-hidden">
    <div class="w-full bg-gradient-to-r from-[#DFF5FF]/[.50] to-[#B1D4C5]/[.74] rounded-lg">
      <!-- Mobile: 1 column vertical | Desktop (md+): 2-column grid | Desktop (lg+): original proportions -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[2fr_1.75fr] xl:grid-cols-[2fr_2.25fr] 2xl:grid-cols-[2fr_2.75fr] relative">
        <MapFilter />
        <PrimeProvider>
          <InnovationScaling />
        </PrimeProvider>
      </div>
    </div>
  </div>
</template>
