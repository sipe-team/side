import { type ComponentProps, type ForwardedRef, forwardRef, type ReactNode } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './Button.css';

export const ButtonVariant = {
  fill: 'fill',
  outline: 'outline',
  ghost: 'ghost',
} as const;
export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

export const ButtonSize = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
} as const;
export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
}

export const Button = forwardRef(function Button(
  {
    variant = ButtonVariant.fill,
    size = ButtonSize.lg,
    type = 'button',
    leftIcon,
    rightIcon,
    asChild,
    disabled,
    className: _className,
    children,
    ...props
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const Comp = asChild ? Slot : 'button';
  const hasIcon = !!(leftIcon || rightIcon);
  const className = cx(styles.button({ variant, size }), hasIcon && styles.iconLayout, _className);

  return (
    <Comp ref={ref} type={type} className={className} disabled={disabled} {...props}>
      {leftIcon && <span className={styles.iconWrapper}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={styles.iconWrapper}>{rightIcon}</span>}
    </Comp>
  );
});
