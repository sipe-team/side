import { createGlobalThemeContract, globalLayer } from '@vanilla-extract/css';

export const themeLayer = globalLayer('theme');

export const vars = createGlobalThemeContract(
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
    radius: {
      none: 'radius-none',
      sm: 'radius-sm',
      md: 'radius-md',
      lg: 'radius-lg',
      xl: 'radius-xl',
      full: 'radius-full',
    },
    border: {
      width: {
        none: 'border-width-none',
        thin: 'border-width-thin',
        medium: 'border-width-medium',
        thick: 'border-width-thick',
      },
      style: {
        solid: 'border-style-solid',
        dashed: 'border-style-dashed',
        dotted: 'border-style-dotted',
      },
    },
    opacity: {
      0: 'opacity-0',
      5: 'opacity-5',
      10: 'opacity-10',
      20: 'opacity-20',
      25: 'opacity-25',
      30: 'opacity-30',
      40: 'opacity-40',
      50: 'opacity-50',
      60: 'opacity-60',
      70: 'opacity-70',
      75: 'opacity-75',
      80: 'opacity-80',
      90: 'opacity-90',
      95: 'opacity-95',
      100: 'opacity-100',
    },
    zIndex: {
      hide: 'z-index-hide',
      base: 'z-index-base',
      dropdown: 'z-index-dropdown',
      sticky: 'z-index-sticky',
      fixed: 'z-index-fixed',
      overlay: 'z-index-overlay',
      modal: 'z-index-modal',
      popover: 'z-index-popover',
      toast: 'z-index-toast',
      tooltip: 'z-index-tooltip',
    },
    shadows: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      '2xl': 'shadow-2xl',
    },
    grid: {
      columns: 'grid-columns',
      gutter: {
        sm: 'grid-gutter-sm',
        md: 'grid-gutter-md',
        lg: 'grid-gutter-lg',
      },
      container: {
        sm: 'grid-container-sm',
        md: 'grid-container-md',
        lg: 'grid-container-lg',
        xl: 'grid-container-xl',
        xxl: 'grid-container-xxl',
      },
    },
    mode: 'theme-mode',
  },
  (value) => `side-${value}`,
);
