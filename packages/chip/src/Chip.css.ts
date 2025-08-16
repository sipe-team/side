import { color } from '@sipe-team/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const transparentColor = 'transparent';

export const disabled = style({
  opacity: 0.4,
  cursor: 'not-allowed',
  pointerEvents: 'none',
});

export const chip = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    border: '1px solid',
    outline: 'none',
    userSelect: 'none',
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.4,
    },
  },
  variants: {
    size: {
      small: {
        padding: '4px 12px',
        fontSize: '12px',
        lineHeight: '16px',
        height: '24px',
      },
      medium: {
        padding: '8px 16px',
        fontSize: '14px',
        lineHeight: '20px',
        height: '32px',
      },
      large: {
        padding: '12px 20px',
        fontSize: '16px',
        lineHeight: '24px',
        height: '40px',
      },
    },
    variant: {
      filled: {
        borderColor: transparentColor,
      },
      outline: {
        backgroundColor: transparentColor,
      },
    },
    color: {
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {},
    },
    state: {
      default: {},
      selected: {},
    },
  },
  compoundVariants: [
    // Primary color combinations
    {
      variants: {
        color: 'primary',
        variant: 'filled',
        state: 'default',
      },
      style: {
        backgroundColor: color.gray700,
        color: color.white,
        borderColor: color.gray700,
        ':hover': {
          backgroundColor: color.gray600,
          borderColor: color.gray600,
        },
        ':focus': {
          outlineColor: color.gray500,
        },
      },
    },
    {
      variants: {
        color: 'primary',
        variant: 'filled',
        state: 'selected',
      },
      style: {
        backgroundColor: color.cyan400,
        color: color.black,
        borderColor: color.cyan400,
        ':hover': {
          backgroundColor: color.cyan300,
          borderColor: color.cyan300,
        },
        ':focus': {
          outlineColor: color.cyan300,
        },
      },
    },
    {
      variants: {
        color: 'primary',
        variant: 'outline',
        state: 'default',
      },
      style: {
        backgroundColor: transparentColor,
        color: color.gray700,
        borderColor: color.gray400,
        ':hover': {
          backgroundColor: color.gray100,
          borderColor: color.gray500,
        },
        ':focus': {
          outlineColor: color.gray500,
        },
      },
    },
    {
      variants: {
        color: 'primary',
        variant: 'outline',
        state: 'selected',
      },
      style: {
        backgroundColor: transparentColor,
        color: color.cyan400,
        borderColor: color.cyan400,
        ':hover': {
          backgroundColor: color.cyan100,
          borderColor: color.cyan400,
        },
        ':focus': {
          outlineColor: color.cyan400,
        },
      },
    },
    // Secondary color combinations
    {
      variants: {
        color: 'secondary',
        variant: 'filled',
        state: 'default',
      },
      style: {
        backgroundColor: color.gray600,
        color: color.white,
        borderColor: color.gray600,
        ':hover': {
          backgroundColor: color.gray500,
          borderColor: color.gray500,
        },
      },
    },
    {
      variants: {
        color: 'secondary',
        variant: 'filled',
        state: 'selected',
      },
      style: {
        backgroundColor: color.purple400,
        color: color.white,
        borderColor: color.purple400,
        ':hover': {
          backgroundColor: color.purple300,
          borderColor: color.purple300,
        },
      },
    },
    // Success color combinations
    {
      variants: {
        color: 'success',
        variant: 'filled',
        state: 'default',
      },
      style: {
        backgroundColor: color.green500,
        color: color.white,
        borderColor: color.green500,
        ':hover': {
          backgroundColor: color.green400,
          borderColor: color.green400,
        },
      },
    },
    // Warning color combinations
    {
      variants: {
        color: 'warning',
        variant: 'filled',
        state: 'default',
      },
      style: {
        backgroundColor: color.orange500,
        color: color.white,
        borderColor: color.orange500,
        ':hover': {
          backgroundColor: color.orange400,
          borderColor: color.orange400,
        },
      },
    },
    // Danger color combinations
    {
      variants: {
        color: 'danger',
        variant: 'filled',
        state: 'default',
      },
      style: {
        backgroundColor: color.red500,
        color: color.white,
        borderColor: color.red500,
        ':hover': {
          backgroundColor: color.red400,
          borderColor: color.red400,
        },
      },
    },
    // Success outline combinations
    {
      variants: {
        color: 'success',
        variant: 'outline',
        state: 'default',
      },
      style: {
        backgroundColor: transparentColor,
        color: color.green500,
        borderColor: color.green500,
        ':hover': {
          backgroundColor: color.green100,
          borderColor: color.green600,
        },
        ':focus': {
          outlineColor: color.green500,
        },
      },
    },
    {
      variants: {
        color: 'success',
        variant: 'outline',
        state: 'selected',
      },
      style: {
        backgroundColor: color.green100,
        color: color.green600,
        borderColor: color.green500,
        ':hover': {
          backgroundColor: color.green200,
          borderColor: color.green600,
        },
        ':focus': {
          outlineColor: color.green500,
        },
      },
    },
    // Warning outline combinations
    {
      variants: {
        color: 'warning',
        variant: 'outline',
        state: 'default',
      },
      style: {
        backgroundColor: transparentColor,
        color: color.orange500,
        borderColor: color.orange500,
        ':hover': {
          backgroundColor: color.orange100,
          borderColor: color.orange600,
        },
        ':focus': {
          outlineColor: color.orange500,
        },
      },
    },
    {
      variants: {
        color: 'warning',
        variant: 'outline',
        state: 'selected',
      },
      style: {
        backgroundColor: color.orange100,
        color: color.orange600,
        borderColor: color.orange500,
        ':hover': {
          backgroundColor: color.orange200,
          borderColor: color.orange600,
        },
        ':focus': {
          outlineColor: color.orange500,
        },
      },
    },
    // Danger outline combinations
    {
      variants: {
        color: 'danger',
        variant: 'outline',
        state: 'default',
      },
      style: {
        backgroundColor: transparentColor,
        color: color.red500,
        borderColor: color.red500,
        ':hover': {
          backgroundColor: color.red100,
          borderColor: color.red600,
        },
        ':focus': {
          outlineColor: color.red500,
        },
      },
    },
    {
      variants: {
        color: 'danger',
        variant: 'outline',
        state: 'selected',
      },
      style: {
        backgroundColor: color.red100,
        color: color.red600,
        borderColor: color.red500,
        ':hover': {
          backgroundColor: color.red200,
          borderColor: color.red600,
        },
        ':focus': {
          outlineColor: color.red500,
        },
      },
    },
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'filled',
    size: 'medium',
    state: 'default',
  },
});
