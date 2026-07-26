import { vars } from '@sipe-team/tokens';

import { style, styleVariants } from '@vanilla-extract/css';

export const link = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.foreground.default,
  textDecoration: 'none',
  transition: 'color 150ms ease-in-out',
  ':hover': {
    color: vars.color.accent.default,
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.border.focus}`,
    outlineOffset: 2,
    borderRadius: vars.radius.component.sm,
  },
});

export const icon = style({
  color: 'inherit',
  display: 'block',
});

export const size = styleVariants({
  sm: {
    width: 18,
    height: 18,
  },
  md: {
    width: 24,
    height: 24,
  },
});
