import * as React from 'react';

import type { IconProps } from '../types';

export const UserIcon = React.forwardRef<SVGSVGElement, IconProps>(({ color, size = 24, ...props }, ref) => {
  return (
    <svg ref={ref} width={size} height={size} {...props} fill="none" viewBox="0 0 32 32">
      <title>UserIcon</title>
      <g clipPath="url(#a)">
        <path
          fill={color || 'white'}
          d="M16 2.667C8.64 2.667 2.665 8.64 2.665 16s5.973 13.333 13.333 13.333S29.333 23.36 29.333 16 23.359 2.667 15.999 2.667m0 4c2.213 0 4 1.786 4 4s-1.787 4-4 4-4-1.787-4-4 1.786-4 4-4M16 25.6a9.6 9.6 0 0 1-8-4.293c.04-2.654 5.333-4.107 8-4.107 2.653 0 7.96 1.453 8 4.107a9.6 9.6 0 0 1-8 4.293"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill={color || 'white'} d="M0 0h32v32H0z" />
        </clipPath>
      </defs>
    </svg>
  );
});

UserIcon.displayName = 'UserIcon';
