import { Typography } from '@sipe-team/typography';
import { clsx as cx } from 'clsx';
import {
  type CSSProperties,
  type ComponentProps,
  type ForwardedRef,
  forwardRef,
} from 'react';
import styles from './Badge.module.css';

type BadgeSize = 'small' | 'medium' | 'large';

type BadgeVariant = 'filled' | 'outline' | 'weak';

export interface BadgeProps extends ComponentProps<'div'> {
  size?: BadgeSize;
  variant?: BadgeVariant;
}

export const Badge = forwardRef(function Badge(
  {
    className,
    children,
    size = 'medium',
    style: _style,
    variant = 'filled',
    ...props
  }: BadgeProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const backgroundColor = getBackgroundColor(variant);
  const border = variant === 'outline' ? '2px solid #2D3748' : undefined;
  const padding = getPadding(size);
  const style = {
    ..._style,
    '--background-color': backgroundColor,
    '--border': border,
    '--padding': padding,
  } as CSSProperties;

  const fontSize = getFontSize(size);

  return (
    <div
      className={cx(styles.root, className)}
      ref={ref}
      role="status"
      style={style}
      {...props}
    >
      <Typography
        asChild={true}
        color="#00FFFF"
        size={fontSize}
        weight="semiBold"
      >
        <span>{children}</span>
      </Typography>
    </div>
  );
});

function getBackgroundColor(variant: BadgeVariant) {
  switch (variant) {
    case 'weak':
      return '#EDF2F7';
    case 'outline':
      return 'transparent';
    default:
      return '#2D3748';
  }
}

function getPadding(size: BadgeSize) {
  switch (size) {
    case 'small':
      return '4px 8px';
    case 'large':
      return '12px 24px';
    default:
      return '8px 16px';
  }
}

function getFontSize(size: BadgeSize) {
  switch (size) {
    case 'small':
      return 12;
    case 'large':
      return 18;
    default:
      return 14;
  }
}
