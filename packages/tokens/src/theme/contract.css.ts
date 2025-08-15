import { createGlobalThemeContract, globalLayer } from '@vanilla-extract/css';

export const themeLayer = globalLayer('theme');

export const vars = createGlobalThemeContract(
  {
    color: {
      primary: 'color-primary',
      secondary: 'color-secondary',
      background: 'color-background',
      text: 'color-text',
      gradient: 'color-gradient',
    },
    spacing: {
      xs: 'spacing-xs',
      sm: 'spacing-sm',
      md: 'spacing-md',
      lg: 'spacing-lg',
      xl: 'spacing-xl',
    },
    typography: {
      fontFamily: 'font-family',
      fontSize: {
        '050': 'font-size-050',
        '100': 'font-size-100',
        '200': 'font-size-200',
        '300': 'font-size-300',
        '400': 'font-size-400',
        '500': 'font-size-500',
        '600': 'font-size-600',
        '700': 'font-size-700',
        '800': 'font-size-800',
        '900': 'font-size-900',
      },
      lineHeight: {
        regular: 'line-height-regular',
        compact: 'line-height-compact',
      },
      fontWeight: {
        regular: 'font-weight-regular',
        medium: 'font-weight-medium',
        semiBold: 'font-weight-semi-bold',
        bold: 'font-weight-bold',
      },
    },
    radius: {
      none: 'radius-none',
      sm: 'radius-sm',
      md: 'radius-md',
      lg: 'radius-lg',
      xl: 'radius-xl',
      full: 'radius-full',
    },
    shadows: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      '2xl': 'shadow-2xl',
    },
    mode: 'theme-mode',
    theme: 'theme-name',
  },
  (value) => `side-${value}`,
);
