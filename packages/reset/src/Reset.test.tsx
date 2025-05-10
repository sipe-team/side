import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { Reset } from './Reset';

describe('Reset', () => {
  it('renders children correctly', async () => {
    const screen = render(
      <>
        <Reset/>
        <div>Test Content</div>
      </>,
    );

    await expect.element(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies className along with default reset class', async () => {
    const customClassName = 'custom-class';
    const screen = render(
      <>
        <Reset />
        <div className={customClassName}>Content</div>
      </>,
    );

    const element = screen.getByText('Content');
    await expect.element(element).toHaveClass(customClassName);
  });

  describe('CSS Reset', () => {
    const formElements = [
      ['input', <input data-testid="test-element" type="text" key="input" />],
      [
        'button',
        <button data-testid="test-element" key="button" type="button">
          Button
        </button>,
      ],
      ['textarea', <textarea data-testid="test-element" key="textarea" />],
      [
        'select',
        <select data-testid="test-element" key="select">
          <option>Option</option>
        </select>,
      ],
    ] as const;

    const resetStyles = {
      appearance: 'none',
      background: 'none',
      borderWidth: '0px',
      borderStyle: 'solid',
      color: 'inherit',
      font: 'inherit',
    };

    it.each(formElements)('applies reset styles to %s element',async (_, element) => {
      const screen = render(
        <>
          <Reset />
          {element}
        </>,
      );

      const testElement = screen.getByTestId('test-element');
      await expect.element(testElement).toBeInTheDocument();
      await expect.element(testElement).toHaveStyle(resetStyles);
    });

    it.each([
      ['unordered list', 'ul'],
      ['ordered list', 'ol'],
    ])('applies reset styles to %s', async (_, type) => {
      const screen = render(
        <>
          <Reset />
          {React.createElement(type, { 'data-testid': 'list' }, <li>Test Item</li>)}
        </>,
      );

      const list = screen.getByTestId('list');
      await expect.element(list).toHaveStyle({ listStyle: 'none' });
    });

    it.each([
      ['img', 'image'],
      ['svg', 'svg'],
      ['video', 'video'],
      ['canvas', 'canvas'],
    ])('applies reset styles to %s element', async (elementType, testId) => {
      const screen = render(
        <>
          <Reset />
          {React.createElement(elementType, {
            'data-testid': testId,
            src: elementType === 'img' ? 'test.jpg' : undefined,
            alt: elementType === 'img' ? 'test' : undefined,
          })}
        </>,
      );

      const element = screen.getByTestId(testId);
      await expect.element(element).toHaveStyle({
        display: 'block',
        maxWidth: '100%',
      });
    });

    it.each(['article', 'section', 'nav', 'aside', 'header', 'footer', 'main'])(
      'applies reset styles to %s element',
      async (elementType) => {
        const screen = render(
          <>
            <Reset />
            {React.createElement(
              elementType,
              {
                'data-testid': 'semantic-element',
              },
              'Content',
            )}
          </>,
        );

        const element = screen.getByTestId('semantic-element');
        await expect.element(element).toHaveStyle({ display: 'block' });
      },
    );
  });
});
