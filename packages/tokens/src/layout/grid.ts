/** @deprecated No direct replacement. Will be removed when the JSON token pipeline is complete. */
export const grid = {
  columns: 12,
  gutter: {
    sm: 8,
    md: 16,
    lg: 24,
  },
  container: {
    sm: 540,
    md: 720,
    lg: 960,
    xl: 1140,
    xxl: 1320,
  },
} as const;

/** @deprecated No direct replacement. Will be removed when the JSON token pipeline is complete. */
export type GridGutter = keyof typeof grid.gutter;
/** @deprecated No direct replacement. Will be removed when the JSON token pipeline is complete. */
export type GridContainer = keyof typeof grid.container;
