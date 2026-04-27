import { createGlobalThemeContract, globalLayer } from '@vanilla-extract/css';

export const themeLayer = globalLayer('theme');

export const vars = createGlobalThemeContract(
  {
    color: {
      background: {
        base: 'color-background-base',
        subtle: 'color-background-subtle',
        muted: 'color-background-muted',
      },
      foreground: {
        default: 'color-foreground-default',
        subtle: 'color-foreground-subtle',
        muted: 'color-foreground-muted',
        onAccent: 'color-foreground-on-accent',
      },
      border: {
        default: 'color-border-default',
        strong: 'color-border-strong',
        focus: 'color-border-focus',
      },
      accent: {
        default: 'color-accent-default',
        hover: 'color-accent-hover',
        subtle: 'color-accent-subtle',
      },
      status: {
        success: {
          foreground: 'color-status-success-foreground',
          background: 'color-status-success-background',
          border: 'color-status-success-border',
        },
        warning: {
          foreground: 'color-status-warning-foreground',
          background: 'color-status-warning-background',
          border: 'color-status-warning-border',
        },
        danger: {
          foreground: 'color-status-danger-foreground',
          background: 'color-status-danger-background',
          border: 'color-status-danger-border',
        },
        info: {
          foreground: 'color-status-info-foreground',
          background: 'color-status-info-background',
          border: 'color-status-info-border',
        },
      },
    },
    spacing: {
      component: {
        xs: 'spacing-component-xs',
        sm: 'spacing-component-sm',
        md: 'spacing-component-md',
        lg: 'spacing-component-lg',
        xl: 'spacing-component-xl',
      },
      layout: {
        sm: 'spacing-layout-sm',
        md: 'spacing-layout-md',
        lg: 'spacing-layout-lg',
        xl: 'spacing-layout-xl',
      },
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
      component: {
        sm: 'radius-component-sm',
        md: 'radius-component-md',
        lg: 'radius-component-lg',
        xl: 'radius-component-xl',
        full: 'radius-component-full',
      },
      layout: {
        sm: 'radius-layout-sm',
        md: 'radius-layout-md',
        lg: 'radius-layout-lg',
      },
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
