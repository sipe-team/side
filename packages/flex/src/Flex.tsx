import { Slot } from '@radix-ui/react-slot';
import { clsx as cx } from 'clsx';
import { type CSSProperties, type ComponentProps, type ForwardedRef, forwardRef } from 'react';
import * as styles from './Flex.css';

export interface FlexProps extends ComponentProps<'div'> {
  direction?: CSSProperties['flexDirection'];
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: CSSProperties['flexWrap'];
  basis?: CSSProperties['flexBasis'];
  grow?: CSSProperties['flexGrow'];
  shrink?: CSSProperties['flexShrink'];
  inline?: boolean;
  gap?: CSSProperties['gap'];
  asChild?: boolean;
}

export const Flex = forwardRef(function Flex(
  {
    align,
    justify,
    wrap,
    direction,
    basis,
    grow,
    shrink,
    inline,
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

  const flexStyle = {
    display: inline ? 'inline-flex' : 'flex',
    flexDirection: direction ?? 'row',
    alignItems: align ?? 'normal',
    justifyContent: justify ?? 'normal',
    flexWrap: wrap ?? 'nowrap',
    flexBasis: basis,
    flexGrow: grow,
    flexShrink: shrink,
    gap,
    ...style,
  } as React.CSSProperties;

  return (
    <Component ref={ref} className={cx(styles.flex, className)} style={flexStyle} {...rest}>
      {children}
    </Component>
  );
});
