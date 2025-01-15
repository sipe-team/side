import * as React from 'react';
import type { IconProps } from '../types';

export const LinkedinIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color, size = 24, ...props }, ref) => {
    return <svg ref={ref} width={size} height={size} {...props} fill="none" viewBox="0 0 28 28"><path fill={color || "white"} d="M22.167 3.5H5.833A2.333 2.333 0 0 0 3.5 5.833v16.334A2.333 2.333 0 0 0 5.833 24.5h16.334a2.333 2.333 0 0 0 2.333-2.333V5.833A2.333 2.333 0 0 0 22.167 3.5M9.027 19.833c-.812 0-1.472-.659-1.472-1.472v-5.223a1.474 1.474 0 0 1 2.945.001v5.223c0 .812-.66 1.471-1.472 1.471m-.05-9.663c-.9 0-1.501-.6-1.501-1.4s.6-1.4 1.6-1.4c.899 0 1.5.6 1.5 1.4s-.6 1.4-1.6 1.4m10.599 9.663a1.425 1.425 0 0 1-1.425-1.424v-3.04c0-1.234-.76-1.369-1.044-1.369s-1.234.04-1.234 1.37v3.039c0 .786-.639 1.424-1.425 1.424h-.095a1.425 1.425 0 0 1-1.424-1.424v-5.27a1.472 1.472 0 1 1 2.945 0s.329-1.472 2.564-1.472c1.422 0 2.562 1.14 2.562 3.703v3.039c0 .786-.638 1.424-1.424 1.424"/></svg>;
  }
);

LinkedinIcon.displayName = 'LinkedinIcon';
