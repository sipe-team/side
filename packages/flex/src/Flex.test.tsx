import { type CSSProperties, createElement, createRef } from 'react';

import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Flex } from './Flex';
import { FLEX_ALIGNS, FLEX_DIRECTIONS, FLEX_JUSTIFY_CONTENTS, FLEX_WRAPS } from './constants';

describe('Flex', () => {
  it('flex 컴포넌트는 props를 전달하지 않으면 flex의 기본값으로 설정된다.', () => {
    render(
      <Flex data-testid="flex-container">
        <div>item 1</div>
        <div>item 2</div>
      </Flex>,
    );

    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toBeInTheDocument();
    expect(flexContainer).toHaveStyle({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'normal',
      justifyContent: 'normal',
      flexWrap: 'nowrap',
    });
  });

  it('flex 컴포넌트에 className을 주입하면 추가로 전달한다.', () => {
    const customClassName = faker.word.noun();
    render(<Flex data-testid="flex-container" className={customClassName} />);
    expect(screen.getByTestId('flex-container')).toHaveClass(customClassName);
  });

  describe('flex 속성', () => {
    describe('justify', () => {
      it.each(
        FLEX_JUSTIFY_CONTENTS.map((justifyContent) => ({ justifyContent })),
      )('flex의 justify prop에 $justifyContent 속성을 주입하면 해당 속성을 적용한다.', ({ justifyContent }) => {
        render(
          <Flex data-testid="flex-container" justify={justifyContent}>
            <div>item 1</div>
            <div>item 2</div>
          </Flex>,
        );

        const flexContainer = screen.getByTestId('flex-container');
        expect(flexContainer).toHaveStyle({ justifyContent });
      });
    });

    describe('align', () => {
      it.each(
        FLEX_ALIGNS.map((alignItems) => ({ alignItems })),
      )('flex의 align prop에 $alignItems 속성을 주입하면 해당 속성을 적용한다.', ({ alignItems }) => {
        render(
          <Flex data-testid="flex-container" align={alignItems}>
            <div>item 1</div>
            <div>item 2</div>
          </Flex>,
        );

        const flexContainer = screen.getByTestId('flex-container');
        expect(flexContainer).toHaveStyle({ alignItems });
      });
    });

    describe('wrap', () => {
      it.each(
        FLEX_WRAPS.map((wrap) => ({ wrap })),
      )('flex의 wrap prop에 $wrap 속성을 주입하면 해당 속성을 적용한다.', ({ wrap }) => {
        render(
          <Flex data-testid="flex-container" wrap={wrap}>
            <div>item 1</div>
            <div>item 2</div>
          </Flex>,
        );

        const flexContainer = screen.getByTestId('flex-container');
        expect(flexContainer).toHaveStyle({ flexWrap: wrap });
      });
    });

    describe('direction', () => {
      it.each(
        FLEX_DIRECTIONS.map((direction) => ({ direction })),
      )('flex의 direction prop에 $direction 속성을 주입하면 해당 속성을 적용한다.', ({ direction }) => {
        render(
          <Flex data-testid="flex-container" direction={direction}>
            <div>item 1</div>
            <div>item 2</div>
          </Flex>,
        );

        const flexContainer = screen.getByTestId('flex-container');
        expect(flexContainer).toHaveStyle({ flexDirection: direction });
      });
    });

    describe('basis', () => {
      it.each([
        { basis: '100px' },
        { basis: '100%' },
        { basis: 'auto' },
        { basis: '10rem' },
        { basis: 'content' },
      ] satisfies Array<{
        basis: CSSProperties['flexBasis'];
      }>)('flex의 basis prop에 $basis 속성을 주입하면 해당 속성을 적용한다.', ({ basis }) => {
        render(
          <Flex data-testid="flex-container" basis={basis}>
            <div>item 1</div>
            <div>item 2</div>
          </Flex>,
        );

        const flexContainer = screen.getByTestId('flex-container');
        expect(flexContainer).toHaveStyle({ flexBasis: basis });
      });
    });

    describe('grow', () => {
      it.each([{ grow: 0 }, { grow: 1 }, { grow: 2 }] satisfies Array<{
        grow: CSSProperties['flexGrow'];
      }>)('flex의 grow prop에 $grow 속성을 주입하면 해당 속성을 적용한다.', ({ grow }) => {
        render(
          <Flex data-testid="flex-container" grow={grow}>
            <div>item 1</div>
            <div>item 2</div>
          </Flex>,
        );

        const flexContainer = screen.getByTestId('flex-container');
        expect(flexContainer).toHaveStyle({ flexGrow: grow });
      });
    });

    describe('shrink', () => {
      it.each([{ shrink: 0 }, { shrink: 1 }, { shrink: 2 }] satisfies Array<{
        shrink: CSSProperties['flexShrink'];
      }>)('flex의 shrink prop에 $shrink 속성을 주입하면 해당 속성을 적용한다.', ({ shrink }) => {
        render(
          <Flex data-testid="flex-container" shrink={shrink}>
            <div>item 1</div>
            <div>item 2</div>
          </Flex>,
        );

        const flexContainer = screen.getByTestId('flex-container');
        expect(flexContainer).toHaveStyle({ flexShrink: shrink });
      });
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
      }>)('flex의 gap prop에 $gap 속성을 주입하면 해당 속성을 적용한다.', ({ gap }) => {
        render(
          <Flex data-testid="flex-container" gap={gap}>
            <div>item 1</div>
            <div>item 2</div>
          </Flex>,
        );

        const flexContainer = screen.getByTestId('flex-container');
        expect(flexContainer).toHaveStyle({ gap });
      });
    });
  });

  describe('style', () => {
    it.each([
      { style: { justifyContent: 'flex-start' } },
      { style: { alignItems: 'center' } },
      { style: { flexWrap: 'wrap' } },
      { style: { flexDirection: 'column' } },
    ] satisfies Array<{ style: CSSProperties }>)('flex의 style prop에 $style 속성을 주입하면 해당 속성을 적용한다.', ({
      style,
    }) => {
      render(
        <Flex data-testid="flex-container" style={style}>
          <div>item 1</div>
          <div>item 2</div>
        </Flex>,
      );

      const flexContainer = screen.getByTestId('flex-container');
      expect(flexContainer).toHaveStyle(style);
    });

    it('style prop은 동일한 CSS 속성에 대해 기본 inline style을 override 할 수 있다.', () => {
      render(
        <Flex
          data-testid="flex-container"
          basis="100px"
          gap="8px"
          style={{ flexBasis: '50%', gap: '16px' }}
        >
          <div>item 1</div>
          <div>item 2</div>
        </Flex>,
      );

      const flexContainer = screen.getByTestId('flex-container');
      expect(flexContainer).toHaveStyle({
        flexBasis: '50%',
        gap: '16px',
      });
    });
  });

  describe('consumer usage patterns', () => {
    it('direction, align, gap 조합을 함께 사용해도 의도한 레이아웃 속성을 유지한다.', () => {
      render(
        <Flex data-testid="flex-container" direction="column" align="center" gap="12px">
          <div>item 1</div>
          <div>item 2</div>
        </Flex>,
      );

      const flexContainer = screen.getByTestId('flex-container');
      expect(flexContainer).toHaveStyle({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
      });
    });

    it('inline, justify, gap 조합을 함께 사용해도 의도한 레이아웃 속성을 유지한다.', () => {
      render(
        <Flex data-testid="flex-container" inline justify="center" gap="8px">
          <div>item 1</div>
          <div>item 2</div>
        </Flex>,
      );

      const flexContainer = screen.getByTestId('flex-container');
      expect(flexContainer).toHaveStyle({
        display: 'inline-flex',
        justifyContent: 'center',
        gap: '8px',
      });
    });
  });

  describe('polymorphic', () => {
    it.each([
      'span',
      'nav',
      'button',
      'input',
      'label',
      'div',
    ])('flex의 asChild prop에 true 속성을 주입하면 자식으로 %s 엘리먼트가 전달되면 해당 엘리먼트의 태그로 렌더링된다', (element) => {
      render(
        <Flex data-testid="flex-container" asChild>
          {createElement(element)}
        </Flex>,
      );

      const flexContainer = screen.getByTestId('flex-container');
      expect(flexContainer).toBeInTheDocument();
      expect(flexContainer.tagName.toLowerCase()).toBe(element);
    });

    it('asChild 사용 시 className, style, rest props를 자식 element에 전달한다.', () => {
      render(
        <Flex
          asChild
          className="custom-flex"
          data-testid="flex-container"
          aria-label="flex navigation"
          gap="12px"
          style={{ padding: '8px' }}
        >
          <nav />
        </Flex>,
      );

      const flexContainer = screen.getByTestId('flex-container');
      expect(flexContainer.tagName.toLowerCase()).toBe('nav');
      expect(flexContainer).toHaveClass('custom-flex');
      expect(flexContainer).toHaveAttribute('aria-label', 'flex navigation');
      expect(flexContainer).toHaveStyle({
        display: 'flex',
        gap: '12px',
        padding: '8px',
      });
    });
  });

  describe('ref', () => {
    it('forwarded ref를 최종 렌더링 DOM node에 전달한다.', () => {
      const ref = createRef<HTMLDivElement>();

      render(
        <Flex ref={ref} data-testid="flex-container">
          <div>item 1</div>
        </Flex>,
      );

      expect(ref.current).toBe(screen.getByTestId('flex-container'));
    });
  });
});
