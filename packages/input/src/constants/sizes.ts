import { fontSize } from '@sipe-team/tokens';

export const INPUT_SIZES = {
  small: {
    height: '32px',
    fontSize: fontSize[14],
    actionSize: '20px',
    iconSize: '14px',
  },
  medium: {
    height: '40px',
    fontSize: fontSize[16],
    actionSize: '24px',
    iconSize: '16px',
  },
  large: {
    height: '48px',
    fontSize: fontSize[18],
    actionSize: '28px',
    iconSize: '18px',
  },
} as const;

export type InputSizeValue = keyof typeof INPUT_SIZES;

export type InputSizeConfig = (typeof INPUT_SIZES)[InputSizeValue];
