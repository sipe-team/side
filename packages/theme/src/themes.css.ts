import { createGlobalTheme } from '@vanilla-extract/css';
import { vars, themeLayer } from './themeContract.css';
import {
  color,
  spacing,
  fontSize,
  fontWeight,
  lineHeight,
  radius,
  borderStyle,
  borderWidth,
  grid,
  opacity,
  shadows,
  zIndex,
} from '@sipe-team/tokens';

const baseTheme = {
  '@layer': themeLayer,
  spacing: {
    xs: `${spacing[2]}px`,
    sm: `${spacing[4]}px`,
    md: `${spacing[6]}px`,
    lg: `${spacing[8]}px`,
    xl: `${spacing[12]}px`,
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: {
      small: `${fontSize[14]}px`,
      medium: `${fontSize[16]}px`,
      large: `${fontSize[20]}px`,
    },
    lineHeight: {
      default: `${lineHeight.regular}`,
      heading: `${lineHeight.compact}`,
    },
    fontWeight: {
      regular: `${fontWeight.regular}`,
      medium: `${fontWeight.medium}`,
      bold: `${fontWeight.bold}`,
    },
  },
  radius: {
    none: `${radius.none}px`,
    sm: `${radius.sm}px`,
    md: `${radius.md}px`,
    lg: `${radius.lg}px`,
    xl: `${radius.xl}px`,
    full: `${radius.full}px`,
  },
  border: {
    width: {
      none: `${borderWidth.none}px`,
      thin: `${borderWidth.thin}px`,
      medium: `${borderWidth.medium}px`,
      thick: `${borderWidth.thick}px`,
    },
    style: {
      solid: `${borderStyle.solid}`,
      dashed: `${borderStyle.dashed}`,
      dotted: `${borderStyle.dotted}`,
    },
  },
  opacity: {
    0: `${opacity[0]}`,
    5: `${opacity[5]}`,
    10: `${opacity[10]}`,
    20: `${opacity[20]}`,
    25: `${opacity[25]}`,
    30: `${opacity[30]}`,
    40: `${opacity[40]}`,
    50: `${opacity[50]}`,
    60: `${opacity[60]}`,
    70: `${opacity[70]}`,
    75: `${opacity[75]}`,
    80: `${opacity[80]}`,
    90: `${opacity[90]}`,
    95: `${opacity[95]}`,
    100: `${opacity[100]}`,
  },
  zIndex: {
    hide: `${zIndex.hide}`,
    base: `${zIndex.base}`,
    dropdown: `${zIndex.dropdown}`,
    sticky: `${zIndex.sticky}`,
    fixed: `${zIndex.fixed}`,
    overlay: `${zIndex.overlay}`,
    modal: `${zIndex.modal}`,
    popover: `${zIndex.popover}`,
    toast: `${zIndex.toast}`,
    tooltip: `${zIndex.tooltip}`,
  },
  shadows: {
    none: `${shadows.none}`,
    sm: `${shadows.sm}`,
    md: `${shadows.md}`,
    lg: `${shadows.lg}`,
    xl: `${shadows.xl}`,
    '2xl': `${shadows['2xl']}`,
  },
  grid: {
    columns: `${grid.columns}`,
    gutter: {
      sm: `${grid.gutter.sm}px`,
      md: `${grid.gutter.md}px`,
      lg: `${grid.gutter.lg}px`,
    },
    container: {
      sm: `${grid.container.sm}px`,
      md: `${grid.container.md}px`,
      lg: `${grid.container.lg}px`,
      xl: `${grid.container.xl}px`,
      xxl: `${grid.container.xxl}px`,
    },
  },
};

export const lightTheme = createGlobalTheme(':root', vars, {
  ...baseTheme,
  color: {
    primary: color.cyan300,
    background: color.white,
    text: color.gray900,
    border: color.gray300,
    black: color.black,
    white: color.white,
  },
  mode: 'light',
});

export const darkTheme = createGlobalTheme('[data-theme="dark"]', vars, {
  ...baseTheme,
  color: {
    primary: color.cyan300,
    background: color.black,
    text: color.white,
    border: color.gray700,
    black: color.black,
    white: color.white,
  },
  mode: 'dark',
});
