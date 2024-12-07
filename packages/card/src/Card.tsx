import { Slot } from '@radix-ui/react-slot';
import { color } from '@sipe-team/tokens';
import { clsx as cx } from 'clsx';
import {
  type CSSProperties,
  type ComponentProps,
  type ForwardedRef,
  forwardRef,
} from 'react';
import styles from './Card.module.css';

export type CardRatio = 'rectangle' | 'square' | 'wide' | 'portrait';
export type CardVariant = 'filled' | 'outline';

export interface CardProps extends ComponentProps<'div'> {
  ratio?: CardRatio;
  variant?: CardVariant;
  asChild?: boolean;
}

export const Card = forwardRef(function Card(
  {
    className,
    ratio = 'rectangle',
    style: _style,
    variant = 'filled',
    asChild,
    ...props
  }: CardProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const style = {
    '--padding': '20px',
    '--background-color': getBackgroundColor(variant),
    '--border':
      variant === 'outline'
        ? `1px solid ${color.cyan300}`
        : `1px solid ${color.gray200}`,
    '--aspect-ratio': getAspectRatio(ratio),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ..._style,
  } as CSSProperties;

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      className={cx(styles.card, className)}
      ref={ref}
      role="presentation"
      style={style}
      {...props}
    />
  );
});

function getBackgroundColor(variant: CardVariant) {
  switch (variant) {
    case 'outline':
      return color.gray50;
    case 'filled':
      return color.gray100;
    default:
      return color.gray100;
  }
}

function getAspectRatio(ratio: CardRatio) {
  switch (ratio) {
    case 'square':
      return '1 / 1';
    case 'rectangle':
      return '16 / 9';
    case 'wide':
      return '21 / 9';
    case 'portrait':
      return '3 / 4';
    default:
      return '16 / 9';
  }
}
