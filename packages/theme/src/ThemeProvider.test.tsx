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
  test('기본 테마로 "4th"를 설정한다', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('4th');
  });

  test('초기 테마 prop을 전달하면 해당 테마로 설정된다', () => {
    render(
      <ThemeProvider theme="2nd">
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('2nd');
  });

  test('data-theme 속성이 컨테이너 div에 올바르게 설정된다', () => {
    const { container } = render(
      <ThemeProvider theme="3rd">
        <TestComponent />
      </ThemeProvider>,
    );

    const themeContainer = container.querySelector('[data-theme]');
    expect(themeContainer).toHaveAttribute('data-theme', '3rd');
  });

  test('컨테이너 div가 display: contents 스타일을 가진다', () => {
    const { container } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const themeContainer = container.querySelector('[data-theme]');
    expect(themeContainer).toHaveStyle({ display: 'contents' });
  });

  test('setTheme을 통해 테마를 변경할 수 있다', async () => {
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

  test('초기 테마가 변경되면 테마가 업데이트된다', () => {
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

  describe('모든 테마 타입이 올바르게 설정된다', () => {
    const themes = ['1st', '2nd', '3rd', '4th'] as const;

    it.each(themes)('테마 "%s"가 올바르게 설정된다', (themeName) => {
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

  describe('테마 변경 기능 테스트', () => {
    const themeChangeTests = [
      { from: '4th', to: '1st', buttonTestId: 'set-1st' },
      { from: '1st', to: '2nd', buttonTestId: 'set-2nd' },
      { from: '2nd', to: '3rd', buttonTestId: 'set-3rd' },
      { from: '3rd', to: '4th', buttonTestId: 'set-4th' },
    ];

    it.each(themeChangeTests)('테마를 $from에서 $to로 변경할 수 있다', async ({ from, to, buttonTestId }) => {
      const { container } = render(
        <ThemeProvider theme={from as ThemeName}>
          <TestComponent />
        </ThemeProvider>,
      );

      const currentTheme = screen.getByTestId('current-theme');
      const changeButton = screen.getByTestId(buttonTestId);
      const themeContainer = container.querySelector('[data-theme]');

      // 초기 상태 확인
      expect(currentTheme).toHaveTextContent(from);
      expect(themeContainer).toHaveAttribute('data-theme', from);

      // 테마 변경
      await act(async () => {
        changeButton.click();
      });

      // 변경된 상태 확인
      expect(currentTheme).toHaveTextContent(to);
      expect(themeContainer).toHaveAttribute('data-theme', to);
    });
  });

  test('children이 올바르게 렌더링된다', () => {
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
  test('ThemeProvider 외부에서 사용하면 에러를 발생시킨다', () => {
    // 콘솔 에러를 숨기기 위해 console.error를 모킹
    const originalError = console.error;
    console.error = () => {};

    expect(() => {
      render(<ComponentWithoutProvider />);
    }).toThrow('useTheme must be used within a ThemeProvider');

    // console.error 복원
    console.error = originalError;
  });

  test('ThemeProvider 내부에서 사용하면 올바른 context 값을 반환한다', () => {
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
