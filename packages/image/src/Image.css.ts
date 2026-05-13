import { createVar, fallbackVar, style, styleVariants } from '@vanilla-extract/css';

export const widthVar = createVar();
export const heightVar = createVar();

export const sized = style({
  width: fallbackVar(widthVar, 'auto'),
  height: fallbackVar(heightVar, 'auto'),
});

export const fit = styleVariants({
  contain: { objectFit: 'contain' },
  cover: { objectFit: 'cover' },
  fill: { objectFit: 'fill' },
});

export const fill = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
});

export const hidden = style({
  visibility: 'hidden',
});
