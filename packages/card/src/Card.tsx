import { Slot } from '@radix-ui/react-slot';
import { clsx as cx } from 'clsx';
import { type ComponentProps, type ForwardedRef, forwardRef } from 'react';
import { card, type CardVariant, type CardRatio } from './Card.css';

export interface CardProps extends ComponentProps<'div'> {
  asChild?: boolean;
  variant?: CardVariant;
  ratio?: CardRatio;
}

export const Card = forwardRef(function Card(
  { className, variant, ratio, asChild, ...props }: CardProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';

  return <Comp className={cx(card({ ratio, variant }), className)} ref={ref} role="presentation" {...props} />;
});
