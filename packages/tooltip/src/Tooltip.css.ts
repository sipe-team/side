import { style, styleVariants } from '@vanilla-extract/css';

export const tooltip = style({
  position: 'fixed',
  backgroundColor: '#000000',
  color: '#ffffff',
  padding: '8px 12px',
  borderRadius: '8px',
  fontSize: '12px',
  lineHeight: 1.5,
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  maxWidth: '250px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  zIndex: 1000,
  opacity: 0,
  transform: 'scale(0.95)',
  transition: 'opacity 0.3s ease, transform 0.3s ease',
  pointerEvents: 'none',
  selectors: {
    '&.visible': {
      opacity: 1,
      transform: 'scale(1)',
      pointerEvents: 'auto',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
});

export const placement = styleVariants({
  'top-left': {
    selectors: {
      '&::after': {
        bottom: '-6px',
        left: '8px',
        borderWidth: '6px 6px 0 6px',
        borderColor: '#000000 transparent transparent transparent',
      },
    },
  },
  'top-right': {
    selectors: {
      '&::after': {
        bottom: '-6px',
        right: '8px',
        borderWidth: '6px 6px 0 6px',
        borderColor: '#000000 transparent transparent transparent',
      },
    },
  },
  'bottom-left': {
    selectors: {
      '&::after': {
        top: '-6px',
        left: '8px',
        borderWidth: '0 6px 6px 6px',
        borderColor: 'transparent transparent #000000 transparent',
      },
    },
  },
  'bottom-right': {
    selectors: {
      '&::after': {
        top: '-6px',
        right: '8px',
        borderWidth: '0 6px 6px 6px',
        borderColor: 'transparent transparent #000000 transparent',
      },
    },
  },
  top: {
    selectors: {
      '&::after': {
        bottom: '-6px',
        left: '50%',
        transform: 'translateX(-50%)',
        borderWidth: '6px 6px 0 6px',
        borderColor: '#000000 transparent transparent transparent',
      },
    },
  },
  bottom: {
    selectors: {
      '&::after': {
        top: '-6px',
        left: '50%',
        transform: 'translateX(-50%)',
        borderWidth: '0 6px 6px 6px',
        borderColor: 'transparent transparent #000000 transparent',
      },
    },
  },
  left: {
    selectors: {
      '&::after': {
        right: '-6px',
        top: '50%',
        transform: 'translateY(-50%)',
        borderWidth: '6px 0 6px 6px',
        borderColor: 'transparent transparent transparent #000000',
      },
    },
  },
  right: {
    selectors: {
      '&::after': {
        left: '-6px',
        top: '50%',
        transform: 'translateY(-50%)',
        borderWidth: '6px 6px 6px 0',
        borderColor: 'transparent #000000 transparent transparent',
      },
    },
  },
});

export const button = style({
  padding: '8px 12px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: '#f9f9f9',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#e6e6e6',
  },
});
