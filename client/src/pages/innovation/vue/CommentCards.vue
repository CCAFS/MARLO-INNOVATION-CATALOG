<script lang="ts" setup>
import { useApi } from '~/composables/database-api/useApi';
import Skeleton from 'primevue/skeleton';
import EmptyDataImg from '~/images/empty-data.png';

const imgEmptyDataStats = {
  title: 'No Data',
  value: 32,
  imagePath: EmptyDataImg,
  quality: 'max'
};

const getCommunitySolutionStories = async (innovationId: number) => {
  try {
    const { getCommunityStoriesByInnovationId } = useApi();
    const response = await getCommunityStoriesByInnovationId(innovationId);
    return response || [];
  } catch (error) {
    console.error('Error fetching community solution stories:', error);
    return [];
  }
};

let communityStories: any[] = [];
let isLoading = true;

// Define props
const props = defineProps<{
  innovationId: number;
}>();

try {
  communityStories = await getCommunitySolutionStories(props.innovationId);
  isLoading = false;
} catch (error) {
  console.warn('Failed to fetch community stories during build:', error);
  communityStories = [];
  isLoading = false;
}
</script>

<template>
  <div class="grid grid-cols-1 gap-4 mt-4">
    <!-- Skeleton -->
    <div
      v-if="isLoading"
      class="text-center py-4 text-gray-500 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-border-light flex flex-col items-center gap-2">
      <div v-for="n in 3" :key="n" class="border-l-primary-400 border border-border-light border-l-4 w-full p-4 mb-4">
        <div class="flex items-center mb-2 gap-2">
          <Skeleton width="8rem" height="1rem" />
          <span class="w-[2px] h-[2px] rounded-full bg-gray-300" />
          <Skeleton width="6rem" height="1rem" />
        </div>
        <Skeleton width="100%" height="3rem" />
      </div>
    </div>
    <!-- Community Stories -->
    <div v-else-if="communityStories.length > 0" class="grid grid-cols-1 gap-4">
      <div
        v-for="story in communityStories"
        :key="story.id"
        class="border-l-primary-400 border border-border-light border-l-4 w-full p-4 hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center mb-2 gap-2">
          <span class="text-xs xl:text-sm 2xl:text-base text-text-800 font-semibold"
            >{{ story.user_name }} {{ story.user_lastname ? story.user_lastname : '' }}</span
          >
          <span class="w-[2px] h-[2px] rounded-full bg-text-800" />
          <span class="text-xs xl:text-sm 2xl:text-base text-text-500 font-normal">
            {{ new Date(story.active_since).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) }}
          </span>
        </div>
        <p class="text-xs xl:text-sm 2xl:text-base text-text-800 font-normal">{{ story.comment }}</p>
      </div>
    </div>
    <!-- No Data -->
    <div
      v-else-if="!isLoading && communityStories.length === 0"
      class="text-center py-4 text-gray-500 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-border-light flex flex-col items-center gap-2">
      <img :src="imgEmptyDataStats.imagePath.src" :alt="imgEmptyDataStats.title" width="150" height="100" class="pb-2" />
      <p class="text-sm">No community stories available yet. Be the first to share your experience!</p>
    </div>
  </div>
</template>
