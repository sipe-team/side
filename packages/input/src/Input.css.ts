import { vars } from '@sipe-team/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import type { InputFontSize, InputValidation } from './Input';

export const defaultFontSize: InputFontSize = 16;
export const defaultValidation: InputValidation = 'default';

/** Positioning context only — no chrome, so clicks can't land in a dead gap. */
export const inputWrapper = style({
  position: 'relative',
  display: 'block',
  flex: 1,
  minWidth: 0,
});

export const inputField = recipe({
  base: {
    boxSizing: 'border-box',
    display: 'block',
    width: '100%',
    margin: 0,
    fontStyle: 'normal',
    textAlign: 'start',
    color: vars.color.foreground.default,
    fontFamily: vars.typography.fontFamily,
    fontWeight: vars.typography.fontWeight.regular,
    backgroundColor: 'transparent',
    borderRadius: vars.radius.component.md,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: vars.color.border.default,
    paddingBlock: vars.spacing.component.sm,
    paddingInline: vars.spacing.component.md,
    outline: 'none',

    selectors: {
      '&::-webkit-search-cancel-button': {
        appearance: 'none',
      },
      '&::placeholder': {
        color: vars.color.foreground.muted,
      },
      '&:hover:not(:disabled):not(:focus):not(:read-only)': {
        borderColor: vars.color.border.strong,
      },
      '&:focus': {
        borderColor: vars.color.border.focus,
        outline: `2px solid ${vars.color.border.focus}`,
        outlineOffset: '-1px',
      },
      '&:read-only:not(:disabled)': {
        backgroundColor: vars.color.background.muted,
        borderColor: vars.color.border.default,
        color: vars.color.foreground.default,
        cursor: 'default',
      },
      '&:disabled': {
        backgroundColor: vars.color.background.muted,
        borderColor: vars.color.border.default,
        color: vars.color.foreground.subtle,
        cursor: 'not-allowed',
      },
      '&:where(:autofill, [data-com-onepassword-filled])': {
        backgroundClip: 'text',
        WebkitTextFillColor: vars.color.foreground.default,
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
    validation: {
      default: {},
      error: {
        borderColor: vars.color.status.danger.border,
        selectors: {
          '&:hover:not(:disabled):not(:focus):not(:read-only)': {
            borderColor: vars.color.status.danger.border,
          },
          '&:disabled': {
            borderColor: vars.color.border.default,
          },
        },
      },
      success: {
        borderColor: vars.color.status.success.border,
        selectors: {
          '&:hover:not(:disabled):not(:focus):not(:read-only)': {
            borderColor: vars.color.status.success.border,
          },
          '&:disabled': {
            borderColor: vars.color.border.default,
          },
        },
      },
    },
  },
  defaultVariants: {
    fontSize: defaultFontSize,
    validation: defaultValidation,
  },
});

/** Reserve trailing space so text/caret never sit under the absolute action. */
export const inputFieldWithAction = style({
  paddingInlineEnd: `calc(${vars.spacing.component.xl} + ${vars.spacing.component.md} + ${vars.spacing.component.xs})`,
});

export const inputAction = style({
  all: 'unset',
  boxSizing: 'border-box',
  position: 'absolute',
  top: '50%',
  right: vars.spacing.component.md,
  transform: 'translateY(-50%)',
  zIndex: 1,
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
