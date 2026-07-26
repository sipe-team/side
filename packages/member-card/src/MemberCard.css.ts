import { vars } from '@sipe-team/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacing.component.md,
    borderRadius: vars.radius.component.lg,
    padding: vars.spacing.component.lg,
    minHeight: 270,
    boxSizing: 'border-box',
  },
  variants: {
    variant: {
      filled: {
        backgroundColor: vars.color.background.subtle,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: vars.color.border.default,
      },
      outline: {
        backgroundColor: vars.color.background.default,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: vars.color.border.strong,
      },
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

export const header = style({
  display: 'flex',
  alignItems: 'stretch',
  gap: vars.spacing.component.md,
});

export const avatar = style({
  flexShrink: 0,
});

export const info = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flex: 1,
  minWidth: 0,
  paddingBlock: vars.spacing.component.xs,
});

export const mainRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.component.sm,
});

export const name = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const links = style({
  display: 'flex',
  gap: vars.spacing.component.sm,
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const linkItem = style({
  display: 'inline-flex',
});

export const subRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.component.sm,
});

export const organizer = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.component.xs,
});

export const organizerMark = style({
  color: 'currentColor',
});

export const reviewSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.component.xs,
});
