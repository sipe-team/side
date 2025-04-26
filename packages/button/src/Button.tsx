import { Slot } from '@radix-ui/react-slot';
import { clsx as cx } from 'clsx';
import { type ComponentProps, type ReactNode, forwardRef } from 'react';
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
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    color = ButtonColor.primary,
    variant = ButtonVariant.filled,
    asChild,
    disabled,
    className: _className,
    children,
    ...rest
  },
  ref,
) {
  const Comp = asChild ? Slot : 'button';
  const className = cx(styles.button({ color, variant }), { [styles.disabled]: disabled }, _className);

  return (
    <Comp ref={ref} className={className} disabled={disabled} {...rest}>
      {children}
    </Comp>
  );
});
