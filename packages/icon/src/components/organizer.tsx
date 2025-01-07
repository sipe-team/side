import * as React from 'react';
import type { IconProps } from '../types';

export const OrganizerIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color, size = 24, ...props }, ref) => {
    return <svg ref={ref} width={size} height={size} {...props} fill="none" viewBox="0 0 16 14"><path fill={color || "#00ffff"} d="m15.334 7-1.627-1.86.227-2.46-2.407-.547L10.267 0 8 .973 5.734 0l-1.26 2.127-2.407.54.227 2.466L.667 7l1.627 1.86-.227 2.467 2.407.546L5.734 14 8 13.02l2.267.973 1.26-2.126 2.407-.547-.227-2.46zm-9.08 2.673-1.587-1.6a.664.664 0 0 1 0-.94l.047-.046c.26-.26.686-.26.946 0l1.074 1.08 3.433-3.44c.26-.26.687-.26.947 0l.046.046c.26.26.26.68 0 .94l-3.946 3.96a.69.69 0 0 1-.96 0"/></svg>;
  }
);

OrganizerIcon.displayName = 'OrganizerIcon';
