export const FLEX_DIRECTIONS = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
export type FlexDirection = (typeof FLEX_DIRECTIONS)[number];

export const FLEX_ALIGNS = ['flex-start', 'flex-end', 'center', 'stretch', 'baseline', 'normal'] as const;
export type FlexAlign = (typeof FLEX_ALIGNS)[number];

export const FLEX_JUSTIFY_CONTENTS = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
  'normal',
] as const;
export type FlexJustify = (typeof FLEX_JUSTIFY_CONTENTS)[number];

export const FLEX_WRAPS = ['nowrap', 'wrap', 'wrap-reverse'] as const;
export type FlexWrap = (typeof FLEX_WRAPS)[number];
