import * as React from 'react';
import type { IconProps } from '../types';

export const YoutubeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color, size = 24, ...props }, ref) => {
    return <svg ref={ref} width={size} height={size} {...props} fill="none" viewBox="0 0 28 28"><path fill={color || "white"} d="M25.179 7.217a2.92 2.92 0 0 0-2.063-2.063C21.296 4.667 14 4.667 14 4.667s-7.297 0-9.117.487a2.92 2.92 0 0 0-2.062 2.063C2.333 9.037 2.333 14 2.333 14s0 4.963.488 6.783a2.92 2.92 0 0 0 2.062 2.063c1.82.487 9.117.487 9.117.487s7.296 0 9.116-.487a2.92 2.92 0 0 0 2.063-2.063c.487-1.82.487-6.783.487-6.783s0-4.963-.487-6.783m-13.513 9.814V10.97c0-.45.487-.73.875-.505l5.25 3.03a.584.584 0 0 1 0 1.011l-5.25 3.031a.583.583 0 0 1-.875-.505"/></svg>;
  }
);

YoutubeIcon.displayName = 'YoutubeIcon';
