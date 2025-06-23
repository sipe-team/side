import { color } from '@sipe-team/tokens';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { SWITCH_SIZES, SwitchSize } from './constants/size';

export const wrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  position: 'relative',

  ':focus-within': {
    outline: `2px solid ${color.blue500}`,
    outlineOffset: '2px',
    borderRadius: '4px',
  },

  selectors: {
    '&[data-disabled="true"]': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
});

export const input = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

export const track = recipe({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '100px',
    backgroundColor: color.gray300,
    transition: 'all 150ms ease-in-out',
    cursor: 'pointer',

    ':focus-visible': {
      outline: `2px solid ${color.blue500}`,
      outlineOffset: '2px',
    },

    selectors: {
      '&[data-disabled="true"]': {
        cursor: 'not-allowed',
        backgroundColor: color.gray200,
      },
      '&[data-checked="true"]': {
        backgroundColor: color.blue500,
      },
      '&[data-checked="true"][data-disabled="true"]': {
        backgroundColor: color.blue300,
      },
    },
  },
  variants: {
    size: {
      [SwitchSize.sm]: {
        width: `${SWITCH_SIZES[SwitchSize.sm].width}px`,
        height: `${SWITCH_SIZES[SwitchSize.sm].height}px`,
        padding: `${SWITCH_SIZES[SwitchSize.sm].gap}px`,
      },
      [SwitchSize.md]: {
        width: `${SWITCH_SIZES[SwitchSize.md].width}px`,
        height: `${SWITCH_SIZES[SwitchSize.md].height}px`,
        padding: `${SWITCH_SIZES[SwitchSize.md].gap}px`,
      },
      [SwitchSize.lg]: {
        width: `${SWITCH_SIZES[SwitchSize.lg].width}px`,
        height: `${SWITCH_SIZES[SwitchSize.lg].height}px`,
        padding: `${SWITCH_SIZES[SwitchSize.lg].gap}px`,
      },
    },
  },
  defaultVariants: {
    size: SwitchSize.md,
  },
});

export const thumb = recipe({
  base: {
    display: 'block',
    backgroundColor: color.white,
    transition: 'transform 150ms ease-in-out',
    boxShadow: `0px 2px 4px ${color.gray900}1A, 0px 0px 1px ${color.gray900}4D`,

    selectors: {
      '[data-checked="true"] &': {
        transform: 'translateX(var(--switch-translate-distance))',
      },
    },
  },
  variants: {
    size: {
      [SwitchSize.sm]: {
        width: `${SWITCH_SIZES[SwitchSize.sm].thumbSize}px`,
        height: `${SWITCH_SIZES[SwitchSize.sm].thumbSize}px`,
        borderRadius: `${SWITCH_SIZES[SwitchSize.sm].width - SWITCH_SIZES[SwitchSize.sm].gap}px`,
      },
      [SwitchSize.md]: {
        width: `${SWITCH_SIZES[SwitchSize.md].thumbSize}px`,
        height: `${SWITCH_SIZES[SwitchSize.md].thumbSize}px`,
        borderRadius: `${SWITCH_SIZES[SwitchSize.md].width - SWITCH_SIZES[SwitchSize.md].gap}px`,
      },
      [SwitchSize.lg]: {
        width: `${SWITCH_SIZES[SwitchSize.lg].thumbSize}px`,
        height: `${SWITCH_SIZES[SwitchSize.lg].thumbSize}px`,
        borderRadius: `${SWITCH_SIZES[SwitchSize.lg].width - SWITCH_SIZES[SwitchSize.lg].gap}px`,
      },
    },
  },
  defaultVariants: {
    size: SwitchSize.md,
  },
});

export const label = style({
  marginLeft: '8px',
  fontSize: '14px',
  color: color.gray900,
  cursor: 'pointer',
  userSelect: 'none',

  selectors: {
    '[data-disabled="true"] &': {
      color: color.gray400,
      cursor: 'not-allowed',
    },
  },
});
