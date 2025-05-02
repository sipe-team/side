export const duration = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const easing = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export type Duration = keyof typeof duration;
export type Easing = keyof typeof easing;
