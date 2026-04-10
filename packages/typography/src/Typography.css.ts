import { fontSize, fontWeight, lineHeight } from '@sipe-team/tokens';
import { style, styleVariants, createVar } from '@vanilla-extract/css';

export const textColorVar = createVar();

export const base = style({
  margin: 0,
  color: textColorVar,
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

export type TypographyVariants = {
  size?: keyof typeof size;
  weight?: keyof typeof weight;
  lineHeight?: keyof typeof lineHeightVariants;
};
