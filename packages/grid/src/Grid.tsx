import { type ComponentProps, type CSSProperties, type ForwardedRef, forwardRef, useMemo } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './Grid.css';

export interface GridProps extends ComponentProps<'div'> {
  templateColumns?: CSSProperties['gridTemplateColumns'];
  templateRows?: CSSProperties['gridTemplateRows'];
  templateAreas?: CSSProperties['gridTemplateAreas'];
  gap?: CSSProperties['gap'];
  autoFlow?: CSSProperties['gridAutoFlow'];
  autoRows?: CSSProperties['gridAutoRows'];
  autoColumns?: CSSProperties['gridAutoColumns'];
  inline?: boolean;
  style?: CSSProperties;
  asChild?: boolean;
}

export const Grid = forwardRef(function Grid(
  {
    templateColumns,
    templateRows,
    templateAreas,
    autoFlow,
    autoRows,
    autoColumns,
    gap,
    inline,
    style,
    className,
    children,
    asChild,
    ...props
  }: GridProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Component = asChild ? Slot : 'div';

  const gridStyle = {
    '--grid-display': inline ? 'inline-grid' : 'grid',
    '--grid-template-columns': templateColumns ?? 'auto',
    '--grid-template-rows': templateRows ?? 'auto',
    '--grid-template-areas': templateAreas ?? 'auto',
    '--grid-auto-columns': autoColumns ?? 'auto',
    '--grid-auto-rows': autoRows ?? 'auto',
    '--grid-auto-flow': autoFlow ?? 'row',
    '--grid-gap': gap ?? '0',
    ...style,
  } as React.CSSProperties;

  return (
    <Component ref={ref} className={cx(styles.grid, className)} style={gridStyle} {...props}>
      {children}
    </Component>
  );
});

Grid.displayName = 'Grid';

export interface GridItemProps extends ComponentProps<'div'> {
  column?: CSSProperties['gridColumn'];
  row?: CSSProperties['gridRow'];
  area?: CSSProperties['gridArea'];
  justifySelf?: CSSProperties['justifySelf'];
  alignSelf?: CSSProperties['alignSelf'];
  colSpan?: number;
  rowSpan?: number;
  colStart?: number | 'auto';
  colEnd?: number | 'auto';
  rowStart?: number | 'auto';
  rowEnd?: number | 'auto';
  style?: CSSProperties;
  asChild?: boolean;
}

export const GridItem = forwardRef(function GridItem(
  {
    column,
    row,
    area,
    justifySelf,
    alignSelf,
    colSpan,
    rowSpan,
    colStart,
    colEnd,
    rowStart,
    rowEnd,
    style,
    className,
    asChild,
    children,
    ...props
  }: GridItemProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Component = asChild ? Slot : 'div';

  const getGridColumn = useMemo(() => {
    if (column) return column;
    if (colSpan) return `span ${colSpan}`;
    if (colStart || colEnd) return `${colStart ?? 'auto'} / ${colEnd ?? 'auto'}`;
    return undefined;
  }, [column, colSpan, colStart, colEnd]);

  const getGridRow = useMemo(() => {
    if (row) return row;
    if (rowSpan) return `span ${rowSpan}`;
    if (rowStart || rowEnd) return `${rowStart ?? 'auto'} / ${rowEnd ?? 'auto'}`;
    return undefined;
  }, [row, rowSpan, rowStart, rowEnd]);

  const gridItemClasses = cx(
    styles.gridItem,
    {
      [styles.gridItemColumn]: getGridColumn,
      [styles.gridItemRow]: getGridRow,
      [styles.gridItemArea]: area,
    },
    className,
  );

  const gridItemStyle = {
    '--grid-area': area,
    '--grid-column': getGridColumn,
    '--grid-row': getGridRow,
    '--grid-justify-self': justifySelf,
    '--grid-align-self': alignSelf,
    ...style,
  };

  return (
    <Component ref={ref} className={gridItemClasses} style={gridItemStyle} {...props}>
      {children}
    </Component>
  );
});

GridItem.displayName = 'GridItem';

const Root = Grid;
const Item = GridItem;

export { Root, Item };
