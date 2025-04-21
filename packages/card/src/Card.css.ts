import { recipe } from '@vanilla-extract/recipes';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import { color } from '@sipe-team/tokens';

export const card = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
    padding: '20px',
  },
  variants: {
    variant: {
      filled: {
        backgroundColor: color.gray100,
        border: `1px solid ${color.gray200}`,
      },
      outline: {
        backgroundColor: color.gray50,
        border: `1px solid ${color.cyan300}`,
      },
    },
    ratio: {
      square: {
        aspectRatio: '1 / 1',
      },
      rectangle: {
        aspectRatio: '16 / 9',
      },
      wide: {
        aspectRatio: '21 / 9',
      },
      portrait: {
        aspectRatio: '3 / 4',
      },
      auto: {
        aspectRatio: 'auto',
      },
    },
  },
  defaultVariants: {
    variant: 'filled',
    ratio: 'rectangle',
  },
});

export type CardVariants = RecipeVariants<typeof card>;
