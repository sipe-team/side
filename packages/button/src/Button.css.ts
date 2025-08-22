import { vars } from '@sipe-team/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { ButtonSize, ButtonVariant } from './Button';

export const disabled = style({
  opacity: 0.4,
  cursor: 'not-allowed',
  pointerEvents: 'none',
});

export const button = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: vars.radius.md,
    fontWeight: vars.typography.fontWeight.semiBold,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    border: 'none',
    fontFamily: vars.typography.fontFamily,
  },
  variants: {
    variant: {
      [ButtonVariant.filled]: {
        backgroundColor: vars.color.primary,
        color: vars.color.background,
        border: 'none',
        ':hover': {
          opacity: 0.9,
        },
      },
      [ButtonVariant.outline]: {
        backgroundColor: 'transparent',
        border: `1px solid ${vars.color.primary}`,
        color: vars.color.primary,
        ':hover': {
          backgroundColor: vars.color.primary,
          color: vars.color.background,
        },
      },
      [ButtonVariant.ghost]: {
        backgroundColor: 'transparent',
        border: 'none',
        color: vars.color.primary,
        ':hover': {
          backgroundColor: `color-mix(in srgb, ${vars.color.primary} 10%, transparent)`,
        },
      },
    },
    size: {
      [ButtonSize.sm]: {
        height: '32px',
        padding: `0 ${vars.spacing.sm}`,
        fontSize: vars.typography.fontSize['200'],
        lineHeight: vars.typography.lineHeight.compact,
      },
      [ButtonSize.lg]: {
        height: '48px',
        padding: `0 ${vars.spacing.lg}`,
        fontSize: vars.typography.fontSize['400'],
        lineHeight: vars.typography.lineHeight.regular,
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: ButtonVariant.filled,
    size: ButtonSize.lg,
  },
});
