import { createGlobalTheme } from '@vanilla-extract/css';

import { shadows } from '../effects/shadows';
import { themeLayer, vars } from './contract.css';

type MapLeaves<T> = T extends string ? string : { [K in keyof T]: MapLeaves<T[K]> };

const cssVar = (token: string) => `var(--${token})`;

/**
 * Strips the `side-` prefix from every leaf value in a vars subtree,
 * converting `'var(--side-*)'` references into SD CSS variable references (`'var(--*)'`).
 */
function mapVars<T>(obj: T): MapLeaves<T> {
  if (typeof obj === 'string') return obj.replace('var(--side-', 'var(--') as MapLeaves<T>;
  return Object.fromEntries(Object.entries(obj as object).map(([k, v]) => [k, mapVars(v)])) as MapLeaves<T>;
}

const baseTheme = {
  '@layer': themeLayer,
  spacing: mapVars(vars.spacing),
  typography: {
    // typography contract values don't align with SD path-based naming — referenced manually
    fontFamily: cssVar('typography-font-family-base'),
    fontSize: {
      '050': cssVar('typography-font-size-12'),
      '100': cssVar('typography-font-size-14'),
      '200': cssVar('typography-font-size-16'),
      '300': cssVar('typography-font-size-18'),
      '400': cssVar('typography-font-size-20'),
      '500': cssVar('typography-font-size-24'),
      '600': cssVar('typography-font-size-28'),
      '700': cssVar('typography-font-size-32'),
      '800': cssVar('typography-font-size-36'),
      '900': cssVar('typography-font-size-40'),
    },
    lineHeight: {
      regular: cssVar('typography-line-height-regular'),
      compact: cssVar('typography-line-height-compact'),
    },
    fontWeight: {
      regular: cssVar('typography-font-weight-regular'),
      medium: cssVar('typography-font-weight-medium'),
      semiBold: cssVar('typography-font-weight-semi-bold'),
      bold: cssVar('typography-font-weight-bold'),
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
  radius: mapVars(vars.radius),
};

const darkColor = mapVars(vars.color);

createGlobalTheme(':root', vars, {
  ...baseTheme,
  color: darkColor,
});

createGlobalTheme('[data-theme="dark"]', vars, {
  ...baseTheme,
  color: darkColor,
});
