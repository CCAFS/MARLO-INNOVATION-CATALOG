<script setup lang="ts">
import { computed } from 'vue';
import { innovationCatalog } from '../../../jsons/innovation-list';
import type { InnovationCatalog } from '../../../interfaces/innovation-catalog.interface';
import { useSharedValue } from './composables/useSharedValue';
import Paginator from 'primevue/paginator';
const innovationCatalogData: InnovationCatalog = innovationCatalog;
const { value } = useSharedValue();

// Filter scales based on the selected value (index corresponds directly to scale.id)
const filteredScales = computed(() => {
  if (value.value === null || value.value === undefined) {
    return innovationCatalogData.scales;
  }

  return innovationCatalogData.scales.filter(scale => scale.id === value.value);
});
</script>
<template>
  <section class="container mx-auto p-4">
    <div v-for="scale in filteredScales" :key="scale.id" class="mb-8 mt-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="innovation in scale.innovations"
          :key="innovation.id"
          class="border-1 border-green-600/80 rounded-xl p-4 md:p-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
          <!-- Badges -->
          <div class="flex items-center gap-3 mb-3">
            <!-- Trending chip -->
            <div class="inline-flex items-center gap-2 border-1 border-green-600 rounded-full px-4 py-0.5 text-green-700">
              <div class="w-3 h-3 rounded-full border-2 border-green-600 grid place-items-center leading-none">
                <span class="text-sm -mt-0.5">↗</span>
              </div>
              <span class="font-semibold">{{ innovation.key_metrics?.scaling_readiness ?? 5 }}</span>
            </div>

            <!-- Country chip -->
            <div class="inline-flex items-center gap-2 border-1 border-green-600 rounded-full px-4 py-0.5 text-green-700">
              <div class="w-3 h-3 rounded-full border-2 border-green-600 grid place-items-center">
                <div class="w-3 h-3 rounded-full bg-green-600/80" />
              </div>
              <span class="font-semibold">{{ innovation.country ?? 'Senegal' }}</span>
            </div>
          </div>

          <!-- Title -->
          <h3 class="text-md md:text-lg font-extrabold leading-tight text-gray-900 mb-2">
            {{ innovation.title ?? 'The Community of Practices of Institutions creates an' }}
          </h3>

          <!-- Summary -->
          <p class="text-gray-700 text-sm md:text-base leading-5 mb-2">
            {{
              innovation.summary ??
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }}
          </p>

          <!-- View more -->
          <div class="flex">
            <a :href="`/innovation/${innovation.id}`" class="ml-auto text-green-700 underline underline-offset-4 decoration-2 hover:text-green-800">
              View more
            </a>
          </div>
        </article>
      </div>
    </div>
    <Paginator :rows="10" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]"></Paginator>
  </section>
</template>
