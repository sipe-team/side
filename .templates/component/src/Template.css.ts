import { vars } from '@sipe-team/tokens';

import { recipe } from '@vanilla-extract/recipes';

export const template = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: vars.typography.fontFamily,
  },
  variants: {},
  defaultVariants: {},
});
