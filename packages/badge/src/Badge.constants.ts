export const BadgeSize = {
  small: 'small',
  large: 'large',
} as const;

export const BadgeVariant = {
  solid: 'solid',
  default: 'default',
} as const;

export const BadgeColor = {
  white: 'white',
  gray: 'gray',
  danger: 'danger',
  general: 'general',
  '1st': '1st',
  '2nd': '2nd',
  '3rd': '3rd',
  '4th': '4th',
} as const;

export const BadgeIconPosition = {
  none: 'none',
  left: 'left',
  right: 'right',
  both: 'both',
} as const;

export type BadgeSize = (typeof BadgeSize)[keyof typeof BadgeSize];
export type BadgeVariant = (typeof BadgeVariant)[keyof typeof BadgeVariant];
export type BadgeColor = (typeof BadgeColor)[keyof typeof BadgeColor];
export type BadgeIconPosition = (typeof BadgeIconPosition)[keyof typeof BadgeIconPosition];

import type React from 'react';

export interface BadgeProps extends React.ComponentPropsWithoutRef<'div'> {
  size?: BadgeSize;
  variant?: BadgeVariant;
  color?: BadgeColor;
  asChild?: boolean;
  icon?: BadgeIconPosition;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
