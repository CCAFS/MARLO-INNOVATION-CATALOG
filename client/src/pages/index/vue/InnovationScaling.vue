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
  <div class="flex flex-col gap-4 text-white">
    <div class="flex flex-col gap-2">
      <h2 class="text-sm font-bold lg:text-base xl:text-lg">{{ texts.home.readinessExplorer.responsibleScalingTitle }}</h2>
      <div
        v-if="isHydrated"
        class="text-xs font-light leading-5 text-white/90 lg:text-sm [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
        v-html="texts.home.readinessExplorer.responsibleScalingDescription"></div>
      <div v-else class="text-xs font-light text-white/70">Loading...</div>
    </div>

    <div class="flex flex-col gap-2">
      <h2 class="text-sm font-bold lg:text-base xl:text-lg">{{ texts.home.readinessExplorer.readinessExplorerTitle }}</h2>
      <p class="text-xs font-light leading-5 text-white/90 lg:text-sm">
        {{ texts.home.readinessExplorer.readinessExplorerDescription }}
      </p>
    </div>

    <div v-if="value.scalingReadiness !== null && value.scalingReadiness !== undefined" class="text-xs text-framework-accent font-medium lg:text-sm">
      {{ texts.home.readinessExplorer.readinessExplorerSubtitle }}
    </div>

    <div
      v-if="value.scalingReadiness !== null && value.scalingReadiness !== undefined"
      class="flex gap-4 transition-all duration-300 rounded-lg items-center p-4 text-white border border-white/30 bg-white/10 mb-2 min-h-[100px] lg:gap-6 lg:p-5"
      :style="{ borderColor: backgroundColor }">
      <div
        class="text-white border-4 w-8 h-8 text-sm text-center flex items-center justify-center rounded-full shadow-lg shrink-0 lg:w-10 lg:h-10"
        :style="{ borderColor: backgroundColor, backgroundColor }">
        {{ value.scalingReadiness }}
      </div>
      <div class="flex flex-col gap-1 flex-1 min-w-0">
        <div class="text-sm font-semibold lg:text-base">{{ readinessText.text }}</div>
        <div class="text-xs font-light text-white/90 lg:text-sm">
          {{ readinessText.description }}
        </div>
      </div>
    </div>

    <div class="flex w-full justify-center text-framework-accent text-sm font-medium gap-2 items-center">
      {{ texts.home.readinessExplorer.seeInnovations }}
      <i class="pi pi-arrow-right text-xs"></i>
    </div>
  </div>
</template>
