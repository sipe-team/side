import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, test } from 'vitest';
import { Action, Input } from './Input';
import { colors } from './constants/colors';
import {
  Weight,
  defaultFontSize,
  defaultFontWeight,
} from './constants/typhography';

describe('Input 컴포넌트', () => {
  describe('렌더링', () => {
    test('올바른 타입으로 렌더링된다', () => {
      render(<Input type="email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });

    test('커스텀 스타일이 input에 적용된다', () => {
      render(<Input style={{ color: 'red' }} />);
      expect(screen.getByRole('textbox')).toHaveStyle({ color: 'red' });
    });

    test('ref가 올바르게 전달된다', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    test(`disabled일 때 배경색이 정의된 비활성화 색상(${colors.disabledBackground})으로 설정된다`, () => {
      const disableColor = colors.disabledBackground;
      const { container } = render(<Input disabled={true} />);
      const element = container.firstChild as HTMLElement;
      const styles = getComputedStyle(element);
      expect(styles.getPropertyValue('--input-disabled-color')).toBe(
        disableColor,
      );
    });

    test('classNames가 올바르게 적용된다', () => {
      const { container } = render(<Input className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    test('기본적으로 맞춤법 검사가 비활성화된다', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'spellCheck',
        'false',
      );
    });

    test(`fontWeight가 미지정시 ${defaultFontWeight}, fontSize가 미지정시 ${defaultFontSize}px이 기본값으로 적용된다`, () => {
      const { container } = render(<Input />);
      const element = container.firstChild as HTMLElement;
      const styles = getComputedStyle(element);
      expect(styles.getPropertyValue('--font-size')).toBe(
        `${defaultFontSize}px`,
      );
      expect(styles.getPropertyValue('--font-weight')).toBe(
        `${Weight[defaultFontWeight]}`,
      );
    });

    test('변경 폰트 사이즈, 폰트 웨이트 적용된다.', () => {
      const fontSize = 24;
      const fontWeight = 'semiBold';
      const { container } = render(
        <Input fontSize={fontSize} fontWeight={fontWeight} />,
      );
      const element = container.firstChild as HTMLElement;
      const styles = getComputedStyle(element);
      expect(styles.getPropertyValue('--font-size')).toBe(`${fontSize}px`);
      expect(styles.getPropertyValue('--font-weight')).toBe(
        `${Weight[fontWeight]}`,
      );
    });
  });

  describe('상호작용', () => {
    test('사용자 입력', async () => {
      render(<Input name="test" />);
      const input = screen.getByRole('textbox');
      await userEvent.type(input, '테스트 입력');
      expect(input).toHaveValue('테스트 입력');
    });
  });

  describe('액션 버튼', () => {
    test('Action 버튼이 올바르게 렌더링된다', () => {
      render(
        <Input>
          <Action>버튼</Action>
        </Input>,
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('Action 버튼에 커스텀 클래스가 적용된다', () => {
      render(
        <Input>
          <Action className="custom-action">버튼</Action>
        </Input>,
      );
      expect(screen.getByRole('button')).toHaveClass('custom-action');
    });

    test('asChild prop으로 렌더링된 엘리먼트가 slot으로 대체된다', () => {
      render(
        <Input>
          <Action asChild>
            <span>커스텀 엘리먼트</span>
          </Action>
        </Input>,
      );
      expect(screen.getByText('커스텀 엘리먼트').tagName).toBe('SPAN');
    });
  });

  describe('접근성', () => {
    test('Input 컴포넌트가 textbox role을 가진다', () => {
      render(<Input name="email" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });
});
