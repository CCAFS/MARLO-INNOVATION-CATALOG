import type { InnovationResume } from '~/interfaces/innovation-catalog.interface';

export interface EssentialInnovationFields {
  projectInnovationId?: number;
  title?: string;
  narrative?: string;
  readinessScale?: number;
  year?: number;
}

const hasNonEmptyText = (value: string | null | undefined): boolean =>
  typeof value === 'string' && value.trim().length > 0;

const hasPositiveNumber = (value: number | null | undefined): boolean =>
  typeof value === 'number' && Number.isFinite(value) && value > 0;

export function hasEssentialInnovationData(innovation: EssentialInnovationFields | InnovationResume): boolean {
  if (!innovation) return false;

  return (
    hasPositiveNumber(innovation.projectInnovationId) &&
    hasNonEmptyText(innovation.title) &&
    hasNonEmptyText(innovation.narrative) &&
    hasPositiveNumber(innovation.readinessScale) &&
    hasPositiveNumber(innovation.year)
  );
}
