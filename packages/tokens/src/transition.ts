import { duration, easing } from './animation';

export const transition = {
  default: `${duration.normal}ms ${easing.easeInOut}`,
  fast: `${duration.fast}ms ${easing.easeInOut}`,
  slow: `${duration.slow}ms ${easing.easeInOut}`,
  bounce: `${duration.normal}ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
} as const;

export type Transition = keyof typeof transition;
