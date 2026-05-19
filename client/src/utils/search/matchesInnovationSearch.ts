import type { InnovationResume } from '~/interfaces/innovation-catalog.interface';

const includesTerm = (value: string | number | null | undefined, term: string): boolean => {
  if (value === null || value === undefined) return false;
  return String(value).toLowerCase().includes(term);
};

export const matchesInnovationSearch = (innovation: InnovationResume, rawQuery: string): boolean => {
  const term = rawQuery.trim().toLowerCase();
  if (!term) return false;

  if (includesTerm(innovation.title, term)) return true;
  if (includesTerm(innovation.narrative, term)) return true;
  if (includesTerm(innovation.projectInnovationId, term)) return true;
  if (includesTerm(innovation.year, term)) return true;
  if (includesTerm(innovation.innovationType?.name, term)) return true;

  const countryMatch = innovation.countries?.some(
    country => includesTerm(country.name, term) || includesTerm((country as { countryName?: string }).countryName, term)
  );
  if (countryMatch) return true;

  const regionMatch = innovation.regions?.some(
    region => includesTerm(region.name, term) || includesTerm((region as { regionName?: string }).regionName, term)
  );
  if (regionMatch) return true;

  const actorMatch = (innovation as InnovationResume & { actors?: { actorInfo?: { name?: string } }[] }).actors?.some(actor =>
    includesTerm(actor.actorInfo?.name, term)
  );
  if (actorMatch) return true;

  return false;
};
