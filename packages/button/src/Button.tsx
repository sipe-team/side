import { type ComponentProps, type ForwardedRef, forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './Button.css';

export const ButtonVariant = {
  filled: 'filled',
  outline: 'outline',
  ghost: 'ghost',
} as const;
export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

export const ButtonSize = {
  sm: 'sm',
  lg: 'lg',
} as const;
export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

export const Button = forwardRef(function Button(
  {
    variant = ButtonVariant.filled,
    size = ButtonSize.lg,
    asChild,
    disabled,
    className: _className,
    ...props
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const Comp = asChild ? Slot : 'button';
  const className = cx(styles.button({ variant, size }), { [styles.disabled]: disabled }, _className);

  return <Comp ref={ref} className={className} disabled={disabled} {...props} />;
});
