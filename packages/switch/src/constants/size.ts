export type SwitchSize = keyof typeof switchSize;

export const switchSize = {
  sm: {
    width: 32,
    height: 16,
    trackPadding: 4,
  },
  md: {
    width: 40,
    height: 20,
    trackPadding: 4,
  },
  lg: {
    width: 48,
    height: 24,
    trackPadding: 4,
  },
} as const;
