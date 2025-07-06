import { color } from '@sipe-team/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import type { FontSize, FontWeight } from './Input';

// TODO ThemeProvider 적용
export const colors = {
  inputRing: color.gray800,
  defaultInputOutline: color.gray400,
  disabledBackground: color.gray300,
} as const;

export const spacing = {
  defaultInputPadding: '8px',
  defaultBorderRadius: '8px',
  defaultActionSize: '24px',
} as const;

export const weight = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
} as const;

export const defaultFontSize: FontSize = 16;
export const defaultFontWeight: FontWeight = 'regular';

export const inputWrapper = recipe({
  base: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    fontStyle: 'normal',
    textAlign: 'start',
    padding: spacing.defaultInputPadding,
    borderRadius: spacing.defaultBorderRadius,
    outline: `1px solid ${colors.defaultInputOutline}`,

    '@supports': {
      'selector(:has(*))': {
        selectors: {
          '&:where(:has(input:focus))': {
            outline: `2px solid ${colors.defaultInputOutline}`,
            outlineOffset: '-1px',
          },
          '&:where(:has(input:disabled))': {
            backgroundColor: colors.disabledBackground,
          },
        },
      },
      'not selector(:has(*))': {
        selectors: {
          '&:where(:focus-within)': {
            outline: `2px solid ${colors.defaultInputOutline}`,
            outlineOffset: '-1px',
          },
        },
      },
    },
  },
  variants: {
    fontSize: {
      12: { fontSize: '12px' },
      14: { fontSize: '14px' },
      16: { fontSize: '16px' },
      18: { fontSize: '18px' },
      20: { fontSize: '20px' },
      24: { fontSize: '24px' },
      28: { fontSize: '28px' },
      32: { fontSize: '32px' },
      36: { fontSize: '36px' },
      48: { fontSize: '48px' },
    },
    fontWeight: {
      regular: { fontWeight: weight.regular },
      medium: { fontWeight: weight.medium },
      semiBold: { fontWeight: weight.semiBold },
      bold: { fontWeight: weight.bold },
    },
  },
  defaultVariants: {
    fontSize: defaultFontSize,
    fontWeight: defaultFontWeight,
  },
});

export const inputElement = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'inherit',
  outline: '1px solid transparent',
  border: 'none',
  fontSize: 'inherit',
  fontWeight: 'inherit',

  selectors: {
    '&::-webkit-search-cancel-button': {
      appearance: 'none',
    },
  },

  '@supports': {
    'selector(:has(*))': {
      selectors: {
        '&:where(:autofill, [data-com-onepassword-filled])': {
          backgroundClip: 'text',
          WebkitTextFillColor: color.gray900,
        },
        '&:where(:disabled)': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

export const inputAction = style({
  all: 'unset',
  width: spacing.defaultActionSize,
  height: spacing.defaultActionSize,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: spacing.defaultBorderRadius,

  '@supports': {
    'selector(:has(*))': {
      selectors: {
        '&:focus': {
          outline: `2px solid ${colors.defaultInputOutline}`,
          outlineOffset: '3px',
        },
      },
    },
  },
});
