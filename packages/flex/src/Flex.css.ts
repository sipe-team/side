import { style, styleVariants } from '@vanilla-extract/css';

export const base = style({
  display: 'flex',
});

export const direction = styleVariants({
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  'row-reverse': { flexDirection: 'row-reverse' },
  'column-reverse': { flexDirection: 'column-reverse' },
});

export const align = styleVariants({
  'flex-start': { alignItems: 'flex-start' },
  'flex-end': { alignItems: 'flex-end' },
  center: { alignItems: 'center' },
  stretch: { alignItems: 'stretch' },
  baseline: { alignItems: 'baseline' },
  normal: { alignItems: 'normal' },
});

export const justify = styleVariants({
  'flex-start': { justifyContent: 'flex-start' },
  'flex-end': { justifyContent: 'flex-end' },
  center: { justifyContent: 'center' },
  'space-between': { justifyContent: 'space-between' },
  'space-around': { justifyContent: 'space-around' },
  'space-evenly': { justifyContent: 'space-evenly' },
  normal: { justifyContent: 'normal' },
});

export const wrap = styleVariants({
  nowrap: { flexWrap: 'nowrap' },
  wrap: { flexWrap: 'wrap' },
  'wrap-reverse': { flexWrap: 'wrap-reverse' },
});

export const display = styleVariants({
  flex: { display: 'flex' },
  'inline-flex': { display: 'inline-flex' },
});
