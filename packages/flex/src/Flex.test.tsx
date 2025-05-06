import { faker } from '@faker-js/faker';
import { type CSSProperties, createElement } from 'react';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { Flex } from './Flex';

describe('Flex', () => {
  it('flex 컴포넌트는 props를 전달하지 않으면 flex의 기본값으로 설정된다.', async () => {
    const screen = render(
      <Flex data-testid="flex-container">
        <div>item 1</div>
        <div>item 2</div>
      </Flex>,
    );

    const flexContainer = screen.getByTestId('flex-container');
    await expect.element(flexContainer).toBeInTheDocument();
    await expect.element(flexContainer).toHaveStyle({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'normal',
      justifyContent: 'normal',
      flexWrap: 'nowrap',
    });
  });

  it('flex 컴포넌트에 className을 주입하면 추가로 전달한다.', async () => {
    const customClassName = faker.word.noun();
    const screen = render(<Flex data-testid="flex-container" className={customClassName} />);
    await expect.element(screen.getByTestId('flex-container')).toHaveClass(customClassName);
  });

  describe('flex 속성', () => {
    describe('justify', () => {
      it.each([
        { justifyContent: 'flex-start' },
        { justifyContent: 'flex-end' },
        { justifyContent: 'center' },
        { justifyContent: 'space-between' },
        { justifyContent: 'space-around' },
        { justifyContent: 'space-evenly' },
      ] satisfies Array<{ justifyContent: CSSProperties['justifyContent'] }>)(
        'flex의 justify prop에 $justifyContent 속성을 주입하면 해당 속성을 적용한다.',
        async ({ justifyContent }) => {
          const screen = render(
            <Flex data-testid="flex-container" justify={justifyContent}>
              <div>item 1</div>
              <div>item 2</div>
            </Flex>,
          );

          const flexContainer = screen.getByTestId('flex-container');
          await expect.element(flexContainer).toHaveStyle({ justifyContent });
        },
      );
    });

    describe('align', () => {
      it.each([
        { alignItems: 'flex-start' },
        { alignItems: 'flex-end' },
        { alignItems: 'center' },
        { alignItems: 'baseline' },
        { alignItems: 'stretch' },
      ] satisfies Array<{ alignItems: CSSProperties['alignItems'] }>)(
        'flex의 align prop에 $alignItems 속성을 주입하면 해당 속성을 적용한다.',
        async ({ alignItems }) => {
          const screen = render(
            <Flex data-testid="flex-container" align={alignItems}>
              <div>item 1</div>
              <div>item 2</div>
            </Flex>,
          );

          const flexContainer = screen.getByTestId('flex-container');
          await expect.element(flexContainer).toHaveStyle({ alignItems });
        },
      );
    });

    describe('wrap', () => {
      it.each([{ wrap: 'wrap' }, { wrap: 'nowrap' }, { wrap: 'wrap-reverse' }] satisfies Array<{
        wrap: CSSProperties['flexWrap'];
      }>)('flex의 wrap prop에 $wrap 속성을 주입하면 해당 속성을 적용한다.', async ({ wrap }) => {
        const screen = render(
          <Flex data-testid="flex-container" wrap={wrap}>
            <div>item 1</div>
            <div>item 2</div>
          </Flex>,
        );

        const flexContainer = screen.getByTestId('flex-container');
        await expect.element(flexContainer).toHaveStyle({ flexWrap: wrap });
      });
    });

    describe('direction', () => {
      it.each([
        { direction: 'row' },
        { direction: 'column' },
        { direction: 'row-reverse' },
        { direction: 'column-reverse' },
        { direction: 'column-reverse' },
      ] satisfies Array<{ direction: CSSProperties['flexDirection'] }>)(
        'flex의 direction prop에 $direction 속성을 주입하면 해당 속성을 적용한다.',
        async ({ direction }) => {
          const screen = render(
            <Flex data-testid="flex-container" direction={direction}>
              <div>item 1</div>
              <div>item 2</div>
            </Flex>,
          );

          const flexContainer = screen.getByTestId('flex-container');
          await expect.element(flexContainer).toHaveStyle({ flexDirection: direction });
        },
      );

      describe('basis', () => {
        it.each([
          { basis: '100px' },
          { basis: '100%' },
          { basis: 'auto' },
          { basis: '10rem' },
          { basis: 'content' },
        ] satisfies Array<{
          basis: CSSProperties['flexBasis'];
        }>)('flex의 basis prop에 $basis 속성을 주입하면 해당 속성을 적용한다.', async ({ basis }) => {
          const screen = render(
            <Flex data-testid="flex-container" basis={basis}>
              <div>item 1</div>
              <div>item 2</div>
            </Flex>,
          );

          const flexContainer = screen.getByTestId('flex-container');
          await expect.element(flexContainer).toHaveStyle({ flexBasis: basis });
        });
      });

      describe('grow', () => {
        it.each([{ grow: 0 }, { grow: 1 }, { grow: 2 }] satisfies Array<{
          grow: CSSProperties['flexGrow'];
        }>)('flex의 grow prop에 $grow 속성을 주입하면 해당 속성을 적용한다.', async ({ grow }) => {
          const screen = render(
            <Flex data-testid="flex-container" grow={grow}>
              <div>item 1</div>
              <div>item 2</div>
            </Flex>,
          );

          const flexContainer = screen.getByTestId('flex-container');
          await expect.element(flexContainer).toHaveStyle({ flexGrow: grow });
        });
      });

      describe('shrink', () => {
        it.each([{ shrink: 0 }, { shrink: 1 }, { shrink: 2 }] satisfies Array<{
          shrink: CSSProperties['flexShrink'];
        }>)('flex의 shrink prop에 $shrink 속성을 주입하면 해당 속성을 적용한다.', async ({ shrink }) => {
          const screen = render(
            <Flex data-testid="flex-container" shrink={shrink}>
              <div>item 1</div>
              <div>item 2</div>
            </Flex>,
          );

          const flexContainer = screen.getByTestId('flex-container');
          await expect.element(flexContainer).toHaveStyle({ flexShrink: shrink });
        });
      });

      describe('inline', () => {
        it('flex의 inline prop에 true 속성을 주입하면 해당 속성을 적용한다.', async () => {
          const screen = render(
            <Flex data-testid="flex-container" inline>
              <div>item 1</div>
              <div>item 2</div>
            </Flex>,
          );

          const flexContainer = screen.getByTestId('flex-container');
          await expect.element(flexContainer).toHaveStyle({ display: 'inline-flex' });
        });
      });

      describe('gap', () => {
        it.each([{ gap: '10px' }, { gap: '1rem' }] satisfies Array<{
          gap: CSSProperties['gap'];
        }>)('flex의 gap prop에 $gap 속성을 주입하면 해당 속성을 적용한다.', async ({ gap }) => {
          const screen = render(
            <Flex data-testid="flex-container" gap={gap}>
              <div>item 1</div>
              <div>item 2</div>
            </Flex>,
          );

          const flexContainer = screen.getByTestId('flex-container');
          await expect.element(flexContainer).toHaveStyle({ gap });
        });
      });
    });
  });

  describe('style', () => {
    it.each([
      { style: { justifyContent: 'flex-start' } },
      { style: { alignItems: 'center' } },
      { style: { flexWrap: 'wrap' } },
      { style: { flexDirection: 'column' } },
    ] satisfies Array<{ style: CSSProperties }>)(
      'flex의 style prop에 $style 속성을 주입하면 해당 속성을 적용한다.',
      async ({ style }) => {
        const screen = render(
          <Flex data-testid="flex-container" style={style}>
            <div>item 1</div>
            <div>item 2</div>
          </Flex>,
        );

        const flexContainer = screen.getByTestId('flex-container');
        await expect.element(flexContainer).toHaveStyle(style);
      },
    );
  });

  describe('polymorphic', () => {
    it.each(['span', 'nav', 'button', 'input', 'label', 'div'])(
      'flex의 asChild prop에 true 속성을 주입하면 자식으로 %s 엘리먼트가 전달되면 해당 엘리먼트의 태그로 렌더링된다',
      async (element) => {
        const screen = render(
          <Flex data-testid="flex-container" asChild>
            {createElement(element)}
          </Flex>,
        );

        const flexContainer = screen.getByTestId('flex-container');

        await expect.element(flexContainer).toBeInTheDocument();
        expect(flexContainer.selector.toLowerCase()).toBe(element);
      },
    );
  });
});
