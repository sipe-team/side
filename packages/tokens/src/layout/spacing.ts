/** @deprecated Use `vars.spacing.component.*` / `vars.spacing.layout.*` instead. Will be removed when the JSON token pipeline is complete. */
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
} as const;

/** @deprecated Use `vars.spacing.component.*` / `vars.spacing.layout.*` instead. Will be removed when the JSON token pipeline is complete. */
export type Spacing = keyof typeof spacing;
