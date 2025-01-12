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

export type CardRatio = 'rectangle' | 'square' | 'wide' | 'portrait' | 'custom';
export type CardVariant = 'filled' | 'outline';

export interface CardProps extends ComponentProps<'div'> {
  ratio?: CardRatio;
  variant?: CardVariant;
  asChild?: boolean;
}

export const Card = forwardRef(function Card(
  {
    className,
    ratio = 'custom',
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

const backgroundColors: Record<CardVariant, string> = {
  outline: color.gray50,
  filled: color.gray100,
};

function getBackgroundColor(variant: CardVariant) {
  return backgroundColors[variant] ?? color.gray100;
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
    case 'custom':
      return 'auto';
    default:
      return 'auto';
  }
}
