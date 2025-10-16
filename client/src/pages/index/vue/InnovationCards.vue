<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useSharedValue } from './composables/useSharedValue';
import Paginator from 'primevue/paginator';
import Skeleton from 'primevue/skeleton';
import { usePublicAPI } from '~/pages/composables/usePublicAPI';
import type { InnovationCatalogV2, InnovationCatalogV2Stats } from '~/interfaces/innovation-catalog-v2.interface';
import { getCountryTextStructured } from '~/utils/country-normalize-text/getCountryNormalizeText';

const { value } = useSharedValue();

const { apiUrl, apiBaseUrl } = usePublicAPI();

// Reactive data for API response
const apiData = ref<InnovationCatalogV2 | null>(null);
const apiDataStats = ref<InnovationCatalogV2Stats | null>(null);
const isLoading = ref(false);
const error = ref<Error | null>(null);

// Pagination state
const currentPage = ref(0); // PrimeVue paginator uses 0-based indexing
const rowsPerPage = ref(6); // Default items per page
const totalRecords = ref(0);

// Computed values for pagination
const offset = computed(() => currentPage.value * rowsPerPage.value);
const limit = computed(() => rowsPerPage.value);

// Function to fetch data from API
const fetchInnovationsFromAPI = async (pageOffset = 0, pageLimit = 6) => {
  try {
    isLoading.value = true;
    error.value = null;

    // Use the computed API URL instead of accessing import.meta directly
    const url = `${apiBaseUrl.value}/innovations/search-simple?phase=428&offset=${pageOffset}&limit=${pageLimit}`;

    console.log('Fetching from:', url);
    console.log('API Base URL:', apiBaseUrl.value);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Data fetched from API:', data);
    apiData.value = data;

    // Update total records if the API provides it
    if (data.totalCount !== undefined) {
      totalRecords.value = data.totalCount;
    } else if (data.count !== undefined) {
      totalRecords.value = data.count;
    }
  } catch (err: any) {
    console.error('Error fetching data from API:', err);
    error.value = err instanceof Error ? err : new Error(String(err));

    // Show user-friendly error message
    if (err.message.includes('ETIMEDOUT') || err.message.includes('503')) {
      error.value = new Error('VPN connection timeout. Please check your VPN connection and try again.');
    }
  } finally {
    isLoading.value = false;
  }
};

// Function to handle info stats, only executed on first load place
const fetchInfoStats = async () => {
  try {
    const response = await fetch(`${apiBaseUrl.value}/innovations/stats?phaseId=428`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Info stats fetched from API:', apiDataStats.value);

    apiDataStats.value = data;
    totalRecords.value = data.totalInnovations || 0; // Update total records for pagination
  } catch (error) {
    console.error('Error fetching info stats:', error);
  }
};

// Handle pagination events
const onPageChange = (event: any) => {
  console.log('Page changed:', event);
  currentPage.value = event.page;
  rowsPerPage.value = event.rows;

  // Fetch new data based on pagination
  const newOffset = event.page * event.rows;
  fetchInnovationsFromAPI(newOffset, event.rows);
};

// Fetch data when component is mounted (client-side only)
onMounted(() => {
  fetchInnovationsFromAPI();
  fetchInfoStats();
});
</script>

<template>
  <section class="container mx-auto p-0 xl:p-16 2xl:p-20">
    <!-- V1 Innovations Cards - DEPRECATED at the moment -->
    <!--     <div v-for="scale in filteredScales" :key="scale.id" class="mb-8 mt-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="innovation in scale.innovations"
          :key="innovation.id"
          class="border-1 border-green-600/80 rounded-xl p-4 md:p-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white flex flex-col">
          !-- Badges --
          <div class="flex items-center gap-2 mb-2">
            !-- Trending chip --
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

            !-- Country chip --
            <div class="inline-flex items-center gap-1 border-1 border-[#439255] bg-[#F7F7F7] rounded-full px-2 text-[#439255]">
              <img src="icon-2.png" class="h-4" alt="" srcset="" />
              <span class="text-sm">{{ innovation.country ?? 'Senegal' }}</span>
            </div>
          </div>

          !-- Title --
          <h3 class="text-md md:text-md font-semibold leading-tight text-[#1E1E1E] mb-2">
            {{ innovation.title ?? 'The Community of Practices of Institutions creates an' }}
          </h3>

          !-- Summary --
          <p class="text-[#1E1E1E] text-sm md:sm leading-5 mb-2 flex-grow text-justify">
            {{
              innovation.summary ??
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }}
          </p>

          !-- View more --
          <div class="flex mt-auto">
            <a
              :href="`/innovation/${innovation.id}`"
              class="ml-auto text-[#439255] text-sm font-light underline underline-offset-4 decoration-1 hover:text-green-600">
              View more
            </a>
          </div>
        </article>
      </div>
    </div> -->

    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="mb-8 mt-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article v-for="n in rowsPerPage" :key="n" class="border-1 border-gray-200 rounded-xl p-4 md:p-4 shadow-sm bg-white flex flex-col">
          <!-- Badges Skeleton -->
          <div class="flex items-center gap-2 mb-2">
            <Skeleton width="4rem" height="1.5rem" borderRadius="16px" />
            <Skeleton width="5rem" height="1.5rem" borderRadius="16px" />
          </div>

          <!-- Title Skeleton -->
          <div class="mb-2">
            <Skeleton width="100%" height="1.25rem" class="mb-1" />
            <Skeleton width="80%" height="1.25rem" />
          </div>

          <!-- Summary Skeleton -->
          <div class="mb-2 flex-grow">
            <Skeleton width="100%" height="1rem" class="mb-1" />
            <Skeleton width="100%" height="1rem" class="mb-1" />
            <Skeleton width="70%" height="1rem" />
          </div>

          <!-- View more Skeleton -->
          <div class="flex mt-auto">
            <Skeleton width="5rem" height="1rem" class="ml-auto" />
          </div>
        </article>
      </div>
    </div>
    <!-- V2 Innovations Cards from API -->
    <div v-else-if="apiData && apiData.innovations.length" class="mb-8 mt-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="innovation in apiData.innovations"
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
              <span class="text-sm">{{ innovation.readinessScale ? innovation.readinessScale - 1 : 'N/A' }}</span>
            </div>
            <!-- Country chip -->
            <div class="inline-flex items-center gap-1 border-1 border-[#439255] bg-[#F7F7F7] rounded-full px-2 text-[#439255]">
              <img src="icon-2.png" class="h-4" alt="" srcset="" />
              <span class="text-sm">{{ getCountryTextStructured(innovation.countries, innovation.regions).text }}</span>
            </div>
          </div>
          <!-- Title -->
          <h3 class="text-md md:text-md font-semibold leading-tight text-[#1E1E1E] mb-2 line-clamp-2">
            {{ innovation.title ?? 'No Title Available' }}
          </h3>
          <!-- Summary -->
          <p class="text-[#1E1E1E] text-sm md:sm leading-5 mb-2 flex-grow text-justify line-clamp-3">
            {{ innovation.narrative ?? 'No summary available for this innovation.' }}
          </p>
          <!-- View more -->
          <div class="flex mt-auto">
            <a
              :href="`/innovation/${innovation.projectInnovationId}`"
              class="ml-auto text-[#439255] text-sm font-light underline underline-offset-4 decoration-1 hover:text-green-600">
              View more
            </a>
          </div>
        </article>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!isLoading && (!apiData || !apiData.innovations.length)" class="mb-8 mt-4">
      <div class="text-center py-8">
        <p class="text-gray-500 text-lg">No innovations found.</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error && !isLoading" class="mb-8 mt-4">
      <div class="text-center py-8">
        <p class="text-red-500 text-lg">{{ error.message }}</p>
        <button
          @click="fetchInnovationsFromAPI(offset, limit)"
          class="mt-4 px-4 py-2 bg-[#439255] text-white rounded hover:bg-green-600 transition-colors">
          Try Again
        </button>
      </div>
    </div>

    <!-- Paginator -->
    <div v-if="totalRecords > 0" class="mt-8">
      <Paginator
        :first="currentPage * rowsPerPage"
        :rows="rowsPerPage"
        :totalRecords="totalRecords"
        :rowsPerPageOptions="[6, 12, 18, 24]"
        @page="onPageChange"
        template="PrevPageLink PageLinks NextPageLink"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" />
    </div>

    <!-- Paginator Skeleton -->
    <div v-else-if="totalRecords === 0 && isLoading" class="mt-8">
      <div class="flex justify-center items-center gap-4 mb-4">
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
  transition: background 0.3s ease, width 0.3s ease;
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
</style>
