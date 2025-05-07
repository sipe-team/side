import { createGlobalTheme } from '@vanilla-extract/css';
import { themeContract, themeLayer } from './contract.css';
import { color } from '../../tokens/src/colors';
import { spacing } from '../../tokens/src/spacing';
import { fontSize, fontWeight, lineHeight } from '../../tokens/src/fonts';

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
};

export const lightTheme = createGlobalTheme(':root', themeContract, {
  ...baseTheme,
  color: {
    primary: color.cyan300,
    background: color.white,
    text: color.gray900,
    border: color.gray300,
    black: color.black,
    white: color.white,
  },
  state: {
    hover: color.gray800,
    focus: color.cyan500,
    active: color.cyan600,
  },
  mode: 'light',
});

export const darkTheme = createGlobalTheme('[data-theme="dark"]', themeContract, {
  ...baseTheme,
  color: {
    primary: color.cyan300,
    background: color.black,
    text: color.white,
    border: color.gray700,
    black: color.black,
    white: color.white,
  },
  state: {
    hover: color.cyan200,
    focus: color.cyan500,
    active: color.cyan600,
  },
  mode: 'dark',
});
