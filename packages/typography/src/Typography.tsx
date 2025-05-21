import { Slot } from '@radix-ui/react-slot';
import type {
  fontSize as fontSizeToken,
  fontWeight as fontWeightToken,
  lineHeight as lineHeightToken,
} from '@sipe-team/tokens';
import cx from 'clsx';
import { type CSSProperties, type ComponentProps, type ElementType, type ForwardedRef, forwardRef } from 'react';
import { typography } from './Typography.css';

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
  ref: ForwardedRef<any>,
) {
  const Component = asChild ? Slot : as || 'p';
  const style = {
    ..._style,
    color,
  } as CSSProperties;

  const typographyClassName = typography({
    size,
    weight,
    lineHeight,
  });
  const combinedClassName = cx(typographyClassName, className);

  return <Component ref={ref} className={combinedClassName} style={style} {...props} />;
});

Typography.displayName = 'Typography';
