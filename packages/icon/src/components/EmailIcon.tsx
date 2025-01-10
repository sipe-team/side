import * as React from 'react';
import type { IconProps } from '../types';

export const EmailIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color, size = 24, ...props }, ref) => {
    return <svg ref={ref} width={size} height={size} {...props} fill="none" viewBox="0 0 20 20"><g clipPath="url(#a)"><path fill={color || "white"} d="M16.666 3.333H3.333c-.917 0-1.659.75-1.659 1.667l-.008 10c0 .917.75 1.667 1.667 1.667h13.333c.917 0 1.667-.75 1.667-1.667V5c0-.917-.75-1.667-1.667-1.667m-.333 3.542-5.892 3.683a.84.84 0 0 1-.883 0L3.666 6.875a.708.708 0 1 1 .75-1.2l5.583 3.492 5.584-3.492a.708.708 0 1 1 .75 1.2"/></g><defs><clipPath id="a"><path fill={color || "white"} d="M0 0h20v20H0z"/></clipPath></defs></svg>;
  }
);

EmailIcon.displayName = 'EmailIcon';
