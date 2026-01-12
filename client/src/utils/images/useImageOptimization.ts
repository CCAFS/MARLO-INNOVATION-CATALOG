import { ref, computed } from 'vue';
import ImgNotAvailable from '~/images/no-img-available.png';

export type ImageLoadingState = 'loading' | 'loaded' | 'error';

interface ImageOptimizationOptions {
  width?: number;
  quality?: number;
  blurWidth?: number;
  blurQuality?: number;
  s3Bucket?: string;
  imagePrefix?: string;
}

const DEFAULT_OPTIONS: ImageOptimizationOptions = {
  width: 600,
  quality: 75,
  blurWidth: 30,
  blurQuality: 20,
  s3Bucket: 'aiccra-innovations-images.s3.us-east-1.amazonaws.com',
  imagePrefix: 'image-'
};

/**
 * Composable for managing image optimization and loading states
 * Provides optimized URLs, blur placeholders, and loading state tracking
 *
 * @example
 * const { getOptimizedUrl, getBlurPlaceholder, imageStates, handleImageLoad, handleImageError } = useImageOptimization();
 *
 * // In template:
 * // :src="getOptimizedUrl(innovationId)"
 * // @load="handleImageLoad(innovationId)"
 */
export function useImageOptimization(options: ImageOptimizationOptions = {}) {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const imageLoadingStates = ref<Record<string, ImageLoadingState>>({});

  /**
   * Generates an optimized image URL with query parameters
   * @param imageId - The image identifier (e.g., projectInnovationId)
   * @returns Optimized S3 image URL
   */
  const getOptimizedUrl = (imageId?: string | number): string => {
    if (!imageId) return ImgNotAvailable.src;

    const url = `https://${mergedOptions.s3Bucket}/${mergedOptions.imagePrefix}${imageId}`;
    const params = new URLSearchParams({
      w: mergedOptions.width!.toString(),
      q: mergedOptions.quality!.toString()
    });

    return `${url}?${params.toString()}`;
  };

  /**
   * Generates a low-quality blurred placeholder URL (LQIP technique)
   * @param imageId - The image identifier (e.g., projectInnovationId)
   * @returns Low-quality blur placeholder S3 URL
   */
  const getBlurPlaceholder = (imageId?: string | number): string => {
    if (!imageId) return ImgNotAvailable.src;

    const url = `https://${mergedOptions.s3Bucket}/${mergedOptions.imagePrefix}${imageId}`;
    const params = new URLSearchParams({
      w: mergedOptions.blurWidth!.toString(),
      q: mergedOptions.blurQuality!.toString()
    });

    return `${url}?${params.toString()}`;
  };

  /**
   * Mark an image as loaded
   * @param imageId - The unique identifier for the image
   */
  const handleImageLoad = (imageId: string | number): void => {
    imageLoadingStates.value[imageId] = 'loaded';
  };

  /**
   * Mark an image as errored and set fallback
   * @param event - The error event
   * @param imageId - The unique identifier for the image
   */
  const handleImageError = (event: Event, imageId: string | number): void => {
    imageLoadingStates.value[imageId] = 'error';
    const img = event.target as HTMLImageElement;
    img.src = ImgNotAvailable.src;
  };

  /**
   * Initialize loading state for an image
   * @param imageId - The unique identifier for the image
   */
  const initializeImageState = (imageId: string | number): void => {
    if (!imageLoadingStates.value[imageId]) {
      imageLoadingStates.value[imageId] = 'loading';
    }
  };

  /**
   * Check if an image is currently loaded
   * @param imageId - The unique identifier for the image
   * @returns Boolean indicating if image is loaded
   */
  const isImageLoaded = computed(() => (imageId: string | number): boolean => {
    return imageLoadingStates.value[imageId] === 'loaded';
  });

  /**
   * Check if an image is currently loading
   * @param imageId - The unique identifier for the image
   * @returns Boolean indicating if image is loading
   */
  const isImageLoading = computed(() => (imageId: string | number): boolean => {
    return !imageLoadingStates.value[imageId] || imageLoadingStates.value[imageId] === 'loading';
  });

  /**
   * Get the loading state of a specific image
   * @param imageId - The unique identifier for the image
   * @returns The current loading state
   */
  const getImageState = computed(() => (imageId: string | number): ImageLoadingState => {
    return imageLoadingStates.value[imageId] || 'loading';
  });

  return {
    // Methods
    getOptimizedUrl,
    getBlurPlaceholder,
    handleImageLoad,
    handleImageError,
    initializeImageState,

    // State
    imageLoadingStates: computed(() => imageLoadingStates.value),

    // Computed helpers
    isImageLoaded,
    isImageLoading,
    getImageState
  };
}
