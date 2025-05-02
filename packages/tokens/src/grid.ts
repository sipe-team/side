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

export type GridGutter = keyof typeof grid.gutter;
export type GridContainer = keyof typeof grid.container;
