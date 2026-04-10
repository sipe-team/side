export const RadioSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export type RadioSize = (typeof RadioSize)[keyof typeof RadioSize];

export const RADIO_SIZES = {
  [RadioSize.small]: {
    inputSize: '12px',
    fontSize: '14px',
    containerGap: '6px',
    containerPadding: '6px 0',
  },
  [RadioSize.medium]: {
    inputSize: '16px',
    fontSize: '16px',
    containerGap: '8px',
    containerPadding: '8px 0',
  },
  [RadioSize.large]: {
    inputSize: '20px',
    fontSize: '18px',
    containerGap: '10px',
    containerPadding: '10px 0',
  },
} as const;
