/** @deprecated No direct replacement. Will be removed when the JSON token pipeline is complete. */
export const breakpointNames = ['sm', 'md', 'lg'] as const;

/** @deprecated No direct replacement. Will be removed when the JSON token pipeline is complete. */
export const breakpoints = {
  sm: 0,
  md: 780,
  lg: 1060,
} as const;

/** @deprecated No direct replacement. Will be removed when the JSON token pipeline is complete. */
export type Breakpoint = keyof typeof breakpoints;
