import { color } from '@sipe-team/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { ChipColor, ChipSize, ChipState, ChipVariant } from './Chip.constants';

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
      [ChipSize.small]: {
        padding: '4px 12px',
        fontSize: '12px',
        lineHeight: '16px',
        height: '24px',
      },
      [ChipSize.medium]: {
        padding: '8px 16px',
        fontSize: '14px',
        lineHeight: '20px',
        height: '32px',
      },
      [ChipSize.large]: {
        padding: '12px 20px',
        fontSize: '16px',
        lineHeight: '24px',
        height: '40px',
      },
    },
    variant: {
      [ChipVariant.filled]: {
        borderColor: transparentColor,
      },
      [ChipVariant.outline]: {
        backgroundColor: transparentColor,
      },
    },
    color: {
      [ChipColor.primary]: {},
      [ChipColor.secondary]: {},
      [ChipColor.success]: {},
      [ChipColor.warning]: {},
      [ChipColor.danger]: {},
    },
    state: {
      [ChipState.default]: {},
      [ChipState.selected]: {},
    },
  },
  compoundVariants: [
    // Primary color combinations
    {
      variants: {
        color: ChipColor.primary,
        variant: ChipVariant.filled,
        state: ChipState.default,
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
        color: ChipColor.primary,
        variant: ChipVariant.filled,
        state: ChipState.selected,
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
        color: ChipColor.primary,
        variant: ChipVariant.outline,
        state: ChipState.default,
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
        color: ChipColor.primary,
        variant: ChipVariant.outline,
        state: ChipState.selected,
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
        color: ChipColor.secondary,
        variant: ChipVariant.filled,
        state: ChipState.default,
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
        color: ChipColor.secondary,
        variant: ChipVariant.filled,
        state: ChipState.selected,
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
        color: ChipColor.success,
        variant: ChipVariant.filled,
        state: ChipState.default,
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
        color: ChipColor.warning,
        variant: ChipVariant.filled,
        state: ChipState.default,
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
        color: ChipColor.danger,
        variant: ChipVariant.filled,
        state: ChipState.default,
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
  ],
  defaultVariants: {
    color: ChipColor.primary,
    variant: ChipVariant.filled,
    size: ChipSize.medium,
    state: ChipState.default,
  },
});
