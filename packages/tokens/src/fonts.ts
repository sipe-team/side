export const fontSize = {
  12: 12,
  14: 14,
  16: 16,
  18: 18,
  20: 20,
  24: 24,
  28: 28,
  32: 32,
  36: 36,
  48: 48,
} as const;

/**
 * Font weights following MDN guidelines
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
 */
export const fontWeight = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
} as const;

export const lineHeight = {
  regular: 1.5,
  compact: 1.3,
} as const;
