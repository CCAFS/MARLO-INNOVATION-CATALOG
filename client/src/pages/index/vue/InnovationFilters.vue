<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useSharedValue } from './composables/useSharedValue';
import { texts } from '../../../content/texts';
import { circleColors } from './colors';
import Select from 'primevue/select';
import getReadinessScaleText from '~/utils/readiness-scale/getReadinessScaleText';
import { usePublicAPI } from '~/pages/composables/usePublicAPI';
import type { InnovationType, SdgResume } from '~/interfaces/innovation-catalog-v2.interface';

const { apiBaseUrl } = usePublicAPI();

const selectedInnovationType = ref();
const selectedSDG = ref();

const { value, setValue, display } = useSharedValue();

const dataSDGs = ref<SdgResume[]>([]);
const dataInnovationTypes = ref<InnovationType[]>([]);

const backgroundColor = computed(() => {
  return value.value.scalingReadiness !== null && value.value.scalingReadiness !== undefined ? circleColors[value.value.scalingReadiness] : '#16a34a';
});

const readinessText = computed(() => {
  return value.value.scalingReadiness !== null && value.value.scalingReadiness !== undefined
    ? getReadinessScaleText(value.value.scalingReadiness + 1)
    : getReadinessScaleText(0);
});

const fetchSGDsData = async () => {
  try {
    const response = await fetch(`${apiBaseUrl.value}/sustainable-development-goals`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    dataSDGs.value = data;
    console.log('SDGs data:', data);
  } catch (error) {
    console.error('Error fetching SDGs data:', error);
  }
};

const fetchInnovationsTypeData = async () => {
  try {
    const response = await fetch(`${apiBaseUrl.value}/innovations/innovation-types`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    dataInnovationTypes.value = data;
    console.log('Innovation Types data:', data);
  } catch (error) {
    console.error('Error fetching Innovation Types data:', error);
  }
};

const handleSelectInnovationTypeChange = (newValue: InnovationType) => {
  selectedInnovationType.value = newValue;
  setValue({
    ...value.value,
    innovationTypeId: newValue.id
  });
};

const handleSelectSDGChange = (newValue: SdgResume) => {
  selectedSDG.value = newValue;
  setValue({
    ...value.value,
    sdgId: newValue.id
  });
};

onMounted(() => {
  fetchSGDsData();
  fetchInnovationsTypeData();
});
</script>

<template>
  <div class="flex flex-col gap-5 h-max m-8">
    <div>
      <h2 class="text-base xl:text-lg 2xl:text-2xl font-bold text-[#1E1E1E]">{{ texts.home.ReadinessExplorerTitle }}</h2>
      <p class="text-xs xl:text-base 2xl:text-md font-light leading-5 mt-3" v-html="texts.home.ReadinessExplorerDescription"></p>
    </div>

    <div class="text-sm xl:text-base 2xl:text-lg">SELECTED OPTION:</div>
    <div class="flex flex-1 gap-8 transition-all duration-300 rounded-lg items-center p-6 text-white" :style="{ backgroundColor }">
      <div class="text-white border-7 w-[40px] h-[40px] text-center flex items-center justify-center rounded-full shadow-lg truncate text-clip">
        {{ value.scalingReadiness !== null && value.scalingReadiness !== undefined ? value.scalingReadiness : '' }}
      </div>
      <div class="flex flex-col gap-5 flex-1 w-full">
        <div class="text-base xl:text-lg 2xl:text-xl font-semibold">{{ readinessText.text }}</div>
        <div class="text-sm xl:text-base 2xl:text-lg font-light">
          {{ readinessText.description }}
        </div>
      </div>
    </div>

    <div class="flex flex-none gap-1 w-full">
      <!-- Innovation typology -->
      <div class="inline-flex items-center gap-2 flex-wrap flex-initial w-[58%]">
        <div class="whitespace-nowrap font-bold text-xs xl:text-sm 2xl:text-base">Innovation typology:</div>
        <Select
          :modelValue="selectedInnovationType"
          @update:modelValue="handleSelectInnovationTypeChange"
          :options="dataInnovationTypes"
          optionLabel="name"
          placeholder="Filter by Innovation Typology"
          class="w-[50%]" />
      </div>

      <!-- SDG -->
      <div class="inline-flex items-center gap-2 flex-wrap w-[35%]">
        <div class="whitespace-nowrap font-bold text-xs xl:text-sm 2xl:text-base">SDG</div>
        <Select
          :modelValue="selectedSDG"
          @update:modelValue="handleSelectSDGChange"
          :options="dataSDGs"
          optionLabel="shortName"
          placeholder="Filter by SDGs"
          class="w-[75%]" />
      </div>

      <!-- Clear button -->
      <div class="flex items-center flex-auto">
        <button class="pi pi-eraser bg-primary-400 rounded-full text-white p-1 hover:bg-primary-500"></button>
      </div>
    </div>
  </div>
</template>
