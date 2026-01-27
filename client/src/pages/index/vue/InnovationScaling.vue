<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useSharedValue } from './composables/useSharedValue';
import { texts } from '../../../content/texts';
import { circleColors } from './colors';

import getReadinessScaleText from '~/utils/readiness-scale/getReadinessScaleText';
import type { InnovationType, SdgResume } from '~/interfaces/innovation-catalog.interface';
import { useApi } from '~/composables/database-api/useApi';

const { value } = useSharedValue();

const dataSDGs = ref<SdgResume[]>([]);
const dataInnovationTypes = ref<InnovationType[]>([]);
const isHydrated = ref(false);

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

onMounted(() => {
  isHydrated.value = true;
  fetchSGDsData();
  fetchInnovationsTypeData();
});
</script>

<template>
  <!-- Mobile: reduced padding, adjusted margin | Desktop (md+): original layout -->
  <div class="flex flex-col m-4 justify-center md:m-8 md:!ml-0">
    <div class="flex flex-col mb-4">
      <h2 class="text-sm font-bold text-[#1E1E1E] lg:text-base xl:text-lg 2xl:text-xl">{{ texts.home.readinessExplorer.responsibleScalingTitle }}</h2>
      <div
        v-if="isHydrated"
        class="text-xs font-light leading-5 mt-2 lg:mt-3 xl:text-base 2xl:text-md"
        v-html="texts.home.readinessExplorer.responsibleScalingDescription"></div>
      <div v-else class="text-xs font-light leading-5 mt-2 lg:mt-3 xl:text-base 2xl:text-md">Loading...</div>
    </div>
    <div class="flex flex-col mb-4">
      <h2 class="text-sm font-bold text-[#1E1E1E] lg:text-base xl:text-lg 2xl:text-xl">{{ texts.home.readinessExplorer.readinessExplorerTitle }}</h2>
      <p class="text-xs font-light leading-5 mt-2 lg:mt-3 xl:text-base 2xl:text-md">
        {{ texts.home.readinessExplorer.readinessExplorerDescription }}
      </p>
    </div>
    <div
      v-if="value.scalingReadiness !== null && value.scalingReadiness !== undefined"
      class="text-xs text-[#439255] font-medium mb-2 lg:text-sm xl:text-base 2xl:text-base">
      {{ texts.home.readinessExplorer.readinessExplorerSubtitle }}
    </div>
    <!-- Mobile: reduced height, reduced gap, reduced padding | Desktop (lg+): original layout -->
    <div
      v-if="value.scalingReadiness !== null && value.scalingReadiness !== undefined"
      class="flex gap-4 transition-all duration-300 rounded-lg items-center p-4 text-white mb-4 h-auto min-h-[100px] lg:gap-8 lg:p-6 lg:mb-5 lg:h-[130px]"
      :style="{ backgroundColor }">
      <!-- Mobile: smaller circle | Desktop (lg+): original size -->
      <div
        class="text-white border-4 w-[32px] h-[32px] text-sm text-center flex items-center justify-center rounded-full shadow-lg truncate text-clip lg:border-7 lg:w-[40px] lg:h-[40px] lg:text-base">
        {{ value.scalingReadiness }}
      </div>
      <div class="flex flex-col gap-2 flex-1 w-full lg:gap-5">
        <!-- Mobile: smaller text | Desktop (lg+): original sizes -->
        <div class="text-sm font-semibold lg:text-base xl:text-lg 2xl:text-xl">{{ readinessText.text }}</div>
        <div class="text-xs font-light lg:text-sm xl:text-base 2xl:text-lg">
          {{ readinessText.description }}
        </div>
      </div>
    </div>
    <!-- Mobile: reduced top margin | Desktop (md+): original margin -->
    <div class="flex w-full justify-center text-[#439255] text-sm font-light gap-2 items-center xl:text-base 2xl:text-lg">
      {{ texts.home.readinessExplorer.seeInnovations }} <i class="pi pi-arrow-down block w-3 xl:w-4 2xl:w-4.5"></i>
    </div>
  </div>
</template>
