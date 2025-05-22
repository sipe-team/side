import { color } from '@sipe-team/tokens';

export const INPUT_COLORS = {
  border: {
    default: color.gray300,
    focus: color.blue500,
    error: color.red500,
    disabled: color.gray300,
  },

  background: {
    default: color.white,
    filled: color.gray50,
    disabled: color.gray100,
    focus: color.white,
    focusFilled: color.white,
  },

  text: {
    default: color.gray900,
    disabled: color.gray500,
    placeholder: color.gray400,
  },

  outline: {
    focus: color.blue100,
  },

  action: {
    default: color.gray600,
    hover: color.gray100,
    focus: color.blue500,
    disabled: color.gray400,
  },
} as const;

export type InputColors = typeof INPUT_COLORS;
