import { createGlobalTheme } from '@vanilla-extract/css';

import { themeColor } from '../colors/colors';
import { shadows } from '../effects/shadows';
import { themeLayer, vars } from './contract.css';

const baseTheme = {
  '@layer': themeLayer,
  spacing: {
    component: {
      xs: 'var(--spacing-component-xs)',
      sm: 'var(--spacing-component-sm)',
      md: 'var(--spacing-component-md)',
      lg: 'var(--spacing-component-lg)',
      xl: 'var(--spacing-component-xl)',
    },
    layout: {
      sm: 'var(--spacing-layout-sm)',
      md: 'var(--spacing-layout-md)',
      lg: 'var(--spacing-layout-lg)',
      xl: 'var(--spacing-layout-xl)',
    },
  },
  typography: {
    fontFamily: 'var(--typography-font-family-base)',
    fontSize: {
      '050': 'var(--typography-font-size-12)',
      '100': 'var(--typography-font-size-14)',
      '200': 'var(--typography-font-size-16)',
      '300': 'var(--typography-font-size-18)',
      '400': 'var(--typography-font-size-20)',
      '500': 'var(--typography-font-size-24)',
      '600': 'var(--typography-font-size-28)',
      '700': 'var(--typography-font-size-32)',
      '800': 'var(--typography-font-size-36)',
      '900': 'var(--typography-font-size-48)',
    },
    lineHeight: {
      regular: 'var(--typography-line-height-regular)',
      compact: 'var(--typography-line-height-compact)',
    },
    fontWeight: {
      regular: 'var(--typography-font-weight-regular)',
      medium: 'var(--typography-font-weight-medium)',
      semiBold: 'var(--typography-font-weight-semi-bold)',
      bold: 'var(--typography-font-weight-bold)',
    },
  },
  shadows: {
    none: shadows.none,
    sm: shadows.sm,
    md: shadows.md,
    lg: shadows.lg,
    xl: shadows.xl,
    '2xl': shadows['2xl'],
  },
  radius: {
    component: {
      sm: 'var(--radius-component-sm)',
      md: 'var(--radius-component-md)',
      lg: 'var(--radius-component-lg)',
      xl: 'var(--radius-component-xl)',
      full: 'var(--radius-component-full)',
    },
    layout: {
      sm: 'var(--radius-layout-sm)',
      md: 'var(--radius-layout-md)',
      lg: 'var(--radius-layout-lg)',
    },
  },
};

const darkBaseColor = {
  background: {
    base: 'var(--color-background-base)',
    subtle: 'var(--color-background-subtle)',
    muted: 'var(--color-background-muted)',
  },
  foreground: {
    default: 'var(--color-foreground-default)',
    subtle: 'var(--color-foreground-subtle)',
    muted: 'var(--color-foreground-muted)',
    onAccent: 'var(--color-foreground-on-accent)',
  },
  border: {
    default: 'var(--color-border-default)',
    strong: 'var(--color-border-strong)',
    focus: 'var(--color-border-focus)',
  },
  status: {
    success: {
      foreground: 'var(--color-status-success-foreground)',
      background: 'var(--color-status-success-background)',
      border: 'var(--color-status-success-border)',
    },
    warning: {
      foreground: 'var(--color-status-warning-foreground)',
      background: 'var(--color-status-warning-background)',
      border: 'var(--color-status-warning-border)',
    },
    danger: {
      foreground: 'var(--color-status-danger-foreground)',
      background: 'var(--color-status-danger-background)',
      border: 'var(--color-status-danger-border)',
    },
    info: {
      foreground: 'var(--color-status-info-foreground)',
      background: 'var(--color-status-info-background)',
      border: 'var(--color-status-info-border)',
    },
  },
};

createGlobalTheme(':root', vars, {
  ...baseTheme,
  color: {
    ...darkBaseColor,
    accent: {
      default: 'var(--color-accent-default)',
      hover: 'var(--color-accent-hover)',
      subtle: 'var(--color-accent-subtle)',
    },
  },
  mode: 'dark',
  theme: 'default',
});

createGlobalTheme('[data-theme="1st"]', vars, {
  ...baseTheme,
  color: {
    ...darkBaseColor,
    accent: {
      default: themeColor['1st'].primary,
      hover: themeColor['1st'].secondary,
      subtle: 'var(--color-green-900)',
    },
  },
  mode: 'dark',
  theme: '1st',
});

createGlobalTheme('[data-theme="2nd"]', vars, {
  ...baseTheme,
  color: {
    ...darkBaseColor,
    accent: {
      default: themeColor['2nd'].primary,
      hover: themeColor['2nd'].secondary,
      subtle: 'var(--color-teal-900)',
    },
  },
  mode: 'dark',
  theme: '2nd',
});

createGlobalTheme('[data-theme="3rd"]', vars, {
  ...baseTheme,
  color: {
    ...darkBaseColor,
    accent: {
      default: themeColor['3rd'].primary,
      hover: themeColor['3rd'].secondary,
      subtle: 'var(--color-cyan-900)',
    },
  },
  mode: 'dark',
  theme: '3rd',
});

createGlobalTheme('[data-theme="4th"]', vars, {
  ...baseTheme,
  color: {
    ...darkBaseColor,
    accent: {
      default: themeColor['4th'].primary,
      hover: themeColor['4th'].secondary,
      subtle: 'var(--color-pink-900)',
    },
  },
  mode: 'dark',
  theme: '4th',
});
