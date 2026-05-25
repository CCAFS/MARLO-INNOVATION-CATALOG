<script setup lang="ts">
import MapFilter from './MapFilter.vue';
import InnovationScaling from './InnovationScaling.vue';
</script>

<template>
  <div class="top-[100px] z-10 w-full overflow-hidden rounded-xl bg-linear-to-b from-[#DFF5FF]/50 to-[#B1D4C5]/74 p-4 lg:sticky lg:p-6">
    <div class="flex flex-col gap-4">
      <MapFilter />
      <InnovationScaling />
    </div>
  </div>
</template>
