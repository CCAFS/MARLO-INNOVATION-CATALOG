import type { InnovationResume } from '~/interfaces/innovation-catalog.interface';

export function matchesActorIdsFilter(innovation: InnovationResume, selectedActorIds: number[] | null): boolean {
  if (!selectedActorIds?.length) return true;
  return innovation.actors?.some(actor => selectedActorIds.includes(actor.actorId)) ?? false;
}
