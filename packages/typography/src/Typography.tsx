import { Slot } from '@radix-ui/react-slot';
import type {
  fontSize as fontSizeToken,
  fontWeight as fontWeightToken,
  lineHeight as lineHeightToken,
} from '@sipe-team/tokens';
import cx from 'clsx';
import { type CSSProperties, type ComponentProps, type ElementType, type ForwardedRef, forwardRef } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import {
  base,
  lineHeightVariants,
  size as sizeVariants,
  weight as weightVariants,
  textColorVar,
} from './Typography.css';

export type FontSize = keyof typeof fontSizeToken;
export type FontWeight = keyof typeof fontWeightToken;
export type LineHeight = keyof typeof lineHeightToken;

export interface TypographyProps extends Omit<ComponentProps<'p'>, 'color'> {
  as?: ElementType;
  asChild?: boolean;
  lineHeight?: LineHeight;
  size?: FontSize;
  weight?: FontWeight;
  color?: string;
}

export const Typography = forwardRef(function Typography(
  {
    asChild,
    as,
    className,
    color,
    lineHeight = 'regular',
    size = 14,
    style: _style,
    weight = 'regular',
    ...props
  }: TypographyProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const Component = asChild ? Slot : as || 'p';
  const dynamicStyles = color ? assignInlineVars({ [textColorVar]: color }) : {};
  const style = {
    ..._style,
    ...dynamicStyles,
  } as CSSProperties;

  const typographyClassName = cx(base, sizeVariants[size], weightVariants[weight], lineHeightVariants[lineHeight]);
  const combinedClassName = cx(typographyClassName, className);

  return <Component ref={ref} className={combinedClassName} style={style} {...props} />;
});

Typography.displayName = 'Typography';
