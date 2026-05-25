export interface InnovationFacetCount {
  id: number;
  count: number;
  name?: string;
}

export interface InnovationFacets {
  totalCount: number;
  countries: InnovationFacetCount[];
  sdgs: InnovationFacetCount[];
  innovationTypes: InnovationFacetCount[];
  actors: InnovationFacetCount[];
  readinessScales: InnovationFacetCount[];
}
