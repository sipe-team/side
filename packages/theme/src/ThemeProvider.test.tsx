import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, test } from 'vitest';

import { type ThemeName, ThemeProvider, useTheme } from './ThemeProvider';

const TestComponent = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button type="button" data-testid="set-1st" onClick={() => setTheme('1st')}>
        Set 1st Theme
      </button>
      <button type="button" data-testid="set-2nd" onClick={() => setTheme('2nd')}>
        Set 2nd Theme
      </button>
      <button type="button" data-testid="set-3rd" onClick={() => setTheme('3rd')}>
        Set 3rd Theme
      </button>
      <button type="button" data-testid="set-4th" onClick={() => setTheme('4th')}>
        Set 4th Theme
      </button>
    </div>
  );
};

const ComponentWithoutProvider = () => {
  const { theme } = useTheme();
  return <div>{theme}</div>;
};

describe('ThemeProvider', () => {
  test('sets "4th" as the default theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('4th');
  });

  test('sets the theme to the provided initial theme prop', () => {
    render(
      <ThemeProvider theme="2nd">
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('2nd');
  });

  test('sets the data-theme attribute correctly on the container div', () => {
    const { container } = render(
      <ThemeProvider theme="3rd">
        <TestComponent />
      </ThemeProvider>,
    );

    const themeContainer = container.querySelector('[data-theme]');
    expect(themeContainer).toHaveAttribute('data-theme', '3rd');
  });

  test('container div has display: contents style', () => {
    const { container } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const themeContainer = container.querySelector('[data-theme]');
    expect(themeContainer).toHaveStyle({ display: 'contents' });
  });

  test('can change theme through setTheme', async () => {
    const { container } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const currentTheme = screen.getByTestId('current-theme');
    const set2ndButton = screen.getByTestId('set-2nd');
    const themeContainer = container.querySelector('[data-theme]');

    expect(currentTheme).toHaveTextContent('4th');
    expect(themeContainer).toHaveAttribute('data-theme', '4th');

    await act(async () => {
      set2ndButton.click();
    });

    expect(currentTheme).toHaveTextContent('2nd');
    expect(themeContainer).toHaveAttribute('data-theme', '2nd');
  });

  test('theme updates when initial theme changes', () => {
    const { rerender } = render(
      <ThemeProvider theme="1st">
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('1st');

    rerender(
      <ThemeProvider theme="3rd">
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('3rd');
  });

  describe('all theme types are set correctly', () => {
    const themes = ['1st', '2nd', '3rd', '4th'] as const;

    it.each(themes)('theme "%s" is set correctly', (themeName) => {
      const { container } = render(
        <ThemeProvider theme={themeName}>
          <TestComponent />
        </ThemeProvider>,
      );

      const currentTheme = screen.getByTestId('current-theme');
      const themeContainer = container.querySelector('[data-theme]');

      expect(currentTheme).toHaveTextContent(themeName);
      expect(themeContainer).toHaveAttribute('data-theme', themeName);
    });
  });

  describe('theme change functionality tests', () => {
    const themeChangeTests = [
      { from: '4th', to: '1st', buttonTestId: 'set-1st' },
      { from: '1st', to: '2nd', buttonTestId: 'set-2nd' },
      { from: '2nd', to: '3rd', buttonTestId: 'set-3rd' },
      { from: '3rd', to: '4th', buttonTestId: 'set-4th' },
    ];

    it.each(themeChangeTests)('can change theme from $from to $to', async ({ from, to, buttonTestId }) => {
      const { container } = render(
        <ThemeProvider theme={from as ThemeName}>
          <TestComponent />
        </ThemeProvider>,
      );

      const currentTheme = screen.getByTestId('current-theme');
      const changeButton = screen.getByTestId(buttonTestId);
      const themeContainer = container.querySelector('[data-theme]');

      // Check initial state
      expect(currentTheme).toHaveTextContent(from);
      expect(themeContainer).toHaveAttribute('data-theme', from);

      // Change theme
      await act(async () => {
        changeButton.click();
      });

      // Check changed state
      expect(currentTheme).toHaveTextContent(to);
      expect(themeContainer).toHaveAttribute('data-theme', to);
    });
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
  test('throws an error when used outside of ThemeProvider', () => {
    // Mock console.error to hide console errors
    const originalError = console.error;
    console.error = () => {};

    expect(() => {
      render(<ComponentWithoutProvider />);
    }).toThrow('useTheme must be used within a ThemeProvider');

    // Restore console.error
    console.error = originalError;
  });

  test('returns correct context values when used inside ThemeProvider', () => {
    render(
      <ThemeProvider theme="2nd">
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('2nd');
    expect(screen.getByTestId('set-1st')).toBeInTheDocument();
    expect(screen.getByTestId('set-2nd')).toBeInTheDocument();
    expect(screen.getByTestId('set-3rd')).toBeInTheDocument();
    expect(screen.getByTestId('set-4th')).toBeInTheDocument();
  });
});
