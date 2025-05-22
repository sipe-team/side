export const INPUT_STYLES = {
  transition: {
    default: 'all 0.2s ease-in-out',
    fast: 'all 0.1s ease-in-out',
    slow: 'all 0.3s ease-in-out',
  },

  fontFamily: {
    default: 'inherit',
    monospace: 'ui-monospace, SFMono-Regular, Consolas, monospace',
  },

  lineHeight: {
    default: 1.5,
    tight: 1.25,
    loose: 1.75,
  },

  opacity: {
    disabled: 0.6,
    placeholder: 1,
    hover: 0.8,
  },

  zIndex: {
    base: 0,
    action: 1,
    focus: 2,
  },

  cursor: {
    default: 'text',
    pointer: 'pointer',
    notAllowed: 'not-allowed',
  },

  userSelect: {
    none: 'none',
    text: 'text',
    auto: 'auto',
  },

  boxShadow: {
    none: 'none',
    focus: '0 0 0 2px rgba(59, 130, 246, 0.1)',
    error: '0 0 0 2px rgba(239, 68, 68, 0.1)',
  },

  borderStyle: {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
  },

  display: {
    flex: 'flex',
    block: 'block',
    inlineBlock: 'inline-block',
    none: 'none',
  },

  position: {
    relative: 'relative',
    absolute: 'absolute',
    static: 'static',
  },

  flex: {
    alignItems: {
      center: 'center',
      start: 'flex-start',
      end: 'flex-end',
      stretch: 'stretch',
    },
    justifyContent: {
      center: 'center',
      start: 'flex-start',
      end: 'flex-end',
      between: 'space-between',
    },
  },

  webkit: {
    appearance: 'none',
    textSizeAdjust: 'none',
  },
} as const;

export type InputStyles = typeof INPUT_STYLES;
