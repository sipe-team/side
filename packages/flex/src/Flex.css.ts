import { style, styleVariants } from '@vanilla-extract/css';

import type { FlexAlign, FlexDirection, FlexJustify, FlexWrap } from './constants';

export const base = style({
  display: 'flex',
});

// Mirrors the current @sipe-team/tokens layout breakpoints. The token export is deprecated,
// so Flex keeps these values local until replacement breakpoint tokens are available.
const mediaQuery = {
  md: 'screen and (min-width: 780px)',
  lg: 'screen and (min-width: 1060px)',
} as const;

const createResponsiveStyleVariants = <T extends string, TStyle extends Record<T, object>>(styles: TStyle) => ({
  sm: styleVariants(styles),
  md: styleVariants(styles, (style) => ({
    '@media': {
      [mediaQuery.md]: style,
    },
  })),
  lg: styleVariants(styles, (style) => ({
    '@media': {
      [mediaQuery.lg]: style,
    },
  })),
});

const directionStyles: Record<FlexDirection, { flexDirection: FlexDirection }> = {
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  'row-reverse': { flexDirection: 'row-reverse' },
  'column-reverse': { flexDirection: 'column-reverse' },
};
export const direction = createResponsiveStyleVariants(directionStyles);

const alignStyles: Record<FlexAlign, { alignItems: FlexAlign }> = {
  'flex-start': { alignItems: 'flex-start' },
  'flex-end': { alignItems: 'flex-end' },
  center: { alignItems: 'center' },
  stretch: { alignItems: 'stretch' },
  baseline: { alignItems: 'baseline' },
  normal: { alignItems: 'normal' },
};
export const align = createResponsiveStyleVariants(alignStyles);

const justifyStyles: Record<FlexJustify, { justifyContent: FlexJustify }> = {
  'flex-start': { justifyContent: 'flex-start' },
  'flex-end': { justifyContent: 'flex-end' },
  center: { justifyContent: 'center' },
  'space-between': { justifyContent: 'space-between' },
  'space-around': { justifyContent: 'space-around' },
  'space-evenly': { justifyContent: 'space-evenly' },
  normal: { justifyContent: 'normal' },
};
export const justify = createResponsiveStyleVariants(justifyStyles);

const wrapStyles: Record<FlexWrap, { flexWrap: FlexWrap }> = {
  nowrap: { flexWrap: 'nowrap' },
  wrap: { flexWrap: 'wrap' },
  'wrap-reverse': { flexWrap: 'wrap-reverse' },
};
export const wrap = createResponsiveStyleVariants(wrapStyles);

export const responsiveGap = style({
  gap: 'var(--side-flex-gap-sm)',
  '@media': {
    [mediaQuery.md]: {
      gap: 'var(--side-flex-gap-md, var(--side-flex-gap-sm))',
    },
    [mediaQuery.lg]: {
      gap: 'var(--side-flex-gap-lg, var(--side-flex-gap-md, var(--side-flex-gap-sm)))',
    },
  },
});

export const display = styleVariants({
  flex: { display: 'flex' },
  'inline-flex': { display: 'inline-flex' },
});
