import { Slot } from '@radix-ui/react-slot';
import {
  type CSSProperties,
  type ComponentProps,
  type ForwardedRef,
  forwardRef,
} from 'react';
import styles from './Typography.module.css';

export type FontSize = 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32 | 36 | 48;

export type FontWeight = 'regular' | 'medium' | 'semiBold' | 'bold';

export type LineHeight = 'regular' | 'compact';

export interface TypographyProps extends ComponentProps<'p'> {
  asChild?: boolean;
  lineHeight?: LineHeight;
  size?: FontSize;
  weight?: FontWeight;
}

export const Typography = forwardRef(function Typography(
  {
    asChild,
    lineHeight = 'regular',
    size = 14,
    weight = 'regular',
    ...props
  }: TypographyProps,
  ref: ForwardedRef<any>,
) {
  const Component = asChild ? Slot : 'p';
  const numericLineHeight = getNumericLineHeight(lineHeight);
  const numericWeight = getNumericWeight(weight);
  const style = {
    '--font-size': `${size}px`,
    '--font-weight': numericWeight,
    '--line-height': numericLineHeight,
  } as CSSProperties;

  return (
    <Component
      className={styles.typography}
      ref={ref}
      style={style}
      {...props}
    />
  );
});

function getNumericLineHeight(lineHeight: LineHeight) {
  const lineHeightMap = {
    regular: 1.5,
    compact: 1.3,
  };

  return lineHeightMap[lineHeight];
}

function getNumericWeight(weight: FontWeight) {
  const weightMap = {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  };

  return weightMap[weight];
}
