import { act, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { ThemeProvider, useTheme } from './ThemeProvider';

const TestComponent = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button type="button" data-testid="set-light" onClick={() => setTheme('light')}>
        Light
      </button>
      <button type="button" data-testid="set-dark" onClick={() => setTheme('dark')}>
        Dark
      </button>
    </div>
  );
};

const ComponentWithoutProvider = () => {
  const { theme } = useTheme();
  return <div>{theme}</div>;
};

describe('ThemeProvider', () => {
  test('defaults to dark mode', () => {
    const { container } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const themeDiv = container.firstChild as HTMLElement;
    expect(themeDiv).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  test('applies provided initial theme', () => {
    const { container } = render(
      <ThemeProvider theme="light">
        <TestComponent />
      </ThemeProvider>,
    );

    const themeDiv = container.firstChild as HTMLElement;
    expect(themeDiv).toHaveAttribute('data-theme', 'light');
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });

  test('container has display: contents style', () => {
    const { container } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const themeContainer = container.firstChild as HTMLElement;
    expect(themeContainer).toHaveStyle({ display: 'contents' });
  });

  test('setTheme updates data-theme attribute', async () => {
    const { container } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const themeDiv = container.firstChild as HTMLElement;
    expect(themeDiv).toHaveAttribute('data-theme', 'dark');

    await act(async () => {
      screen.getByTestId('set-light').click();
    });

    expect(themeDiv).toHaveAttribute('data-theme', 'light');
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });

  test('theme prop change updates data-theme attribute', () => {
    const { rerender, container } = render(
      <ThemeProvider theme="dark">
        <TestComponent />
      </ThemeProvider>,
    );

    const themeDiv = container.firstChild as HTMLElement;
    expect(themeDiv).toHaveAttribute('data-theme', 'dark');

    rerender(
      <ThemeProvider theme="light">
        <TestComponent />
      </ThemeProvider>,
    );

    expect(themeDiv).toHaveAttribute('data-theme', 'light');
  });

  test('children are rendered correctly', () => {
    render(
      <ThemeProvider>
        <div data-testid="child-content">Test Content</div>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toHaveTextContent('Test Content');
  });
});

describe('useTheme hook', () => {
  test('throws when used outside ThemeProvider', () => {
    const originalError = console.error;
    console.error = () => {};

    expect(() => {
      render(<ComponentWithoutProvider />);
    }).toThrow('useTheme must be used within a ThemeProvider');

    console.error = originalError;
  });

  test('returns correct theme and setTheme', () => {
    render(
      <ThemeProvider theme="dark">
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('set-light')).toBeInTheDocument();
    expect(screen.getByTestId('set-dark')).toBeInTheDocument();
  });
});
