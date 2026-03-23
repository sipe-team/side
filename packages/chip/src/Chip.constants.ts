export const ChipVariant = {
  filled: 'filled',
  outline: 'outline',
} as const;
export type ChipVariant = (typeof ChipVariant)[keyof typeof ChipVariant];

export const ChipSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;
export type ChipSize = (typeof ChipSize)[keyof typeof ChipSize];

export const ChipColor = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
} as const;
export type ChipColor = (typeof ChipColor)[keyof typeof ChipColor];
