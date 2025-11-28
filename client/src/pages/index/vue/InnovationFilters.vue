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
  <!-- Mobile: padding reducido, margin adaptado | Desktop (md+): diseño original -->
  <div class="flex flex-col h-full m-4 justify-center md:m-8 md:!ml-0">
    <div class="flex flex-col mb-4">
      <!-- Mobile: texto más pequeño | Desktop (lg+): tamaños originales -->
      <h2 class="text-sm font-bold text-[#1E1E1E] lg:text-base xl:text-lg 2xl:text-xl">{{ texts.home.ReadinessExplorerTitle }}</h2>
      <p class="text-xs font-light leading-5 mt-2 lg:mt-3 xl:text-base 2xl:text-md" v-html="texts.home.ReadinessExplorerDescription"></p>
    </div>

    <div
      v-if="value.scalingReadiness !== null && value.scalingReadiness !== undefined"
      class="text-xs text-[#439255] font-medium mb-2 lg:text-sm xl:text-base 2xl:text-base">
      Scaling Readiness:
    </div>
    <!-- Mobile: altura reducida, gap reducido, padding reducido | Desktop (lg+): diseño original -->
    <div
      v-if="value.scalingReadiness !== null && value.scalingReadiness !== undefined"
      class="flex gap-4 transition-all duration-300 rounded-lg items-center p-4 text-white mb-4 h-auto min-h-[100px] lg:gap-8 lg:p-6 lg:mb-5 lg:h-[130px]"
      :style="{ backgroundColor }">
      <!-- Mobile: círculo más pequeño | Desktop (lg+): tamaño original -->
      <div class="text-white border-4 w-[32px] h-[32px] text-sm text-center flex items-center justify-center rounded-full shadow-lg truncate text-clip lg:border-7 lg:w-[40px] lg:h-[40px] lg:text-base">
        {{ value.scalingReadiness }}
      </div>
      <div class="flex flex-col gap-2 flex-1 w-full lg:gap-5">
        <!-- Mobile: textos más pequeños | Desktop (lg+): tamaños originales -->
        <div class="text-sm font-semibold lg:text-base xl:text-lg 2xl:text-xl">{{ readinessText.text }}</div>
        <div class="text-xs font-light lg:text-sm xl:text-base 2xl:text-lg">
          {{ readinessText.description }}
        </div>
      </div>
    </div>

    <!-- Mobile: stack vertical, full width | Desktop (lg+): horizontal layout original -->
    <div class="flex flex-col gap-3 w-full lg:flex-row lg:flex-none lg:gap-1">
      <!-- Innovation typology - Mobile: full width | Desktop (lg+): 58% width -->
      <div class="flex flex-col gap-2 w-full lg:inline-flex lg:flex-row lg:items-center lg:flex-wrap lg:flex-initial lg:w-[58%]">
        <div class="font-bold text-xs lg:whitespace-nowrap xl:text-sm 2xl:text-base">Innovation typology</div>
        <Select
          :modelValue="selectedInnovationType"
          @update:modelValue="handleSelectInnovationTypeChange"
          :options="dataInnovationTypes"
          optionLabel="name"
          placeholder="All"
          class="w-full lg:w-[50%]"
          :pt="{ root: { class: '!bg-transparent !border-black' }, input: { class: '!bg-transparent !border-black' } }" />
      </div>

      <!-- SDG - Mobile: full width | Desktop (lg+): 35% width -->
      <div class="flex flex-col gap-2 w-full lg:inline-flex lg:flex-row lg:items-center lg:flex-wrap lg:w-[35%]">
        <div class="font-bold text-xs lg:whitespace-nowrap xl:text-sm 2xl:text-base">SDG</div>
        <Select
          :modelValue="selectedSDG"
          @update:modelValue="handleSelectSDGChange"
          :options="dataSDGs"
          optionLabel="shortName"
          placeholder="All"
          class="w-full lg:w-[75%]"
          :pt="{ root: { class: '!bg-transparent !border-black' }, input: { class: '!bg-transparent !border-black' } }" />
      </div>

      <!-- Clear button - Mobile: centrado | Desktop (lg+): flex-auto original -->
      <div class="flex items-center justify-center lg:flex-auto lg:justify-start">
        <button class="pi pi-eraser bg-primary-400 rounded-full text-white p-2 hover:bg-primary-500 lg:p-1" @click="clearFilters"></button>
      </div>
    </div>
  </div>
</template>
