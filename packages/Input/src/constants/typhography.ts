export type FontSize = 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32 | 36 | 48;
export type FontWeight = keyof typeof Weight;

export const defaultFontSize: FontSize = 16;
export const defaultFontWeight: FontWeight = 'regular';

export const Weight = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
} as const;
