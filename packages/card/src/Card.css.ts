import { color } from '@sipe-team/tokens';
import { recipe } from '@vanilla-extract/recipes';

export const CardVariant = {
  filled: 'filled',
  outline: 'outline',
} as const;

export const CardRatio = {
  rectangle: 'rectangle',
  square: 'square',
  wide: 'wide',
  portrait: 'portrait',
  auto: 'auto',
} as const;

export type CardVariant = (typeof CardVariant)[keyof typeof CardVariant];
export type CardRatio = (typeof CardRatio)[keyof typeof CardRatio];

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
      [CardVariant.filled]: {
        backgroundColor: color.gray100,
        border: `1px solid ${color.gray200}`,
      },
      [CardVariant.outline]: {
        backgroundColor: color.gray50,
        border: `1px solid ${color.cyan300}`,
      },
    },
    ratio: {
      [CardRatio.square]: {
        aspectRatio: '1 / 1',
      },
      [CardRatio.rectangle]: {
        aspectRatio: '16 / 9',
      },
      [CardRatio.wide]: {
        aspectRatio: '21 / 9',
      },
      [CardRatio.portrait]: {
        aspectRatio: '3 / 4',
      },
      [CardRatio.auto]: {
        aspectRatio: 'auto',
      },
    },
  },
  defaultVariants: {
    variant: CardVariant.filled,
    ratio: CardRatio.rectangle,
  },
});
