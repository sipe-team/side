import { color } from '@sipe-team/tokens';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { switchHeight, switchWidth } from './constants/size';

export const wrapper = style({
  display: 'flex',
  alignItems: 'center',
});

export const input = style({
  border: 0,
  clip: 'rect(0, 0, 0, 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  width: '1px',
  whiteSpace: 'nowrap',
  overflowWrap: 'normal',
});

export const track = recipe({
  base: {
    position: 'relative',
    display: 'inline-flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 100,
    background: color.gray300,
    cursor: 'pointer',
  },

  variants: {
    size: {
      sm: {
        width: switchWidth.sm,
        height: switchHeight.sm,
      },
      md: {
        width: switchWidth.md,
        height: switchHeight.md,
      },
      lg: {
        width: switchWidth.lg,
        height: switchHeight.lg,
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
    checked: {
      true: {
        background: color.blue500,
      },
    },
  },

  defaultVariants: { size: 'md', disabled: false, checked: false },
});

export const thumb = recipe({
  base: {
    scale: 0.8,
    background: color.white,
    borderRadius: 'inherit',
    boxShadow: `0px 2px 4px color-mix(in srgb, ${color.gray900} 10%, transparent), 0px 0px 1px color-mix(in srgb, ${color.gray900} 30%, transparent)`,
    transitionProperty: 'translate',
    transitionDuration: '150ms',
  },

  variants: {
    size: {
      sm: {
        width: switchHeight.sm,
        height: switchHeight.sm,
      },
      md: {
        width: switchHeight.md,
        height: switchHeight.md,
      },
      lg: {
        width: switchHeight.lg,
        height: switchHeight.lg,
      },
    },
    checked: {
      true: {},
      false: {},
    },
  },

  compoundVariants: [
    {
      variants: { size: 'sm', checked: true },
      style: { translate: `${switchWidth.sm - switchHeight.sm}px 0` },
    },
    {
      variants: { size: 'md', checked: true },
      style: { translate: `${switchWidth.md - switchHeight.md}px 0` },
    },
    {
      variants: { size: 'lg', checked: true },
      style: { translate: `${switchWidth.lg - switchHeight.lg}px 0` },
    },
  ],

  defaultVariants: { size: 'md', checked: false },
});
