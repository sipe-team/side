import { Slot } from '@radix-ui/react-slot';
import { clsx as cx } from 'clsx';
import { forwardRef, type ComponentProps, type ForwardedRef, type CSSProperties } from 'react';
import styles from './Avatar.module.css';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarShape = 'circle' | 'rounded' | 'square';

export interface AvatarProps extends ComponentProps<'div'> {
  asChild?: boolean;
  src?: string;
  alt?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  fallback?: string;
}

export const Avatar = forwardRef(function Avatar(
    {
      asChild,
      className,
      src,
      alt,
      size = 'md',
      shape = 'circle',
      fallback,
      ...props
    }: AvatarProps,
    ref: ForwardedRef<any>
) {
  const Component = asChild ? Slot : 'div';

  const style = {
    '--avatar-size': getAvatarSize(size),
    '--avatar-shape': getAvatarShape(shape),
  } as CSSProperties;

  return (
      <Component className={cx(styles.avatar, className)} ref={ref} style={style} {...props}>
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

function getAvatarSize(size: AvatarSize) {
  switch (size) {
    case 'xs':
      return '24px';
    case 'sm':
      return '32px';
    case 'md':
      return '40px';
    case 'lg':
      return '70px';
    case 'xl':
      return '96px';
    default:
      return '40px';
  }
}

function getAvatarShape(shape: AvatarShape) {
  switch (shape) {
    case 'rounded':
      return '4px';
    case 'square':
      return '0px';
    default:
      return '50%';
  }
}
