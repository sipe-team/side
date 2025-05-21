import { fontSize, fontWeight, lineHeight } from '@sipe-team/tokens';
import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const base = style({
  margin: 0,
});

export const size = styleVariants(fontSize, (value) => ({
  fontSize: `${value}px`,
}));

export const weight = styleVariants(fontWeight, (value) => ({
  fontWeight: value,
}));

export const lineHeightVariants = styleVariants(lineHeight, (value) => ({
  lineHeight: value,
}));

export const typography = recipe({
  base,
  variants: {
    size,
    weight,
    lineHeight: lineHeightVariants,
  },
  defaultVariants: {
    size: 14,
    weight: 'regular',
    lineHeight: 'regular',
  },
});

export type TypographyVariants = Parameters<typeof typography>[0];
