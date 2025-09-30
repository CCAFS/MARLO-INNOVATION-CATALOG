<script setup lang="ts">
import MapFilter from './MapFilter.vue';
import InnovationFilters from './InnovationFilters.vue';
</script>

<template>
  <div class="w-full bg-gradient-to-r from-[#DFF5FF] to-[#B1D4C5] p-10 rounded-lg mt-10 flex gap-10">
    <MapFilter />
    <InnovationFilters />
  </div>
</template>
