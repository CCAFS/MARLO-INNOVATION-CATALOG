export interface FilterActorOption {
  id: number;
  name: string;
  shortLabel: string;
  color: string;
}

export const ACTOR_FILTER_OPTIONS: FilterActorOption[] = [
  { id: 1, name: 'Banks/Investors', shortLabel: 'Banks/Investors', color: '#FF6242' },
  { id: 2, name: 'Farmers/(agro)pastoralist/heders/fishers', shortLabel: 'Farmers', color: '#84AC58' },
  { id: 3, name: 'Agricultural extensions agents', shortLabel: 'Extension agents', color: '#FF8A14' },
  { id: 4, name: 'Researchers', shortLabel: 'Researchers', color: '#89AE57' },
  { id: 5, name: 'Policy actors (public or private)', shortLabel: 'Policy actors', color: '#85B1CD' },
  { id: 6, name: 'Other', shortLabel: 'Other', color: '#214994' }
];

export function getActorFilterButtonStyle(actor: FilterActorOption, isSelected: boolean): Record<string, string> {
  return {
    backgroundColor: actor.color,
    borderColor: actor.color,
    color: '#ffffff',
    opacity: isSelected ? '1' : '0.7'
  };
}
