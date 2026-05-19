export interface FilterActorOption {
  id: number;
  name: string;
  shortLabel: string;
}

export const ACTOR_FILTER_OPTIONS: FilterActorOption[] = [
  { id: 1, name: 'Banks/Investors', shortLabel: 'Banks/Investors' },
  { id: 2, name: 'Farmers/(agro)pastoralist/heders/fishers', shortLabel: 'Farmers' },
  { id: 3, name: 'Agricultural extensions agents', shortLabel: 'Extension agents' },
  { id: 4, name: 'Researchers', shortLabel: 'Researchers' },
  { id: 5, name: 'Policy actors (public or private)', shortLabel: 'Policy actors' },
  { id: 6, name: 'Other', shortLabel: 'Other' }
];
