import { type ComponentProps, type CSSProperties, type ForwardedRef, forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';

import styles from './Skeleton.module.css';

type Variant = 'circle' | 'rectangular';

interface SkeletonProps extends ComponentProps<'div'> {
  asChild?: boolean;
  loading: boolean;
  variant?: Variant;
  width?: number;
  height?: number;
}
export const Skeleton = forwardRef(function Skeleton(
  { asChild, loading, children, ...props }: SkeletonProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  if (!loading) return children;

  const Component = asChild ? Slot : 'div';

  const style = {
    '--width': props.width ? `${props.width}px` : 'auto',
    '--height': props.height ? `${props.height}px` : 'auto',
    borderRadius: props.variant === 'circle' ? '50%' : '4px',
  } as CSSProperties;

  return (
    <Component ref={ref} {...props} style={style} className={styles.skeleton}>
      {children}
    </Component>
  );
});
Skeleton.displayName = 'Skeleton';
