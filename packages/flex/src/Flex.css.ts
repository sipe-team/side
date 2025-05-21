import { type RecipeVariants, recipe } from '@vanilla-extract/recipes';

export const flex = recipe({
  base: {
    display: 'flex',
  },
  variants: {
    direction: {
      row: { flexDirection: 'row' },
      column: { flexDirection: 'column' },
      rowReverse: { flexDirection: 'row-reverse' },
      columnReverse: { flexDirection: 'column-reverse' },
    },
    align: {
      start: { alignItems: 'flex-start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'flex-end' },
      stretch: { alignItems: 'stretch' },
      baseline: { alignItems: 'baseline' },
      normal: { alignItems: 'normal' },
    },
    justify: {
      start: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'flex-end' },
      between: { justifyContent: 'space-between' },
      around: { justifyContent: 'space-around' },
      evenly: { justifyContent: 'space-evenly' },
      normal: { justifyContent: 'normal' },
    },
    wrap: {
      nowrap: { flexWrap: 'nowrap' },
      wrap: { flexWrap: 'wrap' },
      wrapReverse: { flexWrap: 'wrap-reverse' },
    },
    display: {
      flex: { display: 'flex' },
      inlineFlex: { display: 'inline-flex' },
    },
  },
  defaultVariants: {
    direction: 'row',
    align: 'normal',
    justify: 'normal',
    wrap: 'nowrap',
    display: 'flex',
  },
});

export type FlexVariants = RecipeVariants<typeof flex>;
