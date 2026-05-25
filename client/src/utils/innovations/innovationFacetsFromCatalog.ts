import type { InnovationFacets, InnovationFacetCount } from '~/interfaces/innovation-facets.interface';
import type { InnovationCatalog, InnovationResume } from '~/interfaces/innovation-catalog.interface';

type CountMap = Map<number, { count: number; name?: string }>;

const incrementFacet = (map: CountMap, id: number | null | undefined, name?: string) => {
  if (id === null || id === undefined || Number.isNaN(id)) return;

  const current = map.get(id);
  map.set(id, {
    count: (current?.count ?? 0) + 1,
    name: current?.name ?? name
  });
};

const toFacetCounts = (map: CountMap): InnovationFacetCount[] =>
  Array.from(map.entries())
    .map(([id, value]) => ({ id, count: value.count, name: value.name }))
    .sort((a, b) => b.count - a.count || a.id - b.id);

export function innovationFacetsFromCatalog(catalog: InnovationCatalog): InnovationFacets {
  const countries: CountMap = new Map();
  const sdgs: CountMap = new Map();
  const innovationTypes: CountMap = new Map();
  const actors: CountMap = new Map();
  const readinessScales: CountMap = new Map();

  catalog.innovations.forEach((innovation: InnovationResume) => {
    incrementFacet(
      innovationTypes,
      innovation.innovationType?.id ?? innovation.innovationTypeId,
      innovation.innovationType?.name
    );
    incrementFacet(readinessScales, innovation.readinessScale);

    innovation.countries?.forEach(country => {
      incrementFacet(countries, country.idCountry ?? country.id, country.name ?? country.countryName);
    });

    innovation.sdgs?.forEach(sdg => {
      incrementFacet(sdgs, sdg.sdgId ?? sdg.id, sdg.sdgShortName ?? sdg.sdgFullName);
    });

    innovation.actors?.forEach(actor => {
      incrementFacet(actors, actor.actorId);
    });
  });

  return {
    totalCount: catalog.totalCount ?? catalog.innovations.length,
    countries: toFacetCounts(countries),
    sdgs: toFacetCounts(sdgs),
    innovationTypes: toFacetCounts(innovationTypes),
    actors: toFacetCounts(actors),
    readinessScales: toFacetCounts(readinessScales)
  };
}
