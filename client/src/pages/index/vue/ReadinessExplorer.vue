<script setup lang="ts">
import MapFilter from './MapFilter.vue';
import InnovationScaling from './InnovationScaling.vue';
</script>

<template>
  <div class="w-full bg-framework-bg rounded-xl p-4 lg:p-6 overflow-hidden">
    <div class="flex flex-col gap-4">
      <MapFilter />
      <InnovationScaling />
    </div>
  </div>
</template>
