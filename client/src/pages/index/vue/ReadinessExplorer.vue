<script setup lang="ts">
import MapFilter from './MapFilter.vue';
import InnovationScaling from './InnovationScaling.vue';
import PrimeProvider from './../../../providers/PrimeProvider.vue';
import { texts } from './../../../content/texts.ts';
</script>

<template>
  <!-- Mobile: padding lateral, margin top reducido | Desktop (lg+): diseño original -->
  <div class="container mx-auto mt-6 px-4 lg:mt-10 lg:p-0 xl:px-16 2xl:px-20 h-full overflow-hidden">
    <div class="w-full bg-gradient-to-r from-[#DFF5FF]/[.50] to-[#B1D4C5]/[.74] rounded-lg">
      <!-- Mobile: 1 columna vertical | Desktop (md+): grid 2 columnas | Desktop (lg+): proporciones originales -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[2fr_1.75fr] xl:grid-cols-[2fr_2.25fr] 2xl:grid-cols-[2fr_2.75fr] relative">
        <MapFilter />
        <PrimeProvider>
          <InnovationScaling />
        </PrimeProvider>
      </div>
      <!-- Mobile: margin top reducido | Desktop (md+): margin original -->
      <div
        class="flex flex-1 w-full justify-center text-[#439255] mt-3 text-sm font-light gap-2 items-center pb-4 md:mt-2.5 md:pb-6 lg:mt-0 xl:text-base 2xl:text-lg">
        {{ texts.home.seeInnovations }} <i class="pi pi-arrow-down block w-3 xl:w-4 2xl:w-4.5"></i>
      </div>
    </div>
  </div>
</template>
