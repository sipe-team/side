import '@testing-library/jest-dom';

import { createRef } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { Action, Input } from './Input';
import { defaultFontSize } from './Input.css';

function ruleForClass(className: string): string {
  const target = `.${className}`;
  const matched: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }
    for (const rule of Array.from(rules)) {
      if (!('selectorText' in rule)) continue;
      const selectorText = (rule as CSSStyleRule).selectorText ?? '';
      const matches = selectorText.split(',').some((s) => {
        const part = s.trim();
        return part === target || part.startsWith(`${target}:`) || part.startsWith(`${target}.`);
      });
      if (matches) matched.push(rule.cssText);
    }
  }
  return matched.join('\n');
}

function rulesForElement(el: HTMLElement): string {
  return el.className.split(/\s+/).filter(Boolean).map(ruleForClass).join('\n');
}

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

    test('disabled 상태가 올바르게 설정된다', () => {
      render(<Input disabled={true} />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    test('readOnly 상태가 올바르게 설정된다', () => {
      render(<Input readOnly defaultValue="locked" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });

    test('readOnly일 때 muted 배경 semantic 토큰을 참조한다', () => {
      render(<Input readOnly defaultValue="locked" />);
      expect(rulesForElement(screen.getByRole('textbox'))).toContain('var(--side-color-background-muted)');
    });

    test('classNames가 올바르게 적용된다', () => {
      const { container } = render(<Input className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    test('기본적으로 맞춤법 검사가 비활성화된다', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toHaveAttribute('spellCheck', 'false');
    });

    test(`fontSize 미지정시 ${defaultFontSize}, fontWeight는 regular semantic 토큰을 참조한다`, () => {
      render(<Input />);
      const applied = rulesForElement(screen.getByRole('textbox'));

      expect(applied).toContain('var(--side-font-size-200)');
      expect(applied).toContain('var(--side-font-weight-regular)');
    });

    test('변경 폰트 사이즈 semantic 토큰을 참조한다', () => {
      render(<Input fontSize={24} />);
      const applied = rulesForElement(screen.getByRole('textbox'));

      expect(applied).toContain('var(--side-font-size-500)');
      expect(applied).toContain('var(--side-font-weight-regular)');
    });

    test('인풋 기본 테두리·패딩·반경 semantic 토큰을 참조한다', () => {
      render(<Input />);
      const fieldRules = rulesForElement(screen.getByRole('textbox'));

      expect(fieldRules).toContain('var(--side-color-border-default)');
      expect(fieldRules).toContain('var(--side-radius-component-md)');
      expect(fieldRules).toContain('var(--side-spacing-component-sm)');
      expect(fieldRules).toContain('var(--side-spacing-component-md)');
    });

    test('래퍼는 span이다', () => {
      const { container } = render(<Input />);
      expect((container.firstChild as HTMLElement).tagName).toBe('SPAN');
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

    test('validation이 error이면 aria-invalid가 설정된다', () => {
      render(<Input validation="error" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('validation', () => {
    test('error일 때 danger border semantic 토큰을 참조한다', () => {
      render(<Input validation="error" />);
      expect(rulesForElement(screen.getByRole('textbox'))).toContain('var(--side-color-status-danger-border)');
    });

    test('success일 때 success border semantic 토큰을 참조한다', () => {
      render(<Input validation="success" />);
      expect(rulesForElement(screen.getByRole('textbox'))).toContain('var(--side-color-status-success-border)');
    });
  });
});
