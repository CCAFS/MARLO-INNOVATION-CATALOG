<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useSharedValue } from './composables/useSharedValue';
import { useInnovations } from './composables/useInnovations';
import { useImageOptimization } from '~/utils/images/useImageOptimization';
import Paginator from 'primevue/paginator';
import Skeleton from 'primevue/skeleton';
import { getCountryTextStructured } from '~/utils/country-normalize-text/getCountryNormalizeText';
import EmptyDataImg from '~/images/empty-data.png';
import ImgNotSearchResults from '~/images/no-search-result-found.png';
import ImgGlobal from '~/images/icon-2.svg?component';
import { texts } from '~/content/texts';

// Initialize image optimization utility
const { getOptimizedUrl, getBlurPlaceholder, imageLoadingStates, handleImageLoad, handleImageError } = useImageOptimization();

const imgEmptyDataStats = {
  title: 'No Data',
  value: 32,
  imagePath: EmptyDataImg,
  quality: 'max'
};

const { value } = useSharedValue();
const {
  apiData,
  isLoading,
  error,
  currentPage,
  rowsPerPage,
  totalRecords,
  fetchInnovations,
  onPageChange,
  isSearchActive,
  searchQuery,
  limitedInnovations,
  isMatchingSearch,
  isSearchFiltering,
  handleSearch
} = useInnovations();

const handlePageChange = (event: any) => {
  onPageChange(event, value.value);
};

const handleFetchInnovations = (pageOffset = 0, pageLimit = 6) => {
  fetchInnovations(value.value, pageOffset, pageLimit);
};

// Watch for filter changes and reset to first page
watch(
  () => value.value,
  (newValue, oldValue) => {
    // Only reset if filters actually changed
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      currentPage.value = 0;
      if (isSearchActive.value && searchQuery.value.trim()) {
        handleSearch(searchQuery.value, newValue);
        return;
      }
      handleFetchInnovations(0, rowsPerPage.value);
    }
  },
  { deep: true }
);

onMounted(() => {
  handleFetchInnovations();
});
</script>

<template>
  <!-- Mobile: side padding | Desktop (xlg+): original layout -->
  <section class="w-full pt-2">
    <!-- Loading Skeleton -->
    <div v-if="isLoading && !isSearchFiltering" class="mt-4 mb-8">
      <!-- Mobile: 1 column | Tablet (md+): 2 columns | Desktop (2xl+): 3 columns -->
      <div class="flex flex-col gap-4">
        <article v-for="n in rowsPerPage" :key="n" class="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <!-- Badges Skeleton -->
          <div class="mb-2 flex flex-wrap items-center gap-2">
            <Skeleton width="4rem" height="1.5rem" borderRadius="16px" />
            <Skeleton width="5rem" height="1.5rem" borderRadius="16px" />
          </div>

          <!-- Title Skeleton -->
          <div class="mb-2">
            <Skeleton width="100%" height="1.25rem" class="mb-1" />
            <Skeleton width="80%" height="1.25rem" />
          </div>

          <!-- Summary Skeleton -->
          <div class="mb-2 grow">
            <Skeleton width="100%" height="1rem" class="mb-1" />
            <Skeleton width="100%" height="1rem" class="mb-1" />
            <Skeleton width="70%" height="1rem" />
          </div>

          <!-- View more Skeleton -->
          <div class="mt-auto flex">
            <Skeleton width="5rem" height="1rem" class="ml-auto" />
          </div>
        </article>
      </div>
    </div>
    <!-- V2 Innovations Cards from API -->
    <div
      v-else-if="isSearchActive && searchQuery.trim().length > 0 && !isSearchFiltering && !isMatchingSearch"
      class="col-span-full mt-4 mb-8 flex flex-col items-center justify-center rounded-lg bg-white py-2 shadow-md lg:py-4">
      <img height="{100}" :src="ImgNotSearchResults.src" alt="No Search Results Found" class="h-20 w-20 pb-1 lg:w-auto" />
      <p class="mb-2 text-base text-gray-500 lg:text-lg">{{ texts.home.innovationCards.noResultsFound.title }}</p>
      <p class="text-xs text-gray-400 lg:text-sm">{{ texts.home.innovationCards.noResultsFound.subtitle }}</p>
    </div>
    <div v-else-if="limitedInnovations.length" class="mt-4 mb-8">
      <!-- Mobile: 1 column | Tablet (md+): 2 columns | Desktop (2xl+): 3 columns -->
      <div class="flex flex-col gap-4">
        <article
          v-for="innovation in limitedInnovations"
          :key="innovation.id"
          class="h-[200px] overflow-hidden rounded-xl border border-green-600/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
          <a :href="`/innovation/${innovation.projectInnovationId}`" class="flex h-full gap-2">
            <!-- Image section: 1/3 width -->
            <div class="relative w-1/3 shrink-0 overflow-hidden bg-gray-100">
              <!-- Placeholder/skeleton while loading -->
              <Skeleton v-if="!imageLoadingStates[innovation.id] || imageLoadingStates[innovation.id] === 'loading'" width="100%" height="100%" />

              <!-- Low Quality Image Placeholder (LQIP) - shows blurred version while loading -->
              <img
                v-if="innovation.projectInnovationId"
                :src="getBlurPlaceholder(innovation.projectInnovationId)"
                alt="innovation-placeholder"
                class="absolute inset-0 h-full w-full object-cover blur-md sm:object-contain md:object-cover" />

              <!-- Main Image -->
              <img
                :src="getOptimizedUrl(innovation.projectInnovationId)"
                :alt="`${innovation.title || 'innovation'}`"
                loading="lazy"
                decoding="async"
                @load="handleImageLoad(innovation.id)"
                @error="e => handleImageError(e, innovation.id)"
                class="relative z-10 h-full w-full object-cover transition-opacity duration-300 sm:object-contain md:object-cover"
                :class="{
                  'opacity-0': imageLoadingStates[innovation.id] === 'loading',
                  'opacity-100': imageLoadingStates[innovation.id] === 'loaded'
                }" />
            </div>

            <!-- Content section: 2/3 width -->
            <div class="flex h-full w-2/3 flex-col p-4 text-inherit no-underline">
              <!-- Badges - Mobile: wrapping allowed | Desktop: keep in one line -->
              <div class="mb-2 flex flex-wrap items-center gap-2">
                <!-- Trending chip -->
                <div class="inline-flex items-center gap-1 rounded-full border border-[#439255] bg-[#F7F7F7] px-2 py-0.5 text-[#439255]">
                  <svg height="14" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.2557 7.24802C2.06283 7.40936 1.80123 7.5 1.52847 7.5C1.2557 7.5 0.994106 7.40936 0.801231 7.24802C0.608356 7.08668 0.5 6.86785 0.5 6.63968C0.5 6.41151 0.608356 6.19269 0.801231 6.03135L4.22721 3.16636L4.2344 3.16034C4.51432 2.93101 4.89053 2.80256 5.28234 2.80256C5.67416 2.80256 6.05037 2.93101 6.33028 3.16034L6.33748 3.16636L8.08593 4.62895L10.4984 2.49483L9.42939 1.60059C9.32171 1.51041 9.2484 1.39555 9.21871 1.27053C9.18902 1.14551 9.20428 1.01594 9.26258 0.898171C9.32087 0.780405 9.41957 0.67973 9.54623 0.608862C9.67288 0.537994 9.8218 0.500112 9.97417 0.5H13.7291C13.9335 0.5 14.1296 0.567942 14.2742 0.688881C14.4188 0.809819 14.5 0.973847 14.5 1.14488V4.28501C14.4999 4.41247 14.4546 4.53705 14.3699 4.64299C14.2851 4.74894 14.1648 4.83151 14.024 4.88027C13.8832 4.92903 13.7283 4.9418 13.5789 4.91696C13.4294 4.89213 13.2921 4.8308 13.1843 4.74073L11.9529 3.71064L9.17344 6.17064L9.14569 6.19386C8.86577 6.42319 8.48956 6.55164 8.09775 6.55164C7.70594 6.55164 7.32973 6.42319 7.04981 6.19386L7.04262 6.18784L5.28183 4.71579L2.2557 7.24802Z"
                      fill="#439255" />
                  </svg>
                  <span class="text-sm">{{
                    innovation.readinessScale ? innovation.readinessScale - 1 : texts.home.innovationCards.innovationDetails.readinessScale
                  }}</span>
                </div>
                <!-- Country chip -->
                <div class="inline-flex items-center gap-1 rounded-full border border-[#439255] bg-[#F7F7F7] px-2 py-0.5 text-[#439255]">
                  <ImgGlobal class="svg-scale h-3.5 w-3.5" width="14" height="14" style="width: 14px; height: 14px" viewBox="7 7 14 14" />
                  <span class="text-sm">{{ getCountryTextStructured([...innovation.countries], [...innovation.regions]).text }}</span>
                </div>

                <div
                  v-if="getCountryTextStructured([...innovation.countries], [...innovation.regions], true).hasMore"
                  class="inline-flex items-center gap-1 rounded-full border border-[#439255] bg-[#F7F7F7] px-2 py-0.5 text-[#439255]">
                  <span
                    class="tooltip text-sm"
                    :aria-label="getCountryTextStructured([...innovation.countries], [...innovation.regions], true).additionalInfo">
                    {{ getCountryTextStructured([...innovation.countries], [...innovation.regions], true).additionalText }}

                    <span class="tooltiptext" aria-hidden="true">{{
                      getCountryTextStructured([...innovation.countries], [...innovation.regions], true).additionalInfo
                    }}</span>
                  </span>
                </div>

                <!-- Year chip -->
                <div class="inline-flex items-center gap-1 rounded-full border border-[#439255] bg-[#F7F7F7] px-2 py-0.5 text-[#439255]">
                  <i class="pi pi-calendar h-3.75 w-3.75" style="font-size: 14px"></i>
                  <span class="text-sm">{{ innovation.year || texts.home.innovationCards.innovationDetails.year }}</span>
                </div>
              </div>
              <!-- Title -->
              <h3 class="md:text-md mb-2 line-clamp-2 text-base leading-tight font-semibold text-[#1E1E1E]">
                {{ innovation.title ?? texts.home.innovationCards.innovationDetails.title }}
              </h3>
              <!-- Summary -->
              <p class="invisible mb-2 line-clamp-1 grow text-justify text-sm leading-5 text-[#1E1E1E] sm:visible sm:line-clamp-3">
                {{ innovation.narrative ?? texts.home.innovationCards.innovationDetails.narrative }}
              </p>
              <!-- View more -->
              <div class="mt-auto flex">
                <span class="ml-auto text-sm font-light text-[#439255] underline decoration-1 underline-offset-4">{{
                  texts.home.innovationCards.innovationDetails.viewMore
                }}</span>
              </div>
            </div>
          </a>
        </article>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!isLoading && apiData && !apiData.innovations.length" class="mt-4 mb-8">
      <div class="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 py-8 text-center shadow-sm md:p-4">
        <img :src="EmptyDataImg.src" :alt="imgEmptyDataStats.title" width="150" height="100" class="pb-2" />
        <p class="text-lg text-gray-500">{{ texts.home.innovationCards.noResultsAvailable.title }}</p>
        <p v-if="error && !isLoading" class="mt-2 text-lg text-red-500">{{ texts.home.innovationCards.noResultsAvailable.subtitle }}</p>
      </div>
    </div>

    <!-- Paginator -->
    <div v-if="totalRecords > 0" class="mt-8 mb-8">
      <Paginator
        :first="currentPage * rowsPerPage"
        :rows="rowsPerPage"
        :totalRecords="totalRecords"
        :rowsPerPageOptions="[6, 12, 18, 24]"
        @page="handlePageChange"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
        currentPageReportTemplate="{first} - {last} of {totalRecords}" />
    </div>

    <!-- Paginator Skeleton -->
    <div v-else-if="totalRecords === 0 && isLoading" class="mt-8 mb-8">
      <div class="mb-4 flex items-center justify-center gap-4">
        <Skeleton width="2rem" height="2rem" borderRadius="4px" />
        <div class="flex gap-2">
          <Skeleton width="2rem" height="2rem" borderRadius="50%" />
          <Skeleton width="2rem" height="2rem" borderRadius="50%" />
          <Skeleton width="2rem" height="2rem" borderRadius="50%" />
        </div>
        <Skeleton width="2rem" height="2rem" borderRadius="4px" />
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.p-paginator) {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  background: transparent;
  border: none;
  box-shadow: none;
}

:deep(.p-paginator-first),
:deep(.p-paginator-prev),
:deep(.p-paginator-next),
:deep(.p-paginator-last) {
  color: var(--color-secondary-300) !important;
  font-size: 1rem;
  background: transparent;
  border: none;
  transition: transform 0.2s ease;
}

:deep(.p-paginator-prev:hover),
:deep(.p-paginator-next:hover) {
  transform: scale(1.1);
}

:deep(.p-paginator-pages) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

:deep(.p-paginator-page) {
  width: 1rem;
  height: 1rem;
  min-width: 1rem;
  border-radius: 50%;
  background: #e0e3e7 !important;
  border: none;
  color: transparent;
  transition:
    background 0.3s ease,
    width 0.3s ease;
}

:deep(.p-paginator-page-selected) {
  background: var(--color-secondary-300) !important;
  color: transparent !important;
  width: 3rem;
  border-radius: 25px;
}

:deep(.p-paginator-page:hover) {
  background: #a5d6a7 !important;
  color: transparent !important;
  cursor: pointer;
}

/* Remove text (just dots or pill shapes) */
:deep(.p-paginator-page span) {
  display: none;
}

:deep(.svg-scale path) {
  transform: scale(0.5);
  transform-origin: center;
}

:deep(.p-paginator-current) {
  font-size: 14px;
}
</style>
