import { Slot } from '@radix-ui/react-slot';
import {
  type CSSProperties,
  type ComponentProps,
  type ForwardedRef,
  forwardRef,
} from 'react';
import styles from './Skeleton.module.css';

const DEFAUT_SIZE = {
  WIDTH: 100,
  HEIGHT: 20,
  RADIUS: 4,
} as const;

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
  ref: ForwardedRef<any>,
) {
  if (!loading) return children;

  const Component = asChild ? Slot : 'div';

  const style = {
    '--width': props.width ? `${props.width}px` : `${DEFAUT_SIZE.WIDTH}px`,
    '--height': props.height ? `${props.height}px` : `${DEFAUT_SIZE.HEIGHT}px`,
    borderRadius:
      props.variant === 'circle' ? '50%' : `${DEFAUT_SIZE.RADIUS}px`,
  } as CSSProperties;

  return (
    <Component ref={ref} {...props} style={style} className={styles.skeleton}>
      {children}
    </Component>
  );
});
Skeleton.displayName = 'Skeleton';
