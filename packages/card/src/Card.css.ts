import { vars } from '@sipe-team/tokens';

import { recipe } from '@vanilla-extract/recipes';

export const CardVariant = {
  filled: 'filled',
  outline: 'outline',
  ghost: 'ghost',
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
    borderRadius: vars.radius.component.lg,
    padding: vars.spacing.component.lg,
  },
  variants: {
    variant: {
      [CardVariant.filled]: {
        backgroundColor: vars.color.background.subtle,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: vars.color.border.default,
      },
      [CardVariant.outline]: {
        backgroundColor: vars.color.background.default,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: vars.color.border.strong,
      },
      [CardVariant.ghost]: {
        backgroundColor: 'transparent',
        borderStyle: 'none',
        padding: 0,
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
