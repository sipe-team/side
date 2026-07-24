import { vars } from '@sipe-team/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { ButtonSize, ButtonVariant } from './Button';

export const iconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
});

export const iconLayout = style({
  gap: vars.spacing.component.xs,
});

export const button = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: 'normal',
    fontWeight: vars.typography.fontWeight.semiBold,
    lineHeight: vars.typography.lineHeight.regular,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    border: 'none',
    fontFamily: vars.typography.fontFamily,
    ':focus-visible': {
      outline: `2px solid ${vars.color.border.focus}`,
      outlineOffset: '2px',
    },
    selectors: {
      '&:disabled, &[aria-disabled="true"]': {
        backgroundColor: vars.color.background.muted,
        color: vars.color.foreground.subtle,
        cursor: 'not-allowed',
        pointerEvents: 'none',
        border: 'none',
      },
    },
  },
  variants: {
    variant: {
      [ButtonVariant.fill]: {
        backgroundColor: vars.color.accent.default,
        color: vars.color.foreground.onAccent,
        ':hover': {
          backgroundColor: vars.color.accent.hover,
        },
        ':active': {
          backgroundColor: vars.color.accent.pressed,
        },
      },
      [ButtonVariant.outline]: {
        backgroundColor: 'transparent',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: vars.color.accent.default,
        color: vars.color.accent.default,
        ':hover': {
          backgroundColor: vars.color.accent.subtle,
        },
        ':active': {
          borderColor: vars.color.accent.hover,
          color: vars.color.accent.hover,
        },
      },
      [ButtonVariant.ghost]: {
        backgroundColor: 'transparent',
        border: 'none',
        color: vars.color.accent.default,
        ':hover': {
          backgroundColor: vars.color.accent.subtle,
        },
        ':active': {
          color: vars.color.accent.hover,
        },
      },
    },
    size: {
      [ButtonSize.sm]: {
        height: '32px',
        padding: `0 ${vars.spacing.component.sm}`,
        borderRadius: vars.radius.component.md,
        fontSize: vars.typography.fontSize['050'],
      },
      [ButtonSize.md]: {
        height: '40px',
        padding: `0 ${vars.spacing.component.md}`,
        borderRadius: vars.radius.component.md,
        fontSize: vars.typography.fontSize['100'],
      },
      [ButtonSize.lg]: {
        height: '48px',
        padding: `0 ${vars.spacing.component.md}`,
        borderRadius: vars.radius.component.md,
        fontSize: vars.typography.fontSize['200'],
      },
      [ButtonSize.xl]: {
        height: '64px',
        padding: `0 ${vars.spacing.component.lg}`,
        borderRadius: vars.radius.component.lg,
        fontSize: vars.typography.fontSize['500'],
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: ButtonVariant.fill,
    size: ButtonSize.lg,
  },
});
