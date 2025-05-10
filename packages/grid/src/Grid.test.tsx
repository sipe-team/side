import { faker } from '@faker-js/faker';
import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import * as Grid from './Grid';

describe('Grid', () => {
  it('should have display grid property by default', async () => {
    const screen = render(
      <Grid.Root data-testid="grid-container">
        <div>item 1</div>
        <div>item 2</div>
      </Grid.Root>,
    );

    const gridContainer = screen.getByTestId('grid-container');
    await expect.element(gridContainer).toBeInTheDocument();
    await expect.element(gridContainer).toHaveStyle({ display: 'grid' });
  });

  it('should apply additional className when provided', async () => {
    const customClassName = faker.word.noun();
    const screen = render(<Grid.Root data-testid="grid-container" className={customClassName} />);
    await expect.element(screen.getByTestId('grid-container')).toHaveClass(customClassName);
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
    ];

    for (const { prop, style, values } of gridProperties) {
      describe(prop, () => {
        it.each(values.map((value) => ({ [prop]: value })))(
          `should apply ${style} when ${prop} prop is $${prop}`,
          async (propValue) => {
            const screen = render(
              <Grid.Root data-testid="grid-container" {...propValue}>
                <Grid.Item>item 1</Grid.Item>
              </Grid.Root>,
            );

            const gridContainer = screen.getByTestId('grid-container');
            await expect.element(gridContainer).toHaveStyle({ [style]: propValue[prop] });
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
        prop: 'colSpan',
        style: 'gridColumn',
        values: [1, 2, 3],
        expectedValues: ['span 1', 'span 2', 'span 3'],
      },
      {
        prop: 'rowSpan',
        style: 'gridRow',
        values: [1, 2, 3],
        expectedValues: ['span 1', 'span 2', 'span 3'],
      },
      {
        prop: 'colStart',
        style: 'gridColumn',
        values: [1, 2, 3],
        expectedValues: ['1 / auto', '2 / auto', '3 / auto'],
      },
      {
        prop: 'colEnd',
        style: 'gridColumn',
        values: [1, 2, 3],
        expectedValues: ['auto / 1', 'auto / 2', 'auto / 3'],
      },
      {
        prop: 'rowStart',
        style: 'gridRow',
        values: [1, 2, 3],
        expectedValues: ['1 / auto', '2 / auto', '3 / auto'],
      },
      {
        prop: 'rowEnd',
        style: 'gridRow',
        values: [1, 2, 3],
        expectedValues: ['auto / 1', 'auto / 2', 'auto / 3'],
      },
    ];

    for (const { prop, style, values, expectedValues } of gridItemProperties) {
      describe(prop, () => {
        it.each(
          values.map((value, index) => ({
            [prop]: value,
            expectedValue: expectedValues?.[index] ?? value,
          })),
        )(`should apply ${style} when ${prop} prop is $${prop}`, async ({ [prop]: value, expectedValue }) => {
          const screen = render(
            <Grid.Root>
              <Grid.Item data-testid="grid-item" {...{ [prop]: value }}>
                item 1
              </Grid.Item>
            </Grid.Root>,
          );

          const gridItem = screen.getByTestId('grid-item');
          await expect.element(gridItem).toHaveStyle({ [style]: expectedValue });
        });
      });
    }
  });

  describe('style overrides', () => {
    it('should allow style prop to override default styles', async () => {
      const customStyle = {
        backgroundColor: 'red',
        padding: '20px',
      };

      const screen = render(
        <Grid.Root data-testid="grid-container" style={customStyle}>
          <Grid.Item>item 1</Grid.Item>
        </Grid.Root>,
      );

      const gridContainer = screen.getByTestId('grid-container');
      await expect.element(gridContainer).toHaveStyle(customStyle);
    });
  });

  describe('nested Grid components', () => {
    it('should render nested Grid components correctly', async () => {
      const screen = render(
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

      await expect.element(parentGrid).toHaveStyle({ '--grid-template-columns': '1fr 1fr' });
      await expect.element(childGrid).toHaveStyle({ '--grid-template-rows': '1fr 1fr' });
    });
  });

  describe('polymorphic behavior', () => {
    it.each(['span', 'nav', 'button', 'input', 'label', 'div'])(
      'should render as %s element when asChild is true',
      async (element) => {
        const screen = render(
          <Grid.Root data-testid="grid-container" asChild>
            {createElement(element)}
          </Grid.Root>,
        );

        const gridContainer = screen.getByTestId('grid-container');
        await expect.element(gridContainer).toBeInTheDocument();
        expect(gridContainer.selector.toLowerCase()).toBe(element);
      },
    );
  });
});
