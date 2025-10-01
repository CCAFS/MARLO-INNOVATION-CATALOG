<script setup lang="ts">
import { computed } from 'vue';
import { useSharedValue } from './composables/useSharedValue';
import { texts } from '../../../content/texts';
import { circleColors } from './colors';

const { value, setValue, display } = useSharedValue();

const backgroundColor = computed(() => {
  return value.value !== null ? circleColors[value.value] : '#16a34a';
});
</script>
<template>
  <div class="flex flex-col gap-4">
    <div>
      <h2 class="text-2xl font-bold text-[#1E1E1E]">{{ texts.home.ReadinessExplorerTitle }}</h2>
      <p class="text-md font-light leading-5 mt-3" v-html="texts.home.ReadinessExplorerDescription"></p>
    </div>

    <div>SELECTED OPTION:</div>
    <div class="flex flex-1 gap-8 transition-all duration-300 rounded-lg items-center p-6 text-white" :style="{ backgroundColor }">
      <div class="text-white border-7 w-13 h-13 flex items-center justify-center rounded-full shadow-lg">{{ value }}</div>
      <div class="flex flex-col gap-5">
        <div class="text-xl font-semibold">5 Model/Early Prototype</div>
        <div class="text-lg font-light">
          The innovation is validated for its ability to achieve a specific impact under fully-controlled conditions
        </div>
      </div>
    </div>

    <div class="flex flex-1 gap-2 justify-between">
      <div>Innovation typology</div>
      <div>SDG</div>
      <div><button>Clear</button></div>
    </div>
  </div>
</template>
