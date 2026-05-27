export const INNOVATION_IMAGE_S3_BUCKET = 'aiccra-innovations-images.s3.us-east-1.amazonaws.com';
export const INNOVATION_IMAGE_PREFIX = 'image-';

export interface InnovationImageUrlOptions {
  width?: number;
  quality?: number;
  s3Bucket?: string;
  imagePrefix?: string;
}

const DEFAULT_OPTIONS: Required<Pick<InnovationImageUrlOptions, 'width' | 'quality'>> & InnovationImageUrlOptions = {
  width: 600,
  quality: 75,
  s3Bucket: INNOVATION_IMAGE_S3_BUCKET,
  imagePrefix: INNOVATION_IMAGE_PREFIX
};

/**
 * Builds the public S3 URL for an innovation image (cards, Open Graph, etc.).
 */
export function getInnovationImageUrl(
  projectInnovationId: string | number,
  options: InnovationImageUrlOptions = {}
): string {
  const { width, quality, s3Bucket, imagePrefix } = { ...DEFAULT_OPTIONS, ...options };
  const base = `https://${s3Bucket}/${imagePrefix}${projectInnovationId}`;
  const params = new URLSearchParams({
    w: width.toString(),
    q: quality.toString()
  });

  return `${base}?${params.toString()}`;
}
