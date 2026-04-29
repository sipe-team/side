import { type CSSProperties, createElement, createRef } from 'react';

import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FLEX_ALIGNS, FLEX_DIRECTIONS, FLEX_JUSTIFY_CONTENTS, FLEX_WRAPS } from './constants';
import { Flex } from './Flex';

describe('Flex', () => {
  it('uses the default flex styles when no props are provided', () => {
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

  it('passes through a custom className', () => {
    const customClassName = faker.word.noun();
    render(<Flex data-testid="flex-container" className={customClassName} />);
    expect(screen.getByTestId('flex-container')).toHaveClass(customClassName);
  });

  describe('flex props', () => {
    describe('justify', () => {
      it.each(
        FLEX_JUSTIFY_CONTENTS.map((justifyContent) => ({ justifyContent })),
      )('applies justifyContent: $justifyContent when justify is provided', ({ justifyContent }) => {
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
      )('applies alignItems: $alignItems when align is provided', ({ alignItems }) => {
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
      it.each(FLEX_WRAPS.map((wrap) => ({ wrap })))('applies flexWrap: $wrap when wrap is provided', ({ wrap }) => {
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
      )('applies flexDirection: $direction when direction is provided', ({ direction }) => {
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
      }>)('applies flexBasis: $basis when basis is provided', ({ basis }) => {
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
      }>)('applies flexGrow: $grow when grow is provided', ({ grow }) => {
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
      }>)('applies flexShrink: $shrink when shrink is provided', ({ shrink }) => {
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
      it('renders with inline-flex display when inline is true', () => {
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
      }>)('applies gap: $gap when gap is provided', ({ gap }) => {
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
    ] satisfies Array<{ style: CSSProperties }>)('applies style overrides from the style prop: $style', ({ style }) => {
      render(
        <Flex data-testid="flex-container" style={style}>
          <div>item 1</div>
          <div>item 2</div>
        </Flex>,
      );

      const flexContainer = screen.getByTestId('flex-container');
      expect(flexContainer).toHaveStyle(style);
    });

    it('allows the style prop to override inline style values for the same CSS properties', () => {
      render(
        <Flex data-testid="flex-container" basis="100px" gap="8px" style={{ flexBasis: '50%', gap: '16px' }}>
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
    it('preserves the expected layout styles when direction, align, and gap are combined', () => {
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

    it('preserves the expected layout styles when inline, justify, and gap are combined', () => {
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
    ])('renders as the child %s element when asChild is true', (element) => {
      render(
        <Flex data-testid="flex-container" asChild>
          {createElement(element)}
        </Flex>,
      );

      const flexContainer = screen.getByTestId('flex-container');
      expect(flexContainer).toBeInTheDocument();
      expect(flexContainer.tagName.toLowerCase()).toBe(element);
    });

    it('passes className, style, and rest props to the child element when asChild is used', () => {
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
    it('forwards the ref to the final rendered DOM node', () => {
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
