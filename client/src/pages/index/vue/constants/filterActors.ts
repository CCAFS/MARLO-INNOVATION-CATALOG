export interface FilterActorOption {
  key: string;
  name: string;
  shortLabel: string;
  color: string;
  apiActorIds: number[];
}

export const ACTOR_FILTER_OPTIONS: FilterActorOption[] = [
  { key: 'banks', name: 'Banks/Investors', shortLabel: 'Banks/Investors', color: '#FF6242', apiActorIds: [5, 15, 16] },
  {
    key: 'farmers',
    name: 'Farmers/(agro)pastoralist/heders/fishers',
    shortLabel: 'Farmers',
    color: '#84AC58',
    apiActorIds: [2]
  },
  {
    key: 'extension',
    name: 'Agricultural extensions agents',
    shortLabel: 'Extension agents',
    color: '#FF8A14',
    apiActorIds: [4]
  },
  { key: 'researchers', name: 'Researchers', shortLabel: 'Researchers', color: '#89AE57', apiActorIds: [1, 6, 7, 8] },
  {
    key: 'policy',
    name: 'Policy actors (public or private)',
    shortLabel: 'Policy actors',
    color: '#85B1CD',
    apiActorIds: [3, 9, 10, 11, 12, 13, 14]
  },
  { key: 'other', name: 'Other', shortLabel: 'Other', color: '#214994', apiActorIds: [17] }
];

export function getActorFilterButtonStyle(actor: FilterActorOption, isSelected: boolean): Record<string, string> {
  return {
    backgroundColor: actor.color,
    borderColor: actor.color,
    boxShadow: isSelected ? `0 0 3px 1px ${actor.color}` : 'none',
    color: '#ffffff',
    opacity: isSelected ? '1' : '0.6'
  };
}

export function isActorOptionSelected(option: FilterActorOption, selectedActorIds: number[] | null): boolean {
  if (!selectedActorIds?.length) return false;
  return option.apiActorIds.every(id => selectedActorIds.includes(id));
}

export function toggleActorOption(option: FilterActorOption, selectedActorIds: number[] | null): number[] | null {
  const current = selectedActorIds ?? [];

  if (isActorOptionSelected(option, current)) {
    const next = current.filter(id => !option.apiActorIds.includes(id));
    return next.length > 0 ? next : null;
  }

  return [...new Set([...current, ...option.apiActorIds])];
}
