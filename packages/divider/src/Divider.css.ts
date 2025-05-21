import { style, styleVariants } from '@vanilla-extract/css';

export const divider = style({
  border: 0,
  margin: 0,
  flexShrink: 0,
  backgroundColor: 'black',
});

export const orientation = styleVariants({
  horizontal: {
    width: '100%',
    height: '1px',
  },
  vertical: {
    width: '1px',
    height: '100%',
  },
});
