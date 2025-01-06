import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import type { CSSProperties } from 'react';
import { describe, expect, it } from 'vitest';
import { Flex } from './Flex';

describe('Flex', () => {
  it('flex 컴포넌트는 기본적으로 flex 속성을 가지고 있다.', () => {
    render(
      <Flex data-testid="flex-container">
        <div>item 1</div>
        <div>item 2</div>
      </Flex>,
    );

    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toBeInTheDocument();
    expect(flexContainer).toHaveStyle({ display: 'flex' });
  });

  it('flex 컴포넌트에 className을 주입하면 추가로 전달한다.', () => {
    const customClassName = faker.word.noun();
    render(<Flex data-testid="flex-container" className={customClassName} />);
    expect(screen.getByTestId('flex-container')).toHaveClass(customClassName);
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
        ({ justifyContent }) => {
          render(
            <Flex data-testid="flex-container" justify={justifyContent}>
              <div>item 1</div>
              <div>item 2</div>
            </Flex>,
          );

          const flexContainer = screen.getByTestId('flex-container');
          expect(flexContainer).toHaveStyle({ justifyContent });
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
        ({ alignItems }) => {
          render(
            <Flex data-testid="flex-container" align={alignItems}>
              <div>item 1</div>
              <div>item 2</div>
            </Flex>,
          );

          const flexContainer = screen.getByTestId('flex-container');
          expect(flexContainer).toHaveStyle({ alignItems });
        },
      );
    });

    describe('wrap', () => {
      it.each([
        { wrap: 'wrap' },
        { wrap: 'nowrap' },
        { wrap: 'wrap-reverse' },
      ] satisfies Array<{ wrap: CSSProperties['flexWrap'] }>)(
        'flex의 wrap prop에 $wrap 속성을 주입하면 해당 속성을 적용한다.',
        ({ wrap }) => {
          render(
            <Flex data-testid="flex-container" wrap={wrap}>
              <div>item 1</div>
              <div>item 2</div>
            </Flex>,
          );

          const flexContainer = screen.getByTestId('flex-container');
          expect(flexContainer).toHaveStyle({ flexWrap: wrap });
        },
      );
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
        ({ direction }) => {
          render(
            <Flex data-testid="flex-container" direction={direction}>
              <div>item 1</div>
              <div>item 2</div>
            </Flex>,
          );

          const flexContainer = screen.getByTestId('flex-container');
          expect(flexContainer).toHaveStyle({ flexDirection: direction });
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
        }>)(
          'flex의 basis prop에 $basis 속성을 주입하면 해당 속성을 적용한다.',
          ({ basis }) => {
            render(
              <Flex data-testid="flex-container" basis={basis}>
                <div>item 1</div>
                <div>item 2</div>
              </Flex>,
            );

            const flexContainer = screen.getByTestId('flex-container');
            expect(flexContainer).toHaveStyle({ flexBasis: basis });
          },
        );
      });

      describe('grow', () => {
        it.each([{ grow: 0 }, { grow: 1 }, { grow: 2 }] satisfies Array<{
          grow: CSSProperties['flexGrow'];
        }>)(
          'flex의 grow prop에 $grow 속성을 주입하면 해당 속성을 적용한다.',
          ({ grow }) => {
            render(
              <Flex data-testid="flex-container" grow={grow}>
                <div>item 1</div>
                <div>item 2</div>
              </Flex>,
            );

            const flexContainer = screen.getByTestId('flex-container');
            expect(flexContainer).toHaveStyle({ flexGrow: grow });
          },
        );
      });

      describe('shrink', () => {
        it.each([{ shrink: 0 }, { shrink: 1 }, { shrink: 2 }] satisfies Array<{
          shrink: CSSProperties['flexShrink'];
        }>)(
          'flex의 shrink prop에 $shrink 속성을 주입하면 해당 속성을 적용한다.',
          ({ shrink }) => {
            render(
              <Flex data-testid="flex-container" shrink={shrink}>
                <div>item 1</div>
                <div>item 2</div>
              </Flex>,
            );

            const flexContainer = screen.getByTestId('flex-container');
            expect(flexContainer).toHaveStyle({ flexShrink: shrink });
          },
        );
      });

      describe('inline', () => {
        it('flex의 inline prop에 true 속성을 주입하면 해당 속성을 적용한다.', () => {
          render(
            <Flex data-testid="flex-container" inline>
              <div>item 1</div>
              <div>item 2</div>
            </Flex>,
          );

          const flexContainer = screen.getByTestId('flex-container');
          expect(flexContainer).toHaveStyle({ display: 'inline-flex' });
        });
      });

      describe('gap', () => {
        it.each([{ gap: '10px' }, { gap: '1rem' }] satisfies Array<{
          gap: CSSProperties['gap'];
        }>)(
          'flex의 gap prop에 $gap 속성을 주입하면 해당 속성을 적용한다.',
          ({ gap }) => {
            render(
              <Flex data-testid="flex-container" gap={gap}>
                <div>item 1</div>
                <div>item 2</div>
              </Flex>,
            );
          },
        );
      });
    });
  });

  describe('css', () => {
    it.each([
      { css: { justifyContent: 'flex-start' } },
      { css: { alignItems: 'center' } },
      { css: { flexWrap: 'wrap' } },
      { css: { flexDirection: 'column' } },
      { css: { flexBasis: '100px' } },
      { css: { flexGrow: 1 } },
      { css: { flexShrink: 1 } },
    ] satisfies Array<{ css: CSSProperties }>)(
      'flex의 css prop에 $css 속성을 주입하면 해당 속성을 적용한다.',
      ({ css }) => {
        render(
          <Flex data-testid="flex-container" css={css}>
            <div>item 1</div>
            <div>item 2</div>
          </Flex>,
        );

        const flexContainer = screen.getByTestId('flex-container');
        expect(flexContainer).toHaveStyle(css);
      },
    );
  });
});
