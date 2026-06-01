<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useSharedValue } from './composables/useSharedValue';
import { useFilterCatalog } from './composables/useFilterCatalog';
import { texts } from '../../../content/texts';
import { circleColors } from './colors';

import getReadinessScaleText from '~/utils/readiness-scale/getReadinessScaleText';

const { value } = useSharedValue();
const { loadCatalog } = useFilterCatalog();

const isHydrated = ref(false);

const backgroundColor = computed(() => {
  return value.value.scalingReadiness !== null && value.value.scalingReadiness !== undefined ? circleColors[value.value.scalingReadiness] : '#16a34a';
});

const readinessText = computed(() => {
  return value.value.scalingReadiness !== null && value.value.scalingReadiness !== undefined
    ? getReadinessScaleText(value.value.scalingReadiness + 1)
    : getReadinessScaleText(0);
});

onMounted(() => {
  isHydrated.value = true;
  loadCatalog();
});
</script>

<template>
  <div class="flex flex-col gap-4 text-black">
    <div v-if="value.scalingReadiness !== null && value.scalingReadiness !== undefined" class="text-framework-accent text-xs font-medium lg:text-sm">
      {{ texts.home.readinessExplorer.readinessExplorerSubtitle }}
    </div>

    <div
      v-if="value.scalingReadiness !== null && value.scalingReadiness !== undefined"
      class="mb-2 flex min-h-[100px] items-center gap-4 rounded-lg border border-white/30 bg-white/10 p-4 text-white transition-all duration-300 lg:gap-6 lg:p-5"
      :style="{ borderColor: backgroundColor }">
      <div
        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 text-center text-sm text-white shadow-lg lg:h-10 lg:w-10"
        :style="{ borderColor: backgroundColor, backgroundColor }">
        {{ value.scalingReadiness }}
      </div>
      <div class="flex min-w-0 flex-1 flex-col gap-1 text-black">
        <div class="text-sm font-semibold lg:text-base">{{ readinessText.text }}</div>
        <div class="text-xs font-light text-black lg:text-sm">
          {{ readinessText.description }}
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <h2 class="text-sm font-bold lg:text-base xl:text-lg">{{ texts.home.readinessExplorer.responsibleScalingTitle }}</h2>
      <div
        v-if="isHydrated"
        class="text-xs leading-5 font-light text-black lg:text-sm [&_li]:mb-1 [&_ol]:list-decimal [&_ol]:pl-4"
        v-html="texts.home.readinessExplorer.responsibleScalingDescription"></div>
      <div v-else class="text-xs font-light text-black">Loading...</div>
    </div>

    <div class="flex flex-col gap-2">
      <h2 class="text-sm font-bold lg:text-base xl:text-lg">{{ texts.home.readinessExplorer.readinessExplorerTitle }}</h2>
      <p class="text-xs leading-5 font-light text-black lg:text-sm">
        {{ texts.home.readinessExplorer.readinessExplorerDescription }}
      </p>
    </div>

    <div class="flex w-full items-center justify-center gap-2 text-sm font-medium text-[#0B5DA6]">
      {{ texts.home.readinessExplorer.seeInnovations }}
      <i class="pi pi-arrow-right text-xs"></i>
    </div>
  </div>
</template>
