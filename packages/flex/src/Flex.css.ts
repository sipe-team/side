import { style, styleVariants } from '@vanilla-extract/css';
import type { FlexDirection, FlexAlign, FlexJustify, FlexWrap } from './constants';

export const base = style({
  display: 'flex',
});

const directionStyles: Record<FlexDirection, { flexDirection: FlexDirection }> = {
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  'row-reverse': { flexDirection: 'row-reverse' },
  'column-reverse': { flexDirection: 'column-reverse' },
};
export const direction = styleVariants(directionStyles);

const alignStyles: Record<FlexAlign, { alignItems: FlexAlign }> = {
  'flex-start': { alignItems: 'flex-start' },
  'flex-end': { alignItems: 'flex-end' },
  center: { alignItems: 'center' },
  stretch: { alignItems: 'stretch' },
  baseline: { alignItems: 'baseline' },
  normal: { alignItems: 'normal' },
};
export const align = styleVariants(alignStyles);

const justifyStyles: Record<FlexJustify, { justifyContent: FlexJustify }> = {
  'flex-start': { justifyContent: 'flex-start' },
  'flex-end': { justifyContent: 'flex-end' },
  center: { justifyContent: 'center' },
  'space-between': { justifyContent: 'space-between' },
  'space-around': { justifyContent: 'space-around' },
  'space-evenly': { justifyContent: 'space-evenly' },
  normal: { justifyContent: 'normal' },
};
export const justify = styleVariants(justifyStyles);

const wrapStyles: Record<FlexWrap, { flexWrap: FlexWrap }> = {
  nowrap: { flexWrap: 'nowrap' },
  wrap: { flexWrap: 'wrap' },
  'wrap-reverse': { flexWrap: 'wrap-reverse' },
};
export const wrap = styleVariants(wrapStyles);

export const display = styleVariants({
  flex: { display: 'flex' },
  'inline-flex': { display: 'inline-flex' },
});
