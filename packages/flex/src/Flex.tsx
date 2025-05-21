import { Slot } from '@radix-ui/react-slot';
import { clsx as cx } from 'clsx';
import { type CSSProperties, type ComponentProps, type ForwardedRef, forwardRef } from 'react';
import * as styles from './Flex.css';

export interface FlexProps extends ComponentProps<'div'> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' | 'normal';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'normal';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
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
    direction && styles.direction[direction],
    align && styles.align[align],
    justify && styles.justify[justify],
    wrap && styles.wrap[wrap],
    inline && styles.display['inline-flex'],
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
