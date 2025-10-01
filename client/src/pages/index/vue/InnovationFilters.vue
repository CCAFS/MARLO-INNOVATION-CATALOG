<script setup lang="ts">
import { computed, ref } from 'vue';
import { useSharedValue } from './composables/useSharedValue';
import { texts } from '../../../content/texts';
import { circleColors } from './colors';
import Select from 'primevue/select';

const selectedCity = ref();
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
]);

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
      <div>
        Innovation typology: <Select v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
      </div>
      <div>SDG</div>
      <div><button>Clear</button></div>
    </div>
  </div>
</template>
