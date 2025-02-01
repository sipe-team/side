import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { Reset } from './Reset';

describe('Reset', () => {
  it('renders children correctly', () => {
    render(
      <Reset>
        <div>Test Content</div>
      </Reset>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies className along with default reset class', () => {
    const customClassName = 'custom-class';
    render(<Reset className={customClassName}>Content</Reset>);

    const element = screen.getByText('Content');
    expect(element).toHaveClass(customClassName);
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

    it.each(formElements)('applies reset styles to %s element', (_, element) => {
      render(<Reset>{element}</Reset>);

      const testElement = screen.getByTestId('test-element');
      expect(testElement).toBeInTheDocument();
      expect(testElement).toHaveStyle(resetStyles);
    });

    it.each([
      ['unordered list', 'ul'],
      ['ordered list', 'ol'],
    ])('applies reset styles to %s', (_, type) => {
      render(<Reset>{React.createElement(type, { 'data-testid': 'list' }, <li>Test Item</li>)}</Reset>);

      const list = screen.getByTestId('list');
      expect(list).toHaveStyle({ listStyle: 'none' });
    });

    it.each([
      ['img', 'image'],
      ['svg', 'svg'],
      ['video', 'video'],
      ['canvas', 'canvas'],
    ])('applies reset styles to %s element', (elementType, testId) => {
      render(
        <Reset>
          {React.createElement(elementType, {
            'data-testid': testId,
            src: elementType === 'img' ? 'test.jpg' : undefined,
            alt: elementType === 'img' ? 'test' : undefined,
          })}
        </Reset>,
      );

      const element = screen.getByTestId(testId);
      expect(element).toHaveStyle({
        display: 'block',
        maxWidth: '100%',
      });
    });

    it.each(['article', 'section', 'nav', 'aside', 'header', 'footer', 'main'])(
      'applies reset styles to %s element',
      (elementType) => {
        render(
          <Reset>
            {React.createElement(
              elementType,
              {
                'data-testid': 'semantic-element',
              },
              'Content',
            )}
          </Reset>,
        );

        const element = screen.getByTestId('semantic-element');
        expect(element).toHaveStyle({ display: 'block' });
      },
    );
  });
});
