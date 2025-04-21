import { Slot } from '@radix-ui/react-slot';
import { clsx as cx } from 'clsx';
import { type ComponentProps, type ForwardedRef, forwardRef } from 'react';
import { card } from './Card.css';
import type { CardVariants } from './Card.css';

export type CardProps = CardVariants &
  ComponentProps<'div'> & {
    asChild?: boolean;
  };

export const Card = forwardRef(function Card(
  { className, ratio = 'rectangle', variant = 'filled', asChild, ...props }: CardProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';

  return <Comp className={cx(card({ ratio, variant }), className)} ref={ref} role="presentation" {...props} />;
});
