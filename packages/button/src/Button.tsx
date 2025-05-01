import { Slot } from '@radix-ui/react-slot';
import { clsx as cx } from 'clsx';
import { type ComponentProps, type ForwardedRef, forwardRef } from 'react';
import * as styles from './Button.css';

export const ButtonColor = {
  primary: 'primary',
  black: 'black',
  white: 'white',
} as const;
export type ButtonColor = (typeof ButtonColor)[keyof typeof ButtonColor];

export const ButtonVariant = {
  filled: 'filled',
  outline: 'outline',
  weak: 'weak',
} as const;
export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

export interface ButtonProps extends ComponentProps<'button'> {
  color?: ButtonColor;
  variant?: ButtonVariant;
  asChild?: boolean;
}

export const Button = forwardRef(function Button(
  {
    color = ButtonColor.primary,
    variant = ButtonVariant.filled,
    asChild,
    disabled,
    className: _className,
    ...props
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const Comp = asChild ? Slot : 'button';
  const className = cx(styles.button({ color, variant }), { [styles.disabled]: disabled }, _className);

  return <Comp ref={ref} className={className} disabled={disabled} {...props} />;
});
