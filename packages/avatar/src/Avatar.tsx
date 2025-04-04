import { Slot } from '@radix-ui/react-slot';
import { clsx as cx } from 'clsx';
import { type ComponentProps, type ForwardedRef, forwardRef } from 'react';
import * as styles from './Avatar.css';
import type { AvatarShape, AvatarSize } from './Avatar.css';

export interface AvatarProps extends ComponentProps<'div'> {
  asChild?: boolean;
  src?: string;
  alt?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  fallback?: string;
}

export const Avatar = forwardRef(function Avatar(
  { asChild, className, src, alt, size = 'md', shape = 'circle', fallback, ...props }: AvatarProps,
  ref: ForwardedRef<any>,
) {
  const Component = asChild ? Slot : 'div';

  return (
    <Component className={cx(styles.root, styles.size[size], styles.shape[shape], className)} ref={ref} {...props}>
      {src ? (
        <img
          src={src}
          alt={alt}
          onError={(e) => {
            if (fallback) e.currentTarget.src = fallback;
          }}
          className={styles.image}
        />
      ) : (
        <span className={styles.fallback}>{alt || fallback}</span>
      )}
    </Component>
  );
});
