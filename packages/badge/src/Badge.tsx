import { type ComponentProps, type ForwardedRef, forwardRef } from 'react';

import { Typography } from '@sipe-team/typography';

import { clsx as cx } from 'clsx';

import * as styles from './Badge.css';

export type BadgeSize = keyof typeof styles.BadgeSize;
export type BadgeVariant = keyof typeof styles.BadgeVariant;

export interface BadgeProps extends ComponentProps<'div'> {
  size?: BadgeSize;
  variant?: BadgeVariant;
}

export const Badge = forwardRef(function Badge(
  { className, children, size = 'medium', variant = 'filled', ...props }: BadgeProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      className={cx(styles.root, styles.size[size], styles.variant[variant], className)}
      ref={ref}
      role="status"
      {...props}
    >
      <Typography asChild={true} className={styles.text} size={getTypographySize(size)} weight="semiBold">
        <span>{children}</span>
      </Typography>
    </div>
  );
});

function getTypographySize(size: BadgeSize): 12 | 14 | 18 {
  switch (size) {
    case 'small':
      return 12;
    case 'large':
      return 18;
    default:
      return 14;
  }
}
