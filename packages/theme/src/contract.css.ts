import { createGlobalThemeContract, globalLayer } from '@vanilla-extract/css';

export const themeLayer = globalLayer('theme');

export const themeContract = createGlobalThemeContract(
  {
    color: {
      primary: 'color-primary',
      black: 'color-black',
      white: 'color-white',
      background: 'color-background',
      text: 'color-text',
      border: 'color-border',
    },
    spacing: {
      xs: 'spacing-xs',
      sm: 'spacing-sm',
      md: 'spacing-md',
      lg: 'spacing-lg',
      xl: 'spacing-xl',
    },
    typography: {
      fontFamily: 'typography-font-family',
      fontSize: {
        small: 'typography-font-size-small',
        medium: 'typography-font-size-medium',
        large: 'typography-font-size-large',
      },
      lineHeight: {
        default: 'typography-line-height-default',
        heading: 'typography-line-height-heading',
      },
      fontWeight: {
        regular: 'typography-font-weight-regular',
        medium: 'typography-font-weight-medium',
        bold: 'typography-font-weight-bold',
      },
    },
    state: {
      hover: 'state-hover',
      focus: 'state-focus',
      active: 'state-active',
    },
    mode: 'theme-mode',
  },
  (value) => `side-${value}`,
);
