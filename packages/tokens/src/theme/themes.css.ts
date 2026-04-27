import { createGlobalTheme } from '@vanilla-extract/css';

import { brandColor, color, themeColor } from '../colors/colors';
import { shadows } from '../effects/shadows';
import { fontSize, fontWeight, lineHeight } from '../typography/fonts';
import { themeLayer, vars } from './contract.css';

const baseTheme = {
  '@layer': themeLayer,
  spacing: {
    component: {
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
    },
    layout: {
      sm: '32px',
      md: '40px',
      lg: '48px',
      xl: '64px',
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
      sm: '2px',
      md: '4px',
      lg: '8px',
      xl: '12px',
      full: '9999px',
    },
    layout: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
  },
};

const darkBaseColor = {
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
  status: {
    success: { foreground: color.green400, background: color.green900, border: color.green700 },
    warning: { foreground: color.orange400, background: color.orange900, border: color.orange700 },
    danger: { foreground: color.red400, background: color.red900, border: color.red700 },
    info: { foreground: color.blue400, background: color.blue900, border: color.blue700 },
  },
};

export const defaultTheme = createGlobalTheme(':root', vars, {
  ...baseTheme,
  color: {
    ...darkBaseColor,
    accent: {
      default: brandColor.default,
      hover: brandColor.hover,
      subtle: brandColor.subtle,
    },
  },
  mode: 'dark',
  theme: 'default',
});

export const theme1st = createGlobalTheme('[data-theme="1st"]', vars, {
  ...baseTheme,
  color: {
    ...darkBaseColor,
    accent: {
      default: themeColor['1st'].primary,
      hover: themeColor['1st'].secondary,
      subtle: color.green900,
    },
  },
  mode: 'dark',
  theme: '1st',
});

export const theme2nd = createGlobalTheme('[data-theme="2nd"]', vars, {
  ...baseTheme,
  color: {
    ...darkBaseColor,
    accent: {
      default: themeColor['2nd'].primary,
      hover: themeColor['2nd'].secondary,
      subtle: color.teal900,
    },
  },
  mode: 'dark',
  theme: '2nd',
});

export const theme3rd = createGlobalTheme('[data-theme="3rd"]', vars, {
  ...baseTheme,
  color: {
    ...darkBaseColor,
    accent: {
      default: themeColor['3rd'].primary,
      hover: themeColor['3rd'].secondary,
      subtle: color.cyan900,
    },
  },
  mode: 'dark',
  theme: '3rd',
});

export const theme4th = createGlobalTheme('[data-theme="4th"]', vars, {
  ...baseTheme,
  color: {
    ...darkBaseColor,
    accent: {
      default: themeColor['4th'].primary,
      hover: themeColor['4th'].secondary,
      subtle: color.pink900,
    },
  },
  mode: 'dark',
  theme: '4th',
});
