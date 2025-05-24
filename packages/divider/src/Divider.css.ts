import { color } from '@sipe-team/tokens';
import { style, styleVariants } from '@vanilla-extract/css';
import type { ColorType, OrientationType } from './constants';

export const base = style({
  border: 0,
  margin: 0,
  flexShrink: 0,
});

const orientationStyles: Record<OrientationType, { width?: string; height?: string }> = {
  horizontal: {
    width: '100%',
    height: '1px',
  },
  vertical: {
    width: '1px',
    height: '100%',
  },
};

export const orientations = styleVariants(orientationStyles);

const colorStyles: Record<ColorType, { backgroundColor: string }> = {
  default: { backgroundColor: color.gray300 },
  primary: { backgroundColor: color.cyan300 },
  dark: { backgroundColor: color.gray900 },
};

export const colors = styleVariants(colorStyles);
