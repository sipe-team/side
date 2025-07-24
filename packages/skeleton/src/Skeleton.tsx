import { type ComponentProps, type CSSProperties, type ForwardedRef, forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import { type SkeletonVariant, shimmerEffect, skeleton } from './Skeleton.css';

interface SkeletonProps extends ComponentProps<'div'> {
  asChild?: boolean;
  loading: boolean;
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  pulse?: boolean;
  shimmer?: boolean;
  lines?: number;
}

export const Skeleton = forwardRef(function Skeleton(
  {
    asChild,
    loading,
    children,
    variant = 'rectangular',
    width,
    height,
    pulse = true,
    shimmer = false,
    lines = 1,
    className,
    style,
    ...props
  }: SkeletonProps,
  ref: ForwardedRef<any>,
) {
  if (!loading) return children;

  const Component = asChild ? Slot : 'div';

  const skeletonStyle: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div
        ref={ref}
        className={cx(className)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5em',
          width: typeof width === 'number' ? `${width}px` : width,
          ...style,
        }}
        {...props}
      >
        {Array.from({ length: lines }, (_, index) => {
          const isLast = index === lines - 1;
          const lineKey = `skeleton-line-${index}-${isLast ? 'last' : 'regular'}`;

          return (
            <div
              key={lineKey}
              className={cx(skeleton({ variant, loading, pulse }), shimmer && shimmerEffect)}
              style={{
                width: isLast ? '75%' : '100%',
                height: '1em',
              }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <Component
      ref={ref}
      className={cx(skeleton({ variant, loading, pulse }), shimmer && shimmerEffect, className)}
      style={{
        ...skeletonStyle,
        ...(variant === 'text' && !height && { height: '1em' }),
      }}
      aria-busy={loading}
      aria-label={loading ? 'Loading content' : undefined}
      {...props}
    >
      {asChild && children}
    </Component>
  );
});

Skeleton.displayName = 'Skeleton';
