import * as React from 'react';

import type { IconProps } from '../types';

export const AccordionArrowIcon = React.forwardRef<SVGSVGElement, IconProps>(({ color, size = 24, ...props }, ref) => {
  return (
    <svg ref={ref} width={size} height={size} {...props} fill="none" viewBox="0 0 48 48">
      <path
        fill={color || 'white'}
        d="M16.24 29.42 24 21.66l7.76 7.76c.78.78 2.04.78 2.82 0s.78-2.04 0-2.82l-9.18-9.18c-.78-.78-2.04-.78-2.82 0L13.4 26.6c-.78.78-.78 2.04 0 2.82.78.76 2.06.78 2.84 0"
      />
    </svg>
  );
});

AccordionArrowIcon.displayName = 'AccordionArrowIcon';
