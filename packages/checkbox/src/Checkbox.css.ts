import { color } from '@sipe-team/tokens';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import { recipe } from '@vanilla-extract/recipes';
import { CheckboxSize } from './Checkbox';

export const CHECKBOX_SIZES = {
  [CheckboxSize.small]: {
    inputSize: '16px',
    fontSize: '14px',
    containerPadding: '8px',
    containerMargin: '4px',
  },
  [CheckboxSize.medium]: {
    inputSize: '20px',
    fontSize: '16px',
    containerPadding: '10px',
    containerMargin: '6px',
  },
  [CheckboxSize.large]: {
    inputSize: '24px',
    fontSize: '18px',
    containerPadding: '12px',
    containerMargin: '8px',
  },
} as const;

const BORDER_RADIUS_PX = 4;
const BORDER_WIDTH_PX = 1;
const CONTAINER_GAP_PX = 8;

const COLORS = {
  border: color.gray300 || '#D1D5DB',
  background: color.white || '#FFFFFF',
  checked: '#3B82F6',
  disabled: color.gray200 || '#E5E7EB',
  hover: color.gray100 || '#F3F4F6',
};

const CHECKBOX_STYLE = {
  borderRadius: BORDER_RADIUS_PX,
  borderWidth: BORDER_WIDTH_PX,
  borderColor: COLORS.border,
  backgroundColor: COLORS.background,
  checkedColor: COLORS.checked,
  disabledColor: COLORS.disabled,
  hoverColor: COLORS.hover,
  backgroundSize: '100%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  transition: 'all 0.15s ease-in-out',
} as const;

export const container = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: `${CONTAINER_GAP_PX}px`,
  },
  variants: {
    size: {
      [CheckboxSize.small]: {
        padding: CHECKBOX_SIZES[CheckboxSize.small].containerPadding,
        margin: CHECKBOX_SIZES[CheckboxSize.small].containerMargin,
      },
      [CheckboxSize.medium]: {
        padding: CHECKBOX_SIZES[CheckboxSize.medium].containerPadding,
        margin: CHECKBOX_SIZES[CheckboxSize.medium].containerMargin,
      },
      [CheckboxSize.large]: {
        padding: CHECKBOX_SIZES[CheckboxSize.large].containerPadding,
        margin: CHECKBOX_SIZES[CheckboxSize.large].containerMargin,
      },
    },
    disabled: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    size: CheckboxSize.medium,
    disabled: false,
  },
});
export type ContainerVariants = RecipeVariants<typeof container>;

export const input = recipe({
  base: {
    appearance: 'none',
    border: `${CHECKBOX_STYLE.borderWidth}px solid ${CHECKBOX_STYLE.borderColor}`,
    backgroundColor: CHECKBOX_STYLE.backgroundColor,
    backgroundSize: CHECKBOX_STYLE.backgroundSize,
    backgroundPosition: CHECKBOX_STYLE.backgroundPosition,
    backgroundRepeat: CHECKBOX_STYLE.backgroundRepeat,
    transition: CHECKBOX_STYLE.transition,
    cursor: 'pointer',
  },
  variants: {
    size: {
      [CheckboxSize.small]: {
        width: CHECKBOX_SIZES[CheckboxSize.small].inputSize,
        height: CHECKBOX_SIZES[CheckboxSize.small].inputSize,
        borderRadius: `${CHECKBOX_STYLE.borderRadius}px`,
      },
      [CheckboxSize.medium]: {
        width: CHECKBOX_SIZES[CheckboxSize.medium].inputSize,
        height: CHECKBOX_SIZES[CheckboxSize.medium].inputSize,
        borderRadius: `${CHECKBOX_STYLE.borderRadius}px`,
      },
      [CheckboxSize.large]: {
        width: CHECKBOX_SIZES[CheckboxSize.large].inputSize,
        height: CHECKBOX_SIZES[CheckboxSize.large].inputSize,
        borderRadius: `${CHECKBOX_STYLE.borderRadius}px`,
      },
    },
    checked: {
      true: {
        backgroundColor: CHECKBOX_STYLE.checkedColor,
        borderColor: CHECKBOX_STYLE.checkedColor,
        backgroundImage: `url("public/check.svg")`,
      },
    },
    indeterminate: {
      true: {
        backgroundColor: CHECKBOX_STYLE.checkedColor,
        borderColor: CHECKBOX_STYLE.checkedColor,
        backgroundImage: `url("public/indeterminate.svg")`,
      },
    },
    disabled: {
      true: {
        backgroundColor: CHECKBOX_STYLE.disabledColor,
        borderColor: CHECKBOX_STYLE.disabledColor,
        cursor: 'not-allowed',
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
        backgroundColor: CHECKBOX_STYLE.disabledColor,
        borderColor: CHECKBOX_STYLE.disabledColor,
        backgroundImage: `url("public/check.svg")`,
        opacity: 0.6,
      },
    },
    {
      variants: {
        indeterminate: true,
        disabled: true,
      },
      style: {
        backgroundColor: CHECKBOX_STYLE.disabledColor,
        borderColor: CHECKBOX_STYLE.disabledColor,
        backgroundImage: `url("public/indeterminate.svg")`,
        opacity: 0.6,
      },
    },
  ],
  defaultVariants: {
    size: CheckboxSize.medium,
    disabled: false,
  },
});
export type InputVariants = RecipeVariants<typeof input>;

// Label recipe
export const label = recipe({
  base: {
    cursor: 'pointer',
  },
  variants: {
    size: {
      [CheckboxSize.small]: {
        fontSize: CHECKBOX_SIZES[CheckboxSize.small].fontSize,
      },
      [CheckboxSize.medium]: {
        fontSize: CHECKBOX_SIZES[CheckboxSize.medium].fontSize,
      },
      [CheckboxSize.large]: {
        fontSize: CHECKBOX_SIZES[CheckboxSize.large].fontSize,
      },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        opacity: 0.6,
      },
      false: {},
    },
  },
  defaultVariants: {
    size: CheckboxSize.medium,
    disabled: false,
  },
});
export type LabelVariants = RecipeVariants<typeof label>;
