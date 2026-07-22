import { vars } from '@sipe-team/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import type { InputFontSize } from './Input';

export const defaultFontSize: InputFontSize = 16;

export const inputWrapper = recipe({
  base: {
    position: 'relative',
    display: 'block',
    flex: 1,
    fontStyle: 'normal',
    textAlign: 'start',
    color: vars.color.foreground.default,
    fontFamily: vars.typography.fontFamily,
    fontWeight: vars.typography.fontWeight.regular,
    borderRadius: vars.radius.component.md,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: vars.color.border.default,
    backgroundColor: 'transparent',

    '@supports': {
      'selector(:has(*))': {
        selectors: {
          '&:where(:hover:not(:has(input:disabled, input:focus)))': {
            borderColor: vars.color.border.strong,
          },
          '&:where(:has(input:focus))': {
            borderColor: vars.color.border.focus,
            outline: `2px solid ${vars.color.border.focus}`,
            outlineOffset: '-1px',
          },
          '&:where(:has(input:disabled))': {
            backgroundColor: vars.color.background.muted,
            borderColor: vars.color.border.default,
          },
        },
      },
      'not selector(:has(*))': {
        selectors: {
          '&:where(:hover:not(:focus-within))': {
            borderColor: vars.color.border.strong,
          },
          '&:where(:focus-within)': {
            borderColor: vars.color.border.focus,
            outline: `2px solid ${vars.color.border.focus}`,
            outlineOffset: '-1px',
          },
        },
      },
    },
  },
  variants: {
    fontSize: {
      12: { fontSize: vars.typography.fontSize['050'] },
      14: { fontSize: vars.typography.fontSize['100'] },
      16: { fontSize: vars.typography.fontSize['200'] },
      18: { fontSize: vars.typography.fontSize['300'] },
      20: { fontSize: vars.typography.fontSize['400'] },
      24: { fontSize: vars.typography.fontSize['500'] },
      28: { fontSize: vars.typography.fontSize['600'] },
      32: { fontSize: vars.typography.fontSize['700'] },
      36: { fontSize: vars.typography.fontSize['800'] },
      48: { fontSize: vars.typography.fontSize['900'] },
    },
  },
  defaultVariants: {
    fontSize: defaultFontSize,
  },
});

export const inputElement = style({
  boxSizing: 'border-box',
  display: 'block',
  width: '100%',
  textAlign: 'inherit',
  color: vars.color.foreground.default,
  fontFamily: 'inherit',
  outline: 'none',
  border: 'none',
  backgroundColor: 'transparent',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  margin: 0,
  paddingBlock: vars.spacing.component.sm,
  paddingInline: vars.spacing.component.md,

  selectors: {
    '&::-webkit-search-cancel-button': {
      appearance: 'none',
    },
    '&::placeholder': {
      color: vars.color.foreground.muted,
    },
  },

  '@supports': {
    'selector(:has(*))': {
      selectors: {
        '&:where(:autofill, [data-com-onepassword-filled])': {
          backgroundClip: 'text',
          WebkitTextFillColor: vars.color.foreground.default,
        },
        '&:where(:disabled)': {
          backgroundColor: 'transparent',
          color: vars.color.foreground.subtle,
          cursor: 'not-allowed',
        },
      },
    },
  },
});

/** Reserve trailing space so text/caret never sit under the absolute action. */
export const inputElementWithAction = style({
  paddingInlineEnd: `calc(${vars.spacing.component.xl} + ${vars.spacing.component.md} + ${vars.spacing.component.xs})`,
});

export const inputAction = style({
  all: 'unset',
  boxSizing: 'border-box',
  position: 'absolute',
  top: '50%',
  right: vars.spacing.component.md,
  transform: 'translateY(-50%)',
  width: vars.spacing.component.xl,
  height: vars.spacing.component.xl,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: vars.color.foreground.subtle,
  borderRadius: vars.radius.component.md,
  cursor: 'pointer',
  transition: 'color 0.15s ease, background-color 0.15s ease',

  selectors: {
    '&:hover': {
      color: vars.color.foreground.default,
      backgroundColor: vars.color.background.muted,
    },
    '&:active': {
      color: vars.color.foreground.default,
      backgroundColor: vars.color.background.subtle,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.border.focus}`,
      outlineOffset: '3px',
    },
  },
});
