import { type ComponentProps, type CSSProperties, type ForwardedRef, forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import type { FlexAlign, FlexDirection, FlexJustify, FlexWrap } from './constants';
import * as styles from './Flex.css';

type FlexBreakpoint = 'sm' | 'md' | 'lg';
type ResponsiveValue<T> = T | Partial<Record<FlexBreakpoint, T>>;
type ResponsiveStyleVariants<T extends string> = Record<FlexBreakpoint, Record<T, string>>;
type FlexStyle = CSSProperties & {
  '--side-flex-gap-sm'?: CSSProperties['gap'];
  '--side-flex-gap-md'?: CSSProperties['gap'];
  '--side-flex-gap-lg'?: CSSProperties['gap'];
};

export interface FlexProps extends ComponentProps<'div'> {
  direction?: ResponsiveValue<FlexDirection>;
  align?: ResponsiveValue<FlexAlign>;
  justify?: ResponsiveValue<FlexJustify>;
  wrap?: ResponsiveValue<FlexWrap>;
  basis?: CSSProperties['flexBasis'];
  grow?: CSSProperties['flexGrow'];
  shrink?: CSSProperties['flexShrink'];
  inline?: boolean;
  gap?: ResponsiveValue<CSSProperties['gap']>;
  asChild?: boolean;
}

const breakpoints: FlexBreakpoint[] = ['sm', 'md', 'lg'];

function isResponsiveValue<T>(value: ResponsiveValue<T> | undefined): value is Partial<Record<FlexBreakpoint, T>> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getResponsiveClassNames<T extends string>(
  value: ResponsiveValue<T> | undefined,
  defaultValue: T,
  variants: ResponsiveStyleVariants<T>,
) {
  if (!isResponsiveValue(value)) {
    return variants.sm[value ?? defaultValue];
  }

  return breakpoints.map((breakpoint) => {
    const breakpointValue = breakpoint === 'sm' ? (value.sm ?? defaultValue) : value[breakpoint];

    return breakpointValue ? variants[breakpoint][breakpointValue] : undefined;
  });
}

function getResponsiveGapStyle(gap: FlexProps['gap']) {
  if (!isResponsiveValue(gap)) {
    return {
      className: undefined,
      style: { gap },
    };
  }

  return {
    className: styles.responsiveGap,
    style: {
      '--side-flex-gap-sm': gap.sm,
      '--side-flex-gap-md': gap.md,
      '--side-flex-gap-lg': gap.lg,
    } satisfies FlexStyle,
  };
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
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Component = asChild ? Slot : 'div';
  const responsiveGap = getResponsiveGapStyle(gap);

  const classNames = cx(
    styles.base,
    getResponsiveClassNames(direction, 'row', styles.direction),
    getResponsiveClassNames(align, 'normal', styles.align),
    getResponsiveClassNames(justify, 'normal', styles.justify),
    getResponsiveClassNames(wrap, 'nowrap', styles.wrap),
    responsiveGap.className,
    inline ? styles.display['inline-flex'] : styles.display.flex,
    className,
  );

  const inlineStyles = {
    flexBasis: basis,
    flexGrow: grow,
    flexShrink: shrink,
    ...responsiveGap.style,
    ...style,
  };

  return (
    <Component ref={ref} className={classNames} style={inlineStyles} {...rest}>
      {children}
    </Component>
  );
});
