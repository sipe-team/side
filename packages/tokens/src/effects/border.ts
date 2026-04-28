/** @deprecated No direct replacement. Will be removed when the JSON token pipeline is complete. */
export const borderWidth = {
  none: 0,
  thin: 1,
  medium: 2,
  thick: 4,
} as const;

/** @deprecated No direct replacement. Will be removed when the JSON token pipeline is complete. */
export const borderStyle = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
} as const;

/** @deprecated No direct replacement. Will be removed when the JSON token pipeline is complete. */
export type BorderWidth = keyof typeof borderWidth;
/** @deprecated No direct replacement. Will be removed when the JSON token pipeline is complete. */
export type BorderStyle = keyof typeof borderStyle;
