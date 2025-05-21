import { color } from '@sipe-team/tokens';
import { recipe } from '@vanilla-extract/recipes';

export const Orientation = {
  horizontal: 'horizontal',
  vertical: 'vertical',
} as const;

export type Orientation = keyof typeof Orientation;

export const divider = recipe({
  base: {
    border: 0,
    margin: 0,
    flexShrink: 0,
    backgroundColor: color.gray300,
  },

  variants: {
    orientation: {
      horizontal: {
        width: '100%',
        height: '1px',
      },
      vertical: {
        width: '1px',
        height: '100%',
      },
    },
    color: {
      default: { backgroundColor: color.gray300 },
      primary: { backgroundColor: color.cyan300 },
      dark: { backgroundColor: color.gray900 },
    },
  },

  defaultVariants: {
    orientation: 'horizontal',
    color: 'default',
  },
});
