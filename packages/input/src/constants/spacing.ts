import { spacing } from '@sipe-team/tokens';

export const INPUT_SPACING = {
  padding: {
    small: {
      horizontal: spacing[3],
      vertical: spacing[1],
    },
    medium: {
      horizontal: spacing[4],
      vertical: spacing[2],
    },
    large: {
      horizontal: spacing[5],
      vertical: spacing[3],
    },
  },

  borderRadius: {
    default: spacing[2],
    action: spacing[1],
  },

  borderWidth: {
    default: 1,
    focus: 1,
    outline: 2,
  },

  action: {
    marginLeft: spacing[2],
    marginRight: 0,
  },

  outline: {
    offset: 0,
    focusOffset: 2,
  },

  gap: {
    small: spacing[1],
    medium: spacing[2],
    large: spacing[3],
  },
} as const;

export const getPaddingValue = (size: keyof typeof INPUT_SPACING.padding) => {
  const { horizontal, vertical } = INPUT_SPACING.padding[size];
  return `${vertical}px ${horizontal}px`;
};

export type InputSpacing = typeof INPUT_SPACING;
