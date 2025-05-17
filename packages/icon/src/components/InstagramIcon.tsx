import * as React from 'react';

import type { IconProps } from '../types';

export const InstagramIcon = React.forwardRef<SVGSVGElement, IconProps>(({ color, size = 24, ...props }, ref) => {
  return (
    <svg ref={ref} width={size} height={size} {...props} fill="none" viewBox="0 0 28 28">
      <title>InstagramIcon</title>
      <path
        fill={color || 'white'}
        d="M9.333 3.5A5.834 5.834 0 0 0 3.5 9.333v9.334A5.834 5.834 0 0 0 9.333 24.5h9.334a5.834 5.834 0 0 0 5.833-5.833V9.333A5.834 5.834 0 0 0 18.667 3.5zM21 5.833a1.167 1.167 0 1 1 0 2.335 1.167 1.167 0 0 1 0-2.335m-7 2.334a5.834 5.834 0 1 1-.001 11.667A5.834 5.834 0 0 1 14 8.167m0 2.333a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7"
      />
    </svg>
  );
});

InstagramIcon.displayName = 'InstagramIcon';
