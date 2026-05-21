import { createGlobalTheme } from '@vanilla-extract/css';

import { radius } from '../effects/radius';
import { shadows } from '../effects/shadows';
import { spacing } from '../layout/spacing';
import { fontSize, fontWeight, lineHeight } from '../typography/fonts';
import { themeLayer, vars } from './contract.css';

const cssVar = (token: string) => `var(--${token})`;

const baseTheme = {
  '@layer': themeLayer,
  spacing: {
    component: {
      xs: `${spacing[1]}px`,
      sm: `${spacing[2]}px`,
      md: `${spacing[3]}px`,
      lg: `${spacing[4]}px`,
      xl: `${spacing[6]}px`,
    },
    layout: {
      sm: `${spacing[8]}px`,
      md: `${spacing[10]}px`,
      lg: `${spacing[12]}px`,
      xl: `${spacing[16]}px`,
    },
  },
  typography: {
    fontFamily: 'Pretendard, system-ui, sans-serif',
    fontSize: {
      '050': `${fontSize[12]}px`,
      '100': `${fontSize[14]}px`,
      '200': `${fontSize[16]}px`,
      '300': `${fontSize[18]}px`,
      '400': `${fontSize[20]}px`,
      '500': `${fontSize[24]}px`,
      '600': `${fontSize[28]}px`,
      '700': `${fontSize[32]}px`,
      '800': `${fontSize[36]}px`,
      '900': `${fontSize[48]}px`,
    },
    lineHeight: {
      regular: `${lineHeight.regular}`,
      compact: `${lineHeight.compact}`,
    },
    fontWeight: {
      regular: `${fontWeight.regular}`,
      medium: `${fontWeight.medium}`,
      semiBold: `${fontWeight.semiBold}`,
      bold: `${fontWeight.bold}`,
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
      sm: radius.sm,
      md: radius.md,
      lg: radius.lg,
      xl: radius.xl,
      full: radius.full,
    },
    layout: {
      sm: radius.md,
      md: radius.lg,
      lg: radius.xl,
    },
  },
};

// SD semantic CSS variable references — values resolved from dist/css/semantic-dark.css
const darkColor = {
  background: {
    base: cssVar('color-background-base'),
    subtle: cssVar('color-background-subtle'),
    muted: cssVar('color-background-muted'),
  },
  foreground: {
    default: cssVar('color-foreground-default'),
    subtle: cssVar('color-foreground-subtle'),
    muted: cssVar('color-foreground-muted'),
    onAccent: cssVar('color-foreground-on-accent'),
  },
  border: {
    default: cssVar('color-border-default'),
    strong: cssVar('color-border-strong'),
    focus: cssVar('color-border-focus'),
  },
  accent: {
    default: cssVar('color-accent-default'),
    hover: cssVar('color-accent-hover'),
    subtle: cssVar('color-accent-subtle'),
  },
  status: {
    success: {
      foreground: cssVar('color-status-success-foreground'),
      background: cssVar('color-status-success-background'),
      border: cssVar('color-status-success-border'),
    },
    warning: {
      foreground: cssVar('color-status-warning-foreground'),
      background: cssVar('color-status-warning-background'),
      border: cssVar('color-status-warning-border'),
    },
    danger: {
      foreground: cssVar('color-status-danger-foreground'),
      background: cssVar('color-status-danger-background'),
      border: cssVar('color-status-danger-border'),
    },
    info: {
      foreground: cssVar('color-status-info-foreground'),
      background: cssVar('color-status-info-background'),
      border: cssVar('color-status-info-border'),
    },
  },
};

createGlobalTheme(':root', vars, {
  ...baseTheme,
  color: darkColor,
});

createGlobalTheme('[data-theme="dark"]', vars, {
  ...baseTheme,
  color: darkColor,
});
