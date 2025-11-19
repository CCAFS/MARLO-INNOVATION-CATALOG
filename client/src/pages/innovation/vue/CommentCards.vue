<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
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

// Define props
const props = defineProps<{
  innovationId: number;
}>();

// Use refs for reactive data
const communityStories = ref<any[]>([]);
const isLoading = ref(true);

// Initial load
const loadStories = async () => {
  isLoading.value = true;
  try {
    communityStories.value = await getCommunitySolutionStories(props.innovationId);
  } catch (error) {
    console.warn('Failed to fetch community stories:', error);
    communityStories.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Event handler for refresh
const handleRefreshEvent = () => {
  console.log('Refresh event received, reloading stories...');
  loadStories();
};

// Initial load
onMounted(() => {
  loadStories();
  // Listen for custom event
  window.addEventListener('refresh-comments', handleRefreshEvent);
});

// Cleanup
onUnmounted(() => {
  window.removeEventListener('refresh-comments', handleRefreshEvent);
});

// Expose refresh method
defineExpose({
  refreshStories: loadStories
});
</script>

<template>
  <div class="grid grid-cols-1 gap-4 mt-4">
    <!-- Skeleton -->
    <div v-if="isLoading" class="grid grid-cols-1 gap-4">
      <div v-for="n in 3" :key="n" class="border-l-primary-400 border border-border-light border-l-4 w-full p-4">
        <div class="flex items-center mb-2 gap-2">
          <Skeleton width="8rem" height=".75rem" borderRadius="2px" class="mb-2"></Skeleton>
          <span class="w-[2px] h-[2px] rounded-full bg-text-800"></span>
          <Skeleton width="6rem" height=".75rem" borderRadius="2px" class="mb-2"></Skeleton>
        </div>
        <Skeleton width="100%" height=".75rem" borderRadius="2px" class="mb-2"></Skeleton>
        <Skeleton width="100%" height=".75rem" borderRadius="2px" class="mb-2"></Skeleton>
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

<style scoped>
:deep(.p-skeleton) {
  --p-skeleton-background: rgba(0, 0, 0, 0.08);
  --p-skeleton-animation-background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0));
}

:deep(.p-skeleton::after) {
  background: var(--p-skeleton-animation-background);
}
</style>
