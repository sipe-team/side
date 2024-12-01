import { Slot } from '@radix-ui/react-slot';
import {
  fontSize as fontSizeToken,
  fontWeight as fontWeightToken,
  lineHeight as lineHeightToken,
} from '@sipe-team/tokens';
import { clsx as cx } from 'clsx';
import {
  type CSSProperties,
  type ComponentProps,
  type ForwardedRef,
  forwardRef,
} from 'react';
import styles from './Typography.module.css';

export type FontSize = keyof typeof fontSizeToken;

export type FontWeight = keyof typeof fontWeightToken;

export type LineHeight = keyof typeof lineHeightToken;

export interface TypographyProps extends ComponentProps<'p'> {
  asChild?: boolean;
  lineHeight?: LineHeight;
  size?: FontSize;
  weight?: FontWeight;
}

export const Typography = forwardRef(function Typography(
  {
    asChild,
    className,
    color,
    lineHeight = 'regular',
    size = 14,
    style: _style,
    weight = 'regular',
    ...props
  }: TypographyProps,
  ref: ForwardedRef<any>,
) {
  const Component = asChild ? Slot : 'p';
  const style = {
    ..._style,
    '--font-color': color,
    '--font-size': `${fontSizeToken[size]}px`,
    '--font-weight': fontWeightToken[weight],
    '--line-height': lineHeightToken[lineHeight],
  } as CSSProperties;

  return (
    <Component
      className={cx(styles.typography, className)}
      ref={ref}
      style={style}
      {...props}
    />
  );
});
