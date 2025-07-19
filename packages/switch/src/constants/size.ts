export const SwitchSize = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const;

export type SwitchSize = (typeof SwitchSize)[keyof typeof SwitchSize];

export const SWITCH_SIZES = {
  [SwitchSize.sm]: {
    width: 32,
    height: 16,
    thumbSize: 16,
    gap: 2,
  },
  [SwitchSize.md]: {
    width: 40,
    height: 20,
    thumbSize: 20,
    gap: 4,
  },
  [SwitchSize.lg]: {
    width: 48,
    height: 24,
    thumbSize: 24,
    gap: 4,
  },
} as const;
