import { createGlobalTheme } from '@vanilla-extract/css';

import { brandColor, color } from '../colors/colors';
import { radius } from '../effects/radius';
import { shadows } from '../effects/shadows';
import { spacing } from '../layout/spacing';
import { fontSize, fontWeight, lineHeight } from '../typography/fonts';
import { themeLayer, vars } from './contract.css';

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

const darkColor = {
  background: {
    base: color.gray950,
    subtle: color.gray900,
    muted: color.gray800,
  },
  foreground: {
    default: color.white,
    subtle: color.gray400,
    muted: color.gray500,
    onAccent: color.white,
  },
  border: {
    default: color.gray700,
    strong: color.gray500,
    focus: color.blue400,
  },
  accent: {
    default: brandColor.default,
    hover: brandColor.hover,
    subtle: brandColor.subtle,
  },
  status: {
    success: { foreground: color.green400, background: color.green900, border: color.green700 },
    warning: { foreground: color.orange400, background: color.orange900, border: color.orange700 },
    danger: { foreground: color.red400, background: color.red900, border: color.red700 },
    info: { foreground: color.blue400, background: color.blue900, border: color.blue700 },
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
