import { color, vars } from '@sipe-team/tokens';

import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { ButtonSize, ButtonVariant } from './Button';

export const buttonOrange = createVar();
export const buttonGradient = createVar();
export const buttonRed = createVar();

export const iconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
});

export const iconLayout = style({
  gap: vars.spacing.component.md,
});

export const button = recipe({
  base: {
    vars: {
      [buttonOrange]: '#FF7C27',
      [buttonGradient]: 'linear-gradient(225deg, #FF4500 0%, #FFB24D 100%)',
      [buttonRed]: '#FE4E07',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: 'normal',
    fontWeight: vars.typography.fontWeight.semiBold,
    lineHeight: '150%',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    border: 'none',
    fontFamily: vars.typography.fontFamily,
    ':focus-visible': {
      outline: `2px solid ${buttonOrange}`,
      outlineOffset: '2px',
    },
    selectors: {
      '&:disabled, &[aria-disabled="true"]': {
        backgroundColor: color.gray500,
        color: color.gray600,
        cursor: 'not-allowed',
        pointerEvents: 'none',
        border: 'none',
        background: color.gray500,
      },
    },
  },
  variants: {
    variant: {
      [ButtonVariant.fill]: {
        backgroundColor: buttonOrange,
        color: '#000',
        ':hover': {
          background: buttonGradient,
        },
        ':active': {
          background: buttonRed,
        },
      },
      [ButtonVariant.outline]: {
        backgroundColor: 'transparent',
        border: `1px solid ${buttonOrange}`,
        color: buttonOrange,
      },
      [ButtonVariant.ghost]: {
        backgroundColor: 'transparent',
        border: 'none',
        color: buttonOrange,
        ':hover': {
          opacity: 0.8,
        },
        ':active': {
          color: buttonRed,
        },
      },
    },
    size: {
      [ButtonSize.sm]: {
        height: '32px',
        padding: `0 ${vars.spacing.component.xs}`,
        borderRadius: vars.radius.component.md,
        fontSize: vars.typography.fontSize['050'],
      },
      [ButtonSize.md]: {
        height: '40px',
        padding: '0 12px',
        borderRadius: '6px',
        fontSize: vars.typography.fontSize['100'],
      },
      [ButtonSize.lg]: {
        height: '48px',
        padding: `0 ${vars.spacing.component.sm}`,
        borderRadius: '6px',
        fontSize: vars.typography.fontSize['200'],
      },
      [ButtonSize.xl]: {
        height: '64px',
        padding: `0 ${vars.spacing.component.md}`,
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
