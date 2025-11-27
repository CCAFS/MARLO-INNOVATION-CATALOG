<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useSharedValue } from './composables/useSharedValue';
import { texts } from '../../../content/texts';
import { circleColors } from './colors';
import Select from 'primevue/select';
import getReadinessScaleText from '~/utils/readiness-scale/getReadinessScaleText';
import { usePublicAPI } from '~/pages/composables/usePublicAPI';
import type { InnovationType, SdgResume } from '~/interfaces/innovation-catalog-v2.interface';
import { useApi } from '~/composables/database-api/useApi';

const { apiBaseUrl } = usePublicAPI();

const { value, setValue, clearFilters } = useSharedValue();

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

const selectedInnovationType = computed(() => {
  if (value.value.innovationTypeId === null) return null;
  return dataInnovationTypes.value.find(type => type.id === value.value.innovationTypeId) || null;
});

const selectedSDG = computed(() => {
  if (value.value.sdgId === null) return null;
  return dataSDGs.value.find(sdg => sdg.id === value.value.sdgId) || null;
});

const fetchSGDsData = async () => {
  try {
    const { getSustainableDevelopmentGoals } = useApi();
    const response = await getSustainableDevelopmentGoals();
    dataSDGs.value = response;
  } catch (error) {
    console.error('Error fetching SDGs data:', error);
  }
};

const fetchInnovationsTypeData = async () => {
  try {
    const { getInnovationTypes } = useApi();
    const response = await getInnovationTypes();
    dataInnovationTypes.value = response;
  } catch (error) {
    console.error('Error fetching Innovation Types data:', error);
  }
};

const handleSelectInnovationTypeChange = (newValue: InnovationType | null) => {
  setValue({
    innovationTypeId: newValue?.id || null
  });
};

const handleSelectSDGChange = (newValue: SdgResume | null) => {
  setValue({
    sdgId: newValue?.id || null
  });
};

onMounted(() => {
  fetchSGDsData();
  fetchInnovationsTypeData();
});
</script>

<template>
  <div class="flex flex-col h-full m-2.5 md:m-8 md:!ml-0 justify-center">
    <div class="flex flex-col mb-4">
      <h2 class="text-base xl:text-lg 2xl:text-xl font-bold text-[#1E1E1E]">{{ texts.home.ReadinessExplorerTitle }}</h2>
      <p class="text-xs xl:text-base 2xl:text-md font-light leading-5 mt-3" v-html="texts.home.ReadinessExplorerDescription"></p>
    </div>

    <div
      v-if="value.scalingReadiness !== null && value.scalingReadiness !== undefined"
      class="text-sm xl:text-base 2xl:text-base text-[#439255] font-medium mb-2">
      Scaling Readiness:
    </div>
    <div
      v-if="value.scalingReadiness !== null && value.scalingReadiness !== undefined"
      class="flex gap-8 transition-all duration-300 rounded-lg items-center p-6 text-white mb-5 h-[130px]"
      :style="{ backgroundColor }">
      <div class="text-white border-7 w-[40px] h-[40px] text-center flex items-center justify-center rounded-full shadow-lg truncate text-clip">
        {{ value.scalingReadiness }}
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
        <div class="whitespace-nowrap font-bold text-xs xl:text-sm 2xl:text-base">Innovation typology</div>
        <Select
          :modelValue="selectedInnovationType"
          @update:modelValue="handleSelectInnovationTypeChange"
          :options="dataInnovationTypes"
          optionLabel="name"
          placeholder="All"
          class="w-[50%]"
          :pt="{ root: { class: '!bg-transparent !border-black' }, input: { class: '!bg-transparent !border-black' } }" />
      </div>

      <!-- SDG -->
      <div class="inline-flex items-center gap-2 flex-wrap w-[35%]">
        <div class="whitespace-nowrap font-bold text-xs xl:text-sm 2xl:text-base">SDG</div>
        <Select
          :modelValue="selectedSDG"
          @update:modelValue="handleSelectSDGChange"
          :options="dataSDGs"
          optionLabel="shortName"
          placeholder="All"
          class="w-[75%]"
          :pt="{ root: { class: '!bg-transparent !border-black' }, input: { class: '!bg-transparent !border-black' } }" />
      </div>

      <!-- Clear button -->
      <div class="flex items-center flex-auto">
        <button class="pi pi-eraser bg-primary-400 rounded-full text-white p-1 hover:bg-primary-500" @click="clearFilters"></button>
      </div>
    </div>
  </div>
</template>
