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

type CardRatio = 'rectangle' | 'square' | 'wide' | 'portrait';
type CardVariant = 'filled' | 'outline' | 'weak';

export interface CardProps extends ComponentProps<'div'> {
  ratio?: CardRatio;
  variant?: CardVariant;
  asChild?: boolean;
}

export const Card = forwardRef(function Badge(
  {
    className,
    children,
    ratio = 'rectangle',
    style: _style,
    variant = 'filled',
    asChild,
    ...props
  }: CardProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const style = {
    ..._style,
    '--background-color': getBackgroundColor(variant),
    '--border': variant === 'outline' ? '1px solid #00FFFF' : undefined,
    '--aspect-ratio': getAspectRatio(ratio),
  } as CSSProperties;

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      className={cx(styles.root, className)}
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
      return 'transparent';
    default:
      return color.gray50;
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
      return '16 / 9'; // 기본값
  }
}
