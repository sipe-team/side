import React from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx } from 'clsx';

import type { BadgeProps } from './Badge.constants';
import { BadgeColor, BadgeSize, BadgeVariant } from './Badge.constants';
import { badge } from './Badge.css';

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      asChild,
      children,
      className,
      size = BadgeSize.small,
      variant = BadgeVariant.default,
      color = BadgeColor.gray,
      icon = 'none',
      leftIcon,
      rightIcon,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div';

    const renderIcon = (iconNode: React.ReactNode) => {
      if (!iconNode) return null;

      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '12px',
            height: '12px',
          }}
        >
          {iconNode}
        </span>
      );
    };

    return (
      <Comp ref={ref} className={clsx(badge({ size, variant, color }), className)} {...props}>
        {icon === 'left' && leftIcon && renderIcon(leftIcon)}
        {icon === 'both' && leftIcon && renderIcon(leftIcon)}
        {children}
        {icon === 'right' && rightIcon && renderIcon(rightIcon)}
        {icon === 'both' && rightIcon && renderIcon(rightIcon)}
      </Comp>
    );
  },
);

Badge.displayName = 'Badge';
