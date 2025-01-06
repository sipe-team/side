import { type CSSProperties, type ForwardedRef, forwardRef } from 'react';

export interface FlexProps {
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: CSSProperties['flexWrap'];
  direction?: CSSProperties['flexDirection'];
  basis?: CSSProperties['flexBasis'];
  grow?: CSSProperties['flexGrow'];
  shrink?: CSSProperties['flexShrink'];
  inline?: boolean;
  gap?: CSSProperties['gap'];
  className?: string;
  css?: CSSProperties;
  children?: React.ReactNode;
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
    css,
    children,
    ...rest
  }: FlexProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: inline ? 'inline-flex' : 'flex',
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        flexDirection: direction,
        flexBasis: basis,
        flexGrow: grow,
        flexShrink: shrink,
        gap,
        ...css,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});
