/** @deprecated Will be removed with all TS primitive files when the JSON token pipeline is complete and components have migrated to `vars.*`. */
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

/** @deprecated Will be removed with all TS primitive files when the JSON token pipeline is complete and components have migrated to `vars.*`. */
export type GridGutter = keyof typeof grid.gutter;
/** @deprecated Will be removed with all TS primitive files when the JSON token pipeline is complete and components have migrated to `vars.*`. */
export type GridContainer = keyof typeof grid.container;
