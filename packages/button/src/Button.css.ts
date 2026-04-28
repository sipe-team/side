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
    borderRadius: vars.radius.component.md,
    fontWeight: vars.typography.fontWeight.semiBold,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    border: 'none',
    fontFamily: vars.typography.fontFamily,
    ':focus-visible': {
      outline: `2px solid ${vars.color.border.focus}`,
      outlineOffset: '2px',
    },
  },
  variants: {
    variant: {
      [ButtonVariant.filled]: {
        backgroundColor: vars.color.accent.default,
        color: vars.color.foreground.onAccent,
        border: 'none',
        ':hover': {
          backgroundColor: vars.color.accent.hover,
        },
      },
      [ButtonVariant.outline]: {
        backgroundColor: 'transparent',
        border: `1px solid ${vars.color.accent.default}`,
        color: vars.color.accent.default,
        ':hover': {
          backgroundColor: vars.color.accent.default,
          color: vars.color.foreground.onAccent,
        },
      },
      [ButtonVariant.ghost]: {
        backgroundColor: 'transparent',
        border: 'none',
        color: vars.color.accent.default,
        ':hover': {
          backgroundColor: vars.color.accent.subtle,
        },
      },
    },
    size: {
      [ButtonSize.sm]: {
        height: '32px',
        padding: `0 ${vars.spacing.component.sm}`,
        fontSize: vars.typography.fontSize['200'],
        lineHeight: vars.typography.lineHeight.compact,
      },
      [ButtonSize.lg]: {
        height: '48px',
        padding: `0 ${vars.spacing.component.lg}`,
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
