import { Slot } from '@radix-ui/react-slot';
import { clsx as cx } from 'clsx';
import { type CSSProperties, type ComponentProps, type ForwardedRef, forwardRef } from 'react';
import * as styles from './Flex.css';
import type { FlexDirection, FlexAlign, FlexJustify, FlexWrap } from './constants';

export interface FlexProps extends ComponentProps<'div'> {
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: FlexWrap;
  basis?: CSSProperties['flexBasis'];
  grow?: CSSProperties['flexGrow'];
  shrink?: CSSProperties['flexShrink'];
  inline?: boolean;
  gap?: CSSProperties['gap'];
  asChild?: boolean;
}

export const Flex = forwardRef(function Flex(
  {
    direction = 'row',
    align = 'normal',
    justify = 'normal',
    wrap = 'nowrap',
    basis,
    grow,
    shrink,
    inline = false,
    gap,
    className,
    style,
    children,
    asChild,
    ...rest
  }: FlexProps,
  ref: ForwardedRef<any>,
) {
  const Component = asChild ? Slot : 'div';

  const classNames = cx(
    styles.base,
    styles.direction[direction],
    styles.align[align],
    styles.justify[justify],
    styles.wrap[wrap],
    inline ? styles.display['inline-flex'] : styles.display.flex,
    className,
  );

  const inlineStyles = {
    flexBasis: basis,
    flexGrow: grow,
    flexShrink: shrink,
    gap,
    ...style,
  };

  return (
    <Component ref={ref} className={classNames} style={inlineStyles} {...rest}>
      {children}
    </Component>
  );
});
