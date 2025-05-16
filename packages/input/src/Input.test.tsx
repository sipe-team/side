import { userEvent } from '@vitest/browser/context';
import { createRef } from 'react';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Action, Input } from './Input';
import { colors } from './constants/colors';
import { Weight, defaultFontSize, defaultFontWeight } from './constants/typhography';

describe('Input 컴포넌트', () => {
  describe('렌더링', () => {
    test('올바른 타입으로 렌더링된다', async () => {
      const screen = render(<Input type="email" />);
      await expect.element(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });

    test('커스텀 스타일이 input에 적용된다', async () => {
      const screen = render(<Input style={{ color: 'red' }} />);
      await expect.element(screen.getByRole('textbox')).toHaveStyle({ color: 'red' });
    });

    test('ref가 올바르게 전달된다', async () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    test(`disabled일 때 배경색이 정의된 비활성화 색상(${colors.disabledBackground})으로 설정된다`, async () => {
      const disableColor = colors.disabledBackground;
      const screen = render(<Input disabled={true} />);
      const element = screen.container.firstChild as HTMLElement;
      const styles = getComputedStyle(element);
      expect(styles.getPropertyValue('--input-disabled-color')).toBe(disableColor);
    });

    test('classNames가 올바르게 적용된다', async () => {
      const screen = render(<Input className="custom-class" />);
      expect(screen.container.firstChild).toHaveClass('custom-class');
    });

    test('기본적으로 맞춤법 검사가 비활성화된다', async () => {
      const screen = render(<Input />);
      await expect.element(screen.getByRole('textbox')).toHaveAttribute('spellCheck', 'false');
    });

    test(`fontWeight가 미지정시 ${defaultFontWeight}, fontSize가 미지정시 ${defaultFontSize}px이 기본값으로 적용된다`, async () => {
      const screen = render(<Input />);
      const element = screen.container.firstChild as HTMLElement;
      const styles = getComputedStyle(element);
      expect(styles.getPropertyValue('--font-size')).toBe(`${defaultFontSize}px`);
      expect(styles.getPropertyValue('--font-weight')).toBe(`${Weight[defaultFontWeight]}`);
    });

    test('변경 폰트 사이즈, 폰트 웨이트 적용된다.', async () => {
      const fontSize = 24;
      const fontWeight = 'semiBold';
      const screen = render(<Input fontSize={fontSize} fontWeight={fontWeight} />);
      const element = screen.container.firstChild as HTMLElement;
      const styles = getComputedStyle(element);
      expect(styles.getPropertyValue('--font-size')).toBe(`${fontSize}px`);
      expect(styles.getPropertyValue('--font-weight')).toBe(`${Weight[fontWeight]}`);
    });
  });

  describe('상호작용', () => {
    test('사용자 입력', async () => {
      const screen = render(<Input name="test" />);
      const input = screen.getByRole('textbox');
      const user = userEvent.setup();
      await user.type(input, '테스트 입력');
      await expect.element(input).toHaveValue('테스트 입력');
    });
  });

  describe('액션 버튼', () => {
    test('Action 버튼이 올바르게 렌더링된다', async () => {
      const screen = render(
        <Input>
          <Action>버튼</Action>
        </Input>,
      );
      await expect.element(screen.getByRole('button')).toBeInTheDocument();
    });

    test('Action 버튼에 커스텀 클래스가 적용된다', async () => {
      const screen = render(
        <Input>
          <Action className="custom-action">버튼</Action>
        </Input>,
      );
      await expect.element(screen.getByRole('button')).toHaveClass('custom-action');
    });

    test('asChild prop으로 렌더링된 엘리먼트가 slot으로 대체된다', async () => {
      const screen = render(
        <Input>
          <Action asChild>
            <span>커스텀 엘리먼트</span>
          </Action>
        </Input>,
      );
      await expect.element(screen.getByText('커스텀 엘리먼트')).toHaveProperty('tagName', 'SPAN');
    });
  });

  describe('접근성', () => {
    test('Input 컴포넌트가 textbox role을 가진다', async () => {
      const screen = render(<Input name="email" />);
      await expect.element(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });
});
