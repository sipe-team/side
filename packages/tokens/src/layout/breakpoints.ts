/** @deprecated Will be removed with all TS primitive files when the JSON token pipeline is complete and components have migrated to `vars.*`. */
export const breakpointNames = ['sm', 'md', 'lg'] as const;

/** @deprecated Will be removed with all TS primitive files when the JSON token pipeline is complete and components have migrated to `vars.*`. */
export const breakpoints = {
  sm: 0,
  md: 780,
  lg: 1060,
} as const;

/** @deprecated Will be removed with all TS primitive files when the JSON token pipeline is complete and components have migrated to `vars.*`. */
export type Breakpoint = keyof typeof breakpoints;
