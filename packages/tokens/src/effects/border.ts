/** @deprecated Will be removed with all TS primitive files when the JSON token pipeline is complete and components have migrated to `vars.*`. */
export const borderWidth = {
  none: 0,
  thin: 1,
  medium: 2,
  thick: 4,
} as const;

/** @deprecated Will be removed with all TS primitive files when the JSON token pipeline is complete and components have migrated to `vars.*`. */
export const borderStyle = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
} as const;

/** @deprecated Will be removed with all TS primitive files when the JSON token pipeline is complete and components have migrated to `vars.*`. */
export type BorderWidth = keyof typeof borderWidth;
/** @deprecated Will be removed with all TS primitive files when the JSON token pipeline is complete and components have migrated to `vars.*`. */
export type BorderStyle = keyof typeof borderStyle;
