import { type ThemeColor, themeColor } from '@sipe-team/tokens';

import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, test } from 'vitest';

import { ThemeProvider, useTheme } from './ThemeProvider';

const TestComponent = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <span data-testid="current-theme">{theme.primary}</span>
      <button type="button" data-testid="set-1st" onClick={() => setTheme(themeColor['1st'])}>
        Set 1st Theme
      </button>
      <button type="button" data-testid="set-2nd" onClick={() => setTheme(themeColor['2nd'])}>
        Set 2nd Theme
      </button>
      <button type="button" data-testid="set-3rd" onClick={() => setTheme(themeColor['3rd'])}>
        Set 3rd Theme
      </button>
      <button type="button" data-testid="set-4th" onClick={() => setTheme(themeColor['4th'])}>
        Set 4th Theme
      </button>
    </div>
  );
};

const ComponentWithoutProvider = () => {
  const { theme } = useTheme();
  return <div>{theme.primary}</div>;
};

describe('ThemeProvider', () => {
  test('sets 4th generation theme as default', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent(themeColor['4th'].primary);
  });

  test('sets the theme to the provided initial theme prop', () => {
    render(
      <ThemeProvider theme={themeColor['2nd']}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent(themeColor['2nd'].primary);
  });

  test('accepts custom theme color objects', () => {
    const customTheme: ThemeColor = {
      primary: '#ff0000',
      secondary: '#00ff00',
      background: '#0000ff',
      text: '#ffffff',
      gradient: 'linear-gradient(45deg, #ff0000 0%, #00ff00 100%)',
    };

    render(
      <ThemeProvider theme={customTheme}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent(customTheme.primary);
  });

  test('container div has display: contents style', () => {
    const { container } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const themeContainer = container.firstChild as HTMLElement;
    expect(themeContainer).toHaveStyle({ display: 'contents' });
  });

  test('can change theme through setTheme', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const currentTheme = screen.getByTestId('current-theme');
    const set2ndButton = screen.getByTestId('set-2nd');

    expect(currentTheme).toHaveTextContent(themeColor['4th'].primary);

    await act(async () => {
      set2ndButton.click();
    });

    expect(currentTheme).toHaveTextContent(themeColor['2nd'].primary);
  });

  test('theme updates when initial theme changes', () => {
    const { rerender } = render(
      <ThemeProvider theme={themeColor['1st']}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent(themeColor['1st'].primary);

    rerender(
      <ThemeProvider theme={themeColor['3rd']}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent(themeColor['3rd'].primary);
  });

  describe('all theme types are set correctly', () => {
    const themes = [
      { name: '1st', theme: themeColor['1st'] },
      { name: '2nd', theme: themeColor['2nd'] },
      { name: '3rd', theme: themeColor['3rd'] },
      { name: '4th', theme: themeColor['4th'] },
    ];

    it.each(themes)('theme "$name" is set correctly', ({ name, theme }) => {
      render(
        <ThemeProvider theme={theme}>
          <TestComponent />
        </ThemeProvider>,
      );

      const currentTheme = screen.getByTestId('current-theme');
      expect(currentTheme).toHaveTextContent(theme.primary);
    });
  });

  describe('theme change functionality tests', () => {
    const themeChangeTests = [
      { from: themeColor['4th'], to: themeColor['1st'], buttonTestId: 'set-1st' },
      { from: themeColor['1st'], to: themeColor['2nd'], buttonTestId: 'set-2nd' },
      { from: themeColor['2nd'], to: themeColor['3rd'], buttonTestId: 'set-3rd' },
      { from: themeColor['3rd'], to: themeColor['4th'], buttonTestId: 'set-4th' },
    ];

    it.each(themeChangeTests)(
      'can change theme from $from.primary to $to.primary',
      async ({ from, to, buttonTestId }) => {
        render(
          <ThemeProvider theme={from}>
            <TestComponent />
          </ThemeProvider>,
        );

        const currentTheme = screen.getByTestId('current-theme');
        const changeButton = screen.getByTestId(buttonTestId);

        // Check initial state
        expect(currentTheme).toHaveTextContent(from.primary);

        // Change theme
        await act(async () => {
          changeButton.click();
        });

        // Check changed state
        expect(currentTheme).toHaveTextContent(to.primary);
      },
    );
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
      <ThemeProvider theme={themeColor['2nd']}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent(themeColor['2nd'].primary);
    expect(screen.getByTestId('set-1st')).toBeInTheDocument();
    expect(screen.getByTestId('set-2nd')).toBeInTheDocument();
    expect(screen.getByTestId('set-3rd')).toBeInTheDocument();
    expect(screen.getByTestId('set-4th')).toBeInTheDocument();
  });
});
