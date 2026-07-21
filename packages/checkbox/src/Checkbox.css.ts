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

// SVG 애셋을 data-URI로 인라인해 esbuild(tsup)와 webpack(docs) 양쪽 번들러에서
// 외부 경로 해석 없이 동일하게 동작하도록 한다.
const CHECK_ICON_URL =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='white'%3E%20%3Cpath%20d='M9%2016.17L4.83%2012l-1.42%201.41L9%2019%2021%207l-1.41-1.41L9%2016.17z'/%3E%20%3C/svg%3E";
const INDETERMINATE_ICON_URL =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='white'%3E%20%3Cpath%20d='M19%2013H5v-2h14v2z'/%3E%20%3C/svg%3E";

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
        backgroundImage: `url("${CHECK_ICON_URL}")`,
      },
    },
    indeterminate: {
      true: {
        backgroundColor: CHECKBOX_STYLE.checkedColor,
        borderColor: CHECKBOX_STYLE.checkedColor,
        backgroundImage: `url("${INDETERMINATE_ICON_URL}")`,
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
        backgroundImage: `url("${CHECK_ICON_URL}")`,
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
        backgroundImage: `url("${INDETERMINATE_ICON_URL}")`,
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
