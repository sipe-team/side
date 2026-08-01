import { render } from '@testing-library/react';
import { describe, test } from 'vitest';

describe('inert JSX prop behavior (React 18.3.1)', () => {
  test('inert={true} via JSX', () => {
    const { container } = render(<div inert={true} data-testid="x" />);
    const el = container.querySelector('[data-testid="x"]') as HTMLElement;
    console.log(
      'inert={true}  -> hasAttribute:',
      el.hasAttribute('inert'),
      ' el.inert:',
      el.inert,
      ' outerHTML:',
      el.outerHTML,
    );
  });

  test('inert={false} via JSX', () => {
    const { container } = render(<div inert={false} data-testid="x" />);
    const el = container.querySelector('[data-testid="x"]') as HTMLElement;
    console.log(
      'inert={false} -> hasAttribute:',
      el.hasAttribute('inert'),
      ' el.inert:',
      el.inert,
      ' outerHTML:',
      el.outerHTML,
    );
  });
});
