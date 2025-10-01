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
      <h2>{{ texts.home.ReadinessExplorerTitle }}</h2>
      <p>{{ texts.home.ReadinessExplorerDescription }}</p>
    </div>

    <div>SELECTED OPTION:</div>
    <div class="flex flex-1 gap-2" :style="{ backgroundColor }">
      <div>{{ display }}</div>
      <div class="flex flex-col gap-2">
        <div>5 Model/Early Prototype</div>
        <div>The innovation is validated for its ability to achieve a specific impact under fully-controlled conditions</div>
      </div>
    </div>

    <div class="flex flex-1 gap-2 justify-between">
      <div>Innovation typology</div>
      <div>SDG</div>
      <div><button>Clear</button></div>
    </div>
  </div>
</template>
