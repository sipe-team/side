export const breakpointNames = ['sm', 'md', 'lg'] as const;

export const breakpoints = {
  sm: 0,
  md: 780,
  lg: 1060,
} as const;

export type Breakpoint = keyof typeof breakpoints;
