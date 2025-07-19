import { style } from '@vanilla-extract/css';

export const grid = style({
  display: 'var(--grid-display)',
  gridTemplateColumns: 'var(--grid-template-columns)',
  gridTemplateRows: 'var(--grid-template-rows)',
  gridTemplateAreas: 'var(--grid-template-areas)',
  gap: 'var(--grid-gap)',
  gridAutoFlow: 'var(--grid-auto-flow)',
  alignItems: 'var(--grid-align-items)',
  justifyItems: 'var(--grid-justify-items)',
  alignContent: 'var(--grid-align-content)',
  justifyContent: 'var(--grid-justify-content)',
});

export const gridItem = style({
  alignSelf: 'var(--grid-align-self)',
  justifySelf: 'var(--grid-justify-self)',
});

export const gridItemArea = style({
  gridArea: 'var(--grid-area)',
});

export const gridItemColumn = style({
  gridColumn: 'var(--grid-column)',
});

export const gridItemRow = style({
  gridRow: 'var(--grid-row)',
});
