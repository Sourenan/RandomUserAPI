export function flattenObject(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    const fullKey = prefix ? `${prefix} ${key}` : key;
    if (val !== null && typeof val === 'object') {
      Object.assign(acc, flattenObject(val as Record<string, unknown>, fullKey));
    } else {
      acc[fullKey] = String(val);
    }
    return acc;
  }, {} as Record<string, string>);
}

export function toHeaderLabel(key: string) {
  return key.replace(/\b\w/g, (c) => c.toUpperCase());
}

export type SortDir = 'asc' | 'desc';
export type SortState = { key: string; dir: SortDir } | null;

export function getNextSortState(prev: SortState, key: string): SortState {
  if (prev?.key === key) {
    return { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' };
  }
  return { key, dir: 'asc' };
}

export function sortByFlatKey<T>(
  items: T[],
  sort: SortState,
  toFlat: (item: T) => Record<string, string>
): T[] {
  if (!sort) return items;
  return [...items].sort((a, b) => {
    const aVal = toFlat(a)[sort.key] ?? '';
    const bVal = toFlat(b)[sort.key] ?? '';
    const cmp = aVal.localeCompare(bVal, undefined, { numeric: true });
    return sort.dir === 'asc' ? cmp : -cmp;
  });
}
