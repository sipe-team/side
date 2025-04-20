import { Slot } from '@radix-ui/react-slot';
import { clsx as cx } from 'clsx';
import { type ComponentProps, type ForwardedRef, forwardRef } from 'react';
import * as styles from './Card.css';

export type CardRatio = keyof typeof styles.CardRatio;
export type CardVariant = keyof typeof styles.CardVariant;

export interface CardProps extends ComponentProps<'div'> {
  ratio?: CardRatio;
  variant?: CardVariant;
  asChild?: boolean;
}

export const Card = forwardRef(function Card(
  { className, ratio = 'rectangle', variant = 'filled', asChild, ...props }: CardProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      className={cx(styles.root, styles.variant[variant], styles.ratio[ratio], className)}
      ref={ref}
      role="presentation"
      {...props}
    />
  );
});
