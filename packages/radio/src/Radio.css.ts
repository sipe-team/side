import { style, styleVariants } from '@vanilla-extract/css';
import { type RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { COLORS } from './constants/colors';
import { RadioSize } from './constants/sizes';
import { RADIO_SIZES } from './constants/sizes';

export const radioGroup = style({
  display: 'flex',
  flexDirection: 'column',
  border: 'none',
  padding: 0,
  margin: 0,
});

export const radioGroupLegend = style({
  padding: 0,
  margin: 0,
  marginBottom: '8px',
  fontSize: '16px',
  fontWeight: 600,
  color: COLORS.text,
});

const radioContainerSizeStyles: Record<RadioSize, { padding: string; gap: string }> = {
  [RadioSize.small]: {
    padding: RADIO_SIZES[RadioSize.small].containerPadding,
    gap: RADIO_SIZES[RadioSize.small].containerGap,
  },
  [RadioSize.medium]: {
    padding: RADIO_SIZES[RadioSize.medium].containerPadding,
    gap: RADIO_SIZES[RadioSize.medium].containerGap,
  },
  [RadioSize.large]: {
    padding: RADIO_SIZES[RadioSize.large].containerPadding,
    gap: RADIO_SIZES[RadioSize.large].containerGap,
  },
};

export const radioContainer = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.15s ease-in-out',

    ':hover': {
      opacity: 0.8,
    },
  },
  variants: {
    size: styleVariants(radioContainerSizeStyles, (sizeStyle) => sizeStyle),
    disabled: {
      true: {
        cursor: 'not-allowed',
        opacity: 0.6,

        ':hover': {
          opacity: 0.6,
        },
      },
    },
  },
  defaultVariants: {
    size: RadioSize.medium,
    disabled: false,
  },
});

const radioInputSizeStyles: Record<
  RadioSize,
  { width: string; height: string; '::after': { width: string; height: string } }
> = {
  [RadioSize.small]: {
    width: RADIO_SIZES[RadioSize.small].inputSize,
    height: RADIO_SIZES[RadioSize.small].inputSize,
    '::after': {
      width: '4px',
      height: '4px',
    },
  },
  [RadioSize.medium]: {
    width: RADIO_SIZES[RadioSize.medium].inputSize,
    height: RADIO_SIZES[RadioSize.medium].inputSize,
    '::after': {
      width: '6px',
      height: '6px',
    },
  },
  [RadioSize.large]: {
    width: RADIO_SIZES[RadioSize.large].inputSize,
    height: RADIO_SIZES[RadioSize.large].inputSize,
    '::after': {
      width: '8px',
      height: '8px',
    },
  },
};

export const radioInput = recipe({
  base: {
    appearance: 'none',
    borderRadius: '50%',
    border: `2px solid ${COLORS.border}`,
    backgroundColor: COLORS.background,
    margin: 0,
    cursor: 'pointer',
    transition: 'all 0.15s ease-in-out',
    position: 'relative',
    flexShrink: 0,

    '::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) scale(0)',
      borderRadius: '50%',
      backgroundColor: COLORS.background,
      transition: 'transform 0.15s ease-in-out',
    },

    ':focus': {
      outline: `2px solid ${COLORS.checked}`,
      outlineOffset: '2px',
    },

    selectors: {
      '&:hover:not(:disabled)': {
        borderColor: COLORS.checked,
        backgroundColor: COLORS.hover,
      },
      '&:checked::after': {
        transform: 'translate(-50%, -50%) scale(1)',
      },
    },

    ':checked': {
      borderColor: COLORS.checked,
      backgroundColor: COLORS.checked,
    },
  },
  variants: {
    size: styleVariants(radioInputSizeStyles, (sizeStyle) => sizeStyle),
    checked: {
      true: {
        borderColor: COLORS.checked,
        backgroundColor: COLORS.checked,

        '::after': {
          transform: 'translate(-50%, -50%) scale(1)',
        },
      },
      false: {},
    },
    disabled: {
      true: {
        borderColor: COLORS.disabled,
        backgroundColor: COLORS.disabled,
        cursor: 'not-allowed',

        ':hover': {
          borderColor: COLORS.disabled,
          backgroundColor: COLORS.disabled,
        },

        ':checked': {
          borderColor: COLORS.disabled,
          backgroundColor: COLORS.disabled,

          '::after': {
            backgroundColor: COLORS.disabled,
          },
        },
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        checked: true,
        disabled: true,
      },
      style: {
        borderColor: COLORS.disabled,
        backgroundColor: COLORS.disabled,

        '::after': {
          backgroundColor: COLORS.disabled,
          transform: 'translate(-50%, -50%) scale(1)',
        },
      },
    },
  ],
  defaultVariants: {
    size: RadioSize.medium,
    checked: false,
    disabled: false,
  },
});

const radioLabelSizeStyles: Record<RadioSize, { fontSize: string }> = {
  [RadioSize.small]: {
    fontSize: RADIO_SIZES[RadioSize.small].fontSize,
  },
  [RadioSize.medium]: {
    fontSize: RADIO_SIZES[RadioSize.medium].fontSize,
  },
  [RadioSize.large]: {
    fontSize: RADIO_SIZES[RadioSize.large].fontSize,
  },
};

export const radioLabel = recipe({
  base: {
    cursor: 'pointer',
    color: COLORS.text,
    lineHeight: 1.5,
    userSelect: 'none',
    marginLeft: '8px',
  },
  variants: {
    size: styleVariants(radioLabelSizeStyles, (sizeStyle) => sizeStyle),
    disabled: {
      true: {
        color: COLORS.textDisabled,
        cursor: 'not-allowed',
      },
      false: {},
    },
  },
  defaultVariants: {
    size: RadioSize.medium,
    disabled: false,
  },
});

export type RadioContainerVariants = RecipeVariants<typeof radioContainer>;
export type RadioInputVariants = RecipeVariants<typeof radioInput>;
export type RadioLabelVariants = RecipeVariants<typeof radioLabel>;
