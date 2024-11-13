export type FontSize = 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32 | 36 | 48;
export type FontWeight = 'regular' | 'medium' | 'semiBold' | 'bold';
export type LineHeight = 'regular' | 'compact';

const fontWeightMap: Record<FontWeight, number> = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

const lineHeightMap: Record<LineHeight, string> = {
  regular: '150%',
  compact: '130%',
};

export function getTypographyStyles(
  fontSize: FontSize = 14,
  fontWeight: FontWeight = 'regular',
  lineHeight: LineHeight = 'regular'
) {
  return {
    fontSize: `${fontSize}px`,
    fontWeight: fontWeightMap[fontWeight],
    lineHeight: lineHeightMap[lineHeight],
  };
}