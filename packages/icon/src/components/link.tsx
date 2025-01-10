import * as React from 'react';
import type { IconProps } from '../types';

export const LinkIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color, size = 24, ...props }, ref) => {
    return <svg ref={ref} width={size} height={size} {...props} fill="none" viewBox="0 0 24 25"><g clipPath="url(#a)"><path fill={color || "#CBD5E0"} d="M17 7.5h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c1.65 0 3 1.35 3 3s-1.35 3-3 3h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c2.76 0 5-2.24 5-5s-2.24-5-5-5m-9 5c0 .55.45 1 1 1h6c.55 0 1-.45 1-1s-.45-1-1-1H9c-.55 0-1 .45-1 1m2 3H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h3c.55 0 1-.45 1-1s-.45-1-1-1H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h3c.55 0 1-.45 1-1s-.45-1-1-1"/></g><defs><clipPath id="a"><path fill={color || "white"} d="M0 .5h24v24H0z"/></clipPath></defs></svg>;
  }
);

LinkIcon.displayName = 'LinkIcon';
