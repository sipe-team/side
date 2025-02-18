import { Slot } from '@radix-ui/react-slot';
import { clsx as cx } from 'clsx';
import { type CSSProperties, type ComponentProps, type ForwardedRef, forwardRef } from 'react';
import styles from './Flex.module.css';

export interface FlexProps extends ComponentProps<'div'> {
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: CSSProperties['flexWrap'];
  direction?: CSSProperties['flexDirection'];
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
    '--flex-display': inline ? 'inline-flex' : 'flex',
    '--flex-direction': direction ?? 'row',
    '--flex-align': align ?? 'normal',
    '--flex-justify': justify ?? 'normal',
    '--flex-wrap': wrap ?? 'nowrap',
    '--flex-gap': gap,
    '--flex-basis': basis,
    '--flex-grow': grow,
    '--flex-shrink': shrink,
    ...style,
  } as React.CSSProperties;

  return (
    <Component ref={ref} className={cx(styles.flex, className)} style={flexStyle} {...rest}>
      {children}
    </Component>
  );
});
