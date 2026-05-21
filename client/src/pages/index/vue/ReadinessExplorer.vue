<script setup lang="ts">
import MapFilter from './MapFilter.vue';
import InnovationScaling from './InnovationScaling.vue';
</script>

<template>
  <div class="w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#DFF5FF]/[.50] to-[#B1D4C5]/[.74] p-4 lg:p-6">
    <div class="flex flex-col gap-4">
      <MapFilter />
      <InnovationScaling />
    </div>
  </div>
</template>
