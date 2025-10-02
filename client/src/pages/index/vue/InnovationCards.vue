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
          class="border-1 border-green-600/80 rounded-xl p-4 md:p-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white flex flex-col">
          <!-- Badges -->
          <div class="flex items-center gap-2 mb-2">
            <!-- Trending chip -->
            <div class="inline-flex items-center gap-1 border-1 border-[#439255] bg-[#F7F7F7] rounded-full px-2 text-[#439255]">
              <svg height="14" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.2557 7.24802C2.06283 7.40936 1.80123 7.5 1.52847 7.5C1.2557 7.5 0.994106 7.40936 0.801231 7.24802C0.608356 7.08668 0.5 6.86785 0.5 6.63968C0.5 6.41151 0.608356 6.19269 0.801231 6.03135L4.22721 3.16636L4.2344 3.16034C4.51432 2.93101 4.89053 2.80256 5.28234 2.80256C5.67416 2.80256 6.05037 2.93101 6.33028 3.16034L6.33748 3.16636L8.08593 4.62895L10.4984 2.49483L9.42939 1.60059C9.32171 1.51041 9.2484 1.39555 9.21871 1.27053C9.18902 1.14551 9.20428 1.01594 9.26258 0.898171C9.32087 0.780405 9.41957 0.67973 9.54623 0.608862C9.67288 0.537994 9.8218 0.500112 9.97417 0.5H13.7291C13.9335 0.5 14.1296 0.567942 14.2742 0.688881C14.4188 0.809819 14.5 0.973847 14.5 1.14488V4.28501C14.4999 4.41247 14.4546 4.53705 14.3699 4.64299C14.2851 4.74894 14.1648 4.83151 14.024 4.88027C13.8832 4.92903 13.7283 4.9418 13.5789 4.91696C13.4294 4.89213 13.2921 4.8308 13.1843 4.74073L11.9529 3.71064L9.17344 6.17064L9.14569 6.19386C8.86577 6.42319 8.48956 6.55164 8.09775 6.55164C7.70594 6.55164 7.32973 6.42319 7.04981 6.19386L7.04262 6.18784L5.28183 4.71579L2.2557 7.24802Z"
                  fill="#439255" />
              </svg>

              <span class="text-sm">{{ innovation.key_metrics?.scaling_readiness ?? 5 }}</span>
            </div>

            <!-- Country chip -->
            <div class="inline-flex items-center gap-1 border-1 border-[#439255] bg-[#F7F7F7] rounded-full px-2 text-[#439255]">
              <img src="icon-2.png" class="h-4" alt="" srcset="" />
              <span class="text-sm">{{ innovation.country ?? 'Senegal' }}</span>
            </div>
          </div>

          <!-- Title -->
          <h3 class="text-md md:text-md font-semibold leading-tight text-[#1E1E1E] mb-2">
            {{ innovation.title ?? 'The Community of Practices of Institutions creates an' }}
          </h3>

          <!-- Summary -->
          <p class="text-[#1E1E1E] text-sm md:sm leading-5 mb-2 flex-grow text-justify">
            {{
              innovation.summary ??
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }}
          </p>

          <!-- View more -->
          <div class="flex mt-auto">
            <a
              :href="`/innovation/${innovation.id}`"
              class="ml-auto text-[#439255] text-sm font-light underline underline-offset-4 decoration-1 hover:text-green-600">
              View more
            </a>
          </div>
        </article>
      </div>
    </div>
    <Paginator :rows="10" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]"></Paginator>
  </section>
</template>
