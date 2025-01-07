import * as React from 'react';
import type { IconProps } from '../types';

export const CheckCircleIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color, size = 24, ...props }, ref) => {
    return <svg ref={ref} width={size} height={size} {...props} fill="none" viewBox="0 0 24 24"><g clipPath="url(#a)"><path fill={color || "#00ffff"} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2M9.29 16.29 5.7 12.7a.996.996 0 1 1 1.41-1.41L10 14.17l6.88-6.88a.996.996 0 1 1 1.41 1.41l-7.59 7.59a.996.996 0 0 1-1.41 0"/></g><defs><clipPath id="a"><path fill={color || "white"} d="M0 0h24v24H0z"/></clipPath></defs></svg>;
  }
);

CheckCircleIcon.displayName = 'CheckCircleIcon';
