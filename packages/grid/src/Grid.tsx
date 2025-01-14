import { Slot } from '@radix-ui/react-slot';
import { clsx as cx } from 'clsx';
import {
  type CSSProperties,
  type ComponentProps,
  type ForwardedRef,
  forwardRef,
} from 'react';
import styles from './Grid.module.css';

export interface GridProps extends ComponentProps<'div'> {
  templateColumns?: CSSProperties['gridTemplateColumns'];
  templateRows?: CSSProperties['gridTemplateRows'];
  templateAreas?: CSSProperties['gridTemplateAreas'];
  gap?: CSSProperties['gap'];
  rowGap?: CSSProperties['rowGap'];
  columnGap?: CSSProperties['columnGap'];
  autoFlow?: CSSProperties['gridAutoFlow'];
  autoRows?: CSSProperties['gridAutoRows'];
  autoColumns?: CSSProperties['gridAutoColumns'];
  alignItems?: CSSProperties['alignItems'];
  justifyItems?: CSSProperties['justifyItems'];
  alignContent?: CSSProperties['alignContent'];
  justifyContent?: CSSProperties['justifyContent'];
  style?: CSSProperties;
  asChild?: boolean;
}

export const Grid = forwardRef(function Grid(
  {
    templateColumns,
    templateRows,
    templateAreas,
    gap,
    autoFlow,
    alignItems,
    justifyItems,
    alignContent,
    justifyContent,
    style,
    className,
    children,
    asChild,
    ...props
  }: GridProps,
  ref: ForwardedRef<any>,
) {
  const Component = asChild ? Slot : 'div';

  const gridStyle = {
    '--grid-template-columns': templateColumns,
    '--grid-template-rows': templateRows,
    '--grid-template-areas': templateAreas,
    '--grid-gap': gap,
    '--grid-auto-flow': autoFlow,
    '--grid-align-items': alignItems,
    '--grid-justify-items': justifyItems,
    '--grid-align-content': alignContent,
    '--grid-justify-content': justifyContent,
    ...style,
  } as React.CSSProperties;

  return (
    <Component
      ref={ref}
      className={cx(styles.grid, className)}
      style={gridStyle}
      {...props}
    >
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
  columnStart?: CSSProperties['gridColumnStart'];
  columnEnd?: CSSProperties['gridColumnEnd'];
  rowStart?: CSSProperties['gridRowStart'];
  rowEnd?: CSSProperties['gridRowEnd'];
  style?: CSSProperties;
  asChild?: boolean;
}

export const GridItem = forwardRef(function GridItem(
  {
    children,
    column,
    row,
    area,
    justifySelf,
    alignSelf,
    columnStart,
    columnEnd,
    rowStart,
    rowEnd,
    style,
    className,
    asChild,
    ...props
  }: GridItemProps,
  ref: ForwardedRef<any>,
) {
  const Component = asChild ? Slot : 'div';

  const gridItemStyle = {
    '--grid-column': column,
    '--grid-row': row,
    '--grid-area': area,
    '--grid-justify-self': justifySelf,
    '--grid-align-self': alignSelf,
    '--grid-column-start': columnStart,
    '--grid-column-end': columnEnd,
    '--grid-row-start': rowStart,
    '--grid-row-end': rowEnd,
    ...style,
  } as React.CSSProperties;

  return (
    <Component
      ref={ref}
      className={cx(styles['grid-item'], className)}
      style={gridItemStyle}
      {...props}
    >
      {children}
    </Component>
  );
});

GridItem.displayName = 'GridItem';

const Root = Grid;
const Item = GridItem;

export { Root, Item };
