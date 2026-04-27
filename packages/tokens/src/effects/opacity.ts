/** @deprecated Will be removed with all TS primitive files when the JSON token pipeline is complete and components have migrated to `vars.*`. */
export const opacity = {
  0: 0,
  5: 0.05,
  10: 0.1,
  20: 0.2,
  25: 0.25,
  30: 0.3,
  40: 0.4,
  50: 0.5,
  60: 0.6,
  70: 0.7,
  75: 0.75,
  80: 0.8,
  90: 0.9,
  95: 0.95,
  100: 1,
} as const;

/** @deprecated Will be removed with all TS primitive files when the JSON token pipeline is complete and components have migrated to `vars.*`. */
export type Opacity = keyof typeof opacity;
