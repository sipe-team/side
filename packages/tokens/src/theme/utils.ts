export type MapLeaves<T> = T extends string ? string : { [K in keyof T]: MapLeaves<T[K]> };

export const cssVar = (token: string) => `var(--${token})`;

/**
 * Strips the `side-` prefix from every leaf value in a vars subtree,
 * converting `'var(--side-*)'` references into SD CSS variable references (`'var(--*)'`).
 *
 * When the VE contract key and the SD token path don't match (e.g. typography),
 * use cssVar() directly instead.
 */
export function mapVars<T>(obj: T): MapLeaves<T> {
  if (typeof obj === 'string') return obj.replace('var(--side-', 'var(--') as MapLeaves<T>;
  return Object.fromEntries(Object.entries(obj as object).map(([k, v]) => [k, mapVars(v)])) as MapLeaves<T>;
}
