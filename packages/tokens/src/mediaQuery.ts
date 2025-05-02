import { breakpoints } from './breakpoints';
import type { Breakpoint } from './breakpoints';

export const mediaQuery = {
  up: (breakpoint: Breakpoint) => `@media (min-width: ${breakpoints[breakpoint]}px)`,
  down: (breakpoint: Breakpoint) => {
    // Special case for 'mobile' as it starts at 0
    if (breakpoint === 'mobile') {
      return '@media';
    }

    const breakpointValues = Object.entries(breakpoints) as [Breakpoint, number][];
    const breakpointIndex = breakpointValues.findIndex(([key]) => key === breakpoint);

    if (breakpointIndex <= 0) {
      return '@media';
    }

    const previousBreakpoint = breakpointValues[breakpointIndex - 1]?.[1] ?? 0;
    return `@media (max-width: ${previousBreakpoint - 0.1}px)`;
  },
  between: (minBreakpoint: Breakpoint, maxBreakpoint: Breakpoint) => {
    return `@media (min-width: ${breakpoints[minBreakpoint]}px) and (max-width: ${breakpoints[maxBreakpoint] - 0.1}px)`;
  },
  only: (breakpoint: Breakpoint) => {
    const breakpointValues = Object.entries(breakpoints) as [Breakpoint, number][];
    const breakpointIndex = breakpointValues.findIndex(([key]) => key === breakpoint);

    if (breakpointIndex === breakpointValues.length - 1) {
      return mediaQuery.up(breakpoint);
    }

    const nextBreakpoint = breakpointValues[breakpointIndex + 1]?.[0] as Breakpoint;
    if (!nextBreakpoint) return mediaQuery.up(breakpoint);

    return mediaQuery.between(breakpoint, nextBreakpoint);
  },
} as const;
