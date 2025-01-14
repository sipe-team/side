import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import * as Grid from './Grid';

describe('Grid', () => {
  it('should have display grid property by default', () => {
    render(
      <Grid.Root data-testid="grid-container">
        <div>item 1</div>
        <div>item 2</div>
      </Grid.Root>,
    );

    const gridContainer = screen.getByTestId('grid-container');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveStyle({ display: 'grid' });
  });

  it('should apply additional className when provided', () => {
    const customClassName = faker.word.noun();
    render(
      <Grid.Root data-testid="grid-container" className={customClassName} />,
    );
    expect(screen.getByTestId('grid-container')).toHaveClass(customClassName);
  });

  describe('Grid Root Properties', () => {
    const gridProperties = [
      {
        prop: 'templateColumns',
        style: 'gridTemplateColumns',
        values: ['1fr 1fr', 'repeat(3, 1fr)', '100px auto'],
      },
      {
        prop: 'templateRows',
        style: 'gridTemplateRows',
        values: ['auto', 'repeat(2, 100px)', '1fr auto'],
      },
      {
        prop: 'templateAreas',
        style: 'gridTemplateAreas',
        values: ['"header header" "main sidebar" "footer footer"'],
      },
      {
        prop: 'gap',
        style: 'gap',
        values: ['10px', '1rem', '20px 10px'],
      },
      {
        prop: 'autoFlow',
        style: 'gridAutoFlow',
        values: ['row', 'column', 'row dense', 'column dense'],
      },
      {
        prop: 'alignItems',
        style: 'alignItems',
        values: ['start', 'end', 'center', 'stretch'],
      },
      {
        prop: 'justifyItems',
        style: 'justifyItems',
        values: ['start', 'end', 'center', 'stretch'],
      },
      {
        prop: 'alignContent',
        style: 'alignContent',
        values: ['start', 'end', 'center', 'space-between', 'space-around'],
      },
      {
        prop: 'justifyContent',
        style: 'justifyContent',
        values: ['start', 'end', 'center', 'space-between', 'space-around'],
      },
    ];

    for (const { prop, style, values } of gridProperties) {
      describe(prop, () => {
        it.each(values.map((value) => ({ [prop]: value })))(
          `should apply ${style} when ${prop} prop is $${prop}`,
          (propValue) => {
            render(
              <Grid.Root data-testid="grid-container" {...propValue}>
                <Grid.Item>item 1</Grid.Item>
              </Grid.Root>,
            );

            const gridContainer = screen.getByTestId('grid-container');
            expect(gridContainer).toHaveStyle({ [style]: propValue[prop] });
          },
        );
      });
    }
  });

  describe('Grid Item Properties', () => {
    const gridItemProperties = [
      {
        prop: 'column',
        style: 'gridColumn',
        values: ['1 / 3', 'span 2', 'auto'],
      },
      {
        prop: 'row',
        style: 'gridRow',
        values: ['1 / 3', 'span 2', 'auto'],
      },
      {
        prop: 'area',
        style: 'gridArea',
        values: ['header', 'main', 'footer'],
      },
      {
        prop: 'justifySelf',
        style: 'justifySelf',
        values: ['start', 'end', 'center', 'stretch'],
      },
      {
        prop: 'alignSelf',
        style: 'alignSelf',
        values: ['start', 'end', 'center', 'stretch'],
      },
      {
        prop: 'columnStart',
        style: 'gridColumnStart',
        values: ['1', '2', 'auto'],
      },
      {
        prop: 'columnEnd',
        style: 'gridColumnEnd',
        values: ['1', '2', 'auto'],
      },
      {
        prop: 'rowStart',
        style: 'gridRowStart',
        values: ['1', '2', 'auto'],
      },
      {
        prop: 'rowEnd',
        style: 'gridRowEnd',
        values: ['1', '2', 'auto'],
      },
    ];

    for (const { prop, style, values } of gridItemProperties) {
      describe(prop, () => {
        it.each(values.map((value) => ({ [prop]: value })))(
          `should apply ${style} when ${prop} prop is $${prop}`,
          (propValue) => {
            render(
              <Grid.Root>
                <Grid.Item data-testid="grid-item" {...propValue}>
                  item 1
                </Grid.Item>
              </Grid.Root>,
            );

            const gridItem = screen.getByTestId('grid-item');
            expect(gridItem).toHaveStyle({ [style]: propValue[prop] });
          },
        );
      });
    }
  });

  describe('style overrides', () => {
    it('should allow style prop to override default styles', () => {
      const customStyle = {
        backgroundColor: 'red',
        padding: '20px',
      };

      render(
        <Grid.Root data-testid="grid-container" style={customStyle}>
          <Grid.Item>item 1</Grid.Item>
        </Grid.Root>,
      );

      const gridContainer = screen.getByTestId('grid-container');
      expect(gridContainer).toHaveStyle(customStyle);
    });
  });

  describe('nested Grid components', () => {
    it('should render nested Grid components correctly', () => {
      render(
        <Grid.Root data-testid="parent-grid" templateColumns="1fr 1fr">
          <Grid.Item>
            <Grid.Root data-testid="child-grid" templateRows="1fr 1fr">
              <Grid.Item>nested item 1</Grid.Item>
              <Grid.Item>nested item 2</Grid.Item>
            </Grid.Root>
          </Grid.Item>
        </Grid.Root>,
      );

      const parentGrid = screen.getByTestId('parent-grid');
      const childGrid = screen.getByTestId('child-grid');

      expect(parentGrid).toHaveStyle({ '--grid-template-columns': '1fr 1fr' });
      expect(childGrid).toHaveStyle({ '--grid-template-rows': '1fr 1fr' });
    });
  });

  describe('polymorphic behavior', () => {
    it.each(['span', 'nav', 'button', 'input', 'label', 'div'])(
      'should render as %s element when asChild is true',
      (element) => {
        render(
          <Grid.Root data-testid="grid-container" asChild>
            {createElement(element)}
          </Grid.Root>,
        );

        const gridContainer = screen.getByTestId('grid-container');
        expect(gridContainer).toBeInTheDocument();
        expect(gridContainer.tagName.toLowerCase()).toBe(element);
      },
    );
  });
});
