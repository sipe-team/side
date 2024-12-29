import { fontSize, color as sipeColor } from '@sipe-team/tokens';
import { Typography } from '@sipe-team/typography';
import { type ComponentProps, type ForwardedRef, forwardRef } from 'react';
import styles from './Alert.module.css';

export const Root = forwardRef(function Root(
  props: ComponentProps<'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return <div role="alert" className={styles.root} ref={ref} {...props} />;
});

export const Icon = forwardRef(function Icon(
  { children, src, ...props }: ComponentProps<'img'>,
  ref: ForwardedRef<HTMLImageElement>,
) {
  if (src != null) {
    return <img ref={ref} {...props} />;
  }

  return children;
});

export const Text = forwardRef(function Text(
  {
    color = sipeColor.white,
    size = fontSize[14],
    weight = 'bold',
    ...props
  }: ComponentProps<typeof Typography>,
  ref: ForwardedRef<any>,
) {
  return (
    <Typography
      color={color}
      size={size}
      weight={weight}
      ref={ref}
      {...props}
    />
  );
});
