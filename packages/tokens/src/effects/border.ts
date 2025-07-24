export const borderWidth = {
  none: 0,
  thin: 1,
  medium: 2,
  thick: 4,
} as const;

export const borderStyle = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
} as const;

export type BorderWidth = keyof typeof borderWidth;
export type BorderStyle = keyof typeof borderStyle;
