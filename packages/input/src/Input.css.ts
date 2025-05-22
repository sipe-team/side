import { fontWeight } from '@sipe-team/tokens';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import { recipe } from '@vanilla-extract/recipes';
import { INPUT_COLORS, INPUT_SIZES, INPUT_SPACING, INPUT_STYLES, getPaddingValue } from './constants';

export const InputSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export const InputVariant = {
  outline: 'outline',
  filled: 'filled',
} as const;

export const wrapper = recipe({
  base: {
    position: INPUT_STYLES.position.relative,
    display: INPUT_STYLES.display.flex,
    alignItems: INPUT_STYLES.flex.alignItems.center,
    width: '100%',
    borderRadius: `${INPUT_SPACING.borderRadius.default}px`,
    borderStyle: INPUT_STYLES.borderStyle.solid,
    borderWidth: `${INPUT_SPACING.borderWidth.default}px`,
    transition: INPUT_STYLES.transition.default,
    fontFamily: INPUT_STYLES.fontFamily.default,
  },
  variants: {
    size: {
      [InputSize.small]: {
        height: INPUT_SIZES.small.height,
        padding: getPaddingValue('small'),
        fontSize: `${INPUT_SIZES.small.fontSize}px`,
      },
      [InputSize.medium]: {
        height: INPUT_SIZES.medium.height,
        padding: getPaddingValue('medium'),
        fontSize: `${INPUT_SIZES.medium.fontSize}px`,
      },
      [InputSize.large]: {
        height: INPUT_SIZES.large.height,
        padding: getPaddingValue('large'),
        fontSize: `${INPUT_SIZES.large.fontSize}px`,
      },
    },
    variant: {
      [InputVariant.outline]: {
        backgroundColor: INPUT_COLORS.background.default,
        borderColor: INPUT_COLORS.border.default,
      },
      [InputVariant.filled]: {
        backgroundColor: INPUT_COLORS.background.filled,
        borderColor: 'transparent',
      },
    },
    state: {
      default: {},
      focus: {
        borderColor: INPUT_COLORS.border.focus,
        outline: `${INPUT_SPACING.borderWidth.outline}px solid ${INPUT_COLORS.outline.focus}`,
        outlineOffset: `${INPUT_SPACING.outline.offset}px`,
      },
      error: {
        borderColor: INPUT_COLORS.border.error,
      },
      disabled: {
        backgroundColor: INPUT_COLORS.background.disabled,
        borderColor: INPUT_COLORS.border.disabled,
        cursor: INPUT_STYLES.cursor.notAllowed,
        opacity: INPUT_STYLES.opacity.disabled,
      },
    },
    fontWeight: {
      regular: { fontWeight: fontWeight.regular },
      medium: { fontWeight: fontWeight.medium },
      semiBold: { fontWeight: fontWeight.semiBold },
      bold: { fontWeight: fontWeight.bold },
    },
  },
  compoundVariants: [
    {
      variants: {
        variant: InputVariant.filled,
        state: 'focus',
      },
      style: {
        backgroundColor: INPUT_COLORS.background.focusFilled,
        borderColor: INPUT_COLORS.border.focus,
      },
    },
    {
      variants: {
        variant: InputVariant.filled,
        state: 'error',
      },
      style: {
        backgroundColor: INPUT_COLORS.background.focus,
        borderColor: INPUT_COLORS.border.error,
      },
    },
  ],
  defaultVariants: {
    size: InputSize.medium,
    variant: InputVariant.outline,
    state: 'default',
    fontWeight: 'regular',
  },
});

export const input = recipe({
  base: {
    width: '100%',
    border: 'none',
    background: 'transparent',
    outline: 'none',
    color: INPUT_COLORS.text.default,
    fontFamily: INPUT_STYLES.fontFamily.default,
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: INPUT_STYLES.lineHeight.default,
    cursor: INPUT_STYLES.cursor.default,

    '::placeholder': {
      color: INPUT_COLORS.text.placeholder,
      opacity: INPUT_STYLES.opacity.placeholder,
    },

    '::-webkit-search-cancel-button': {
      appearance: INPUT_STYLES.webkit.appearance,
    },
    '::-webkit-outer-spin-button': {
      appearance: INPUT_STYLES.webkit.appearance,
      margin: 0,
    },
    '::-webkit-inner-spin-button': {
      appearance: INPUT_STYLES.webkit.appearance,
      margin: 0,
    },
  },
  variants: {
    disabled: {
      true: {
        color: INPUT_COLORS.text.disabled,
        cursor: INPUT_STYLES.cursor.notAllowed,
        '::placeholder': {
          color: INPUT_COLORS.text.disabled,
        },
      },
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export const action = recipe({
  base: {
    display: INPUT_STYLES.display.flex,
    alignItems: INPUT_STYLES.flex.alignItems.center,
    justifyContent: INPUT_STYLES.flex.justifyContent.center,
    border: 'none',
    background: 'transparent',
    cursor: INPUT_STYLES.cursor.pointer,
    borderRadius: `${INPUT_SPACING.borderRadius.action}px`,
    color: INPUT_COLORS.action.default,
    transition: INPUT_STYLES.transition.default,
    flexShrink: 0,
    marginLeft: `${INPUT_SPACING.action.marginLeft}px`,

    ':hover': {
      backgroundColor: INPUT_COLORS.action.hover,
    },
    ':focus': {
      outline: `${INPUT_SPACING.borderWidth.outline}px solid ${INPUT_COLORS.action.focus}`,
      outlineOffset: `${INPUT_SPACING.outline.focusOffset}px`,
    },
  },
  variants: {
    size: {
      [InputSize.small]: {
        width: `${INPUT_SIZES.small.actionSize}px`,
        height: `${INPUT_SIZES.small.actionSize}px`,
      },
      [InputSize.medium]: {
        width: `${INPUT_SIZES.medium.actionSize}px`,
        height: `${INPUT_SIZES.medium.actionSize}px`,
      },
      [InputSize.large]: {
        width: `${INPUT_SIZES.large.actionSize}px`,
        height: `${INPUT_SIZES.large.actionSize}px`,
      },
    },
    disabled: {
      true: {
        cursor: INPUT_STYLES.cursor.notAllowed,
        opacity: INPUT_STYLES.opacity.disabled,
        color: INPUT_COLORS.action.disabled,
        ':hover': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
  defaultVariants: {
    size: InputSize.medium,
    disabled: false,
  },
});

export type WrapperVariants = RecipeVariants<typeof wrapper>;
export type InputVariants = RecipeVariants<typeof input>;
export type ActionVariants = RecipeVariants<typeof action>;
