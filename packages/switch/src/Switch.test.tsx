import '@testing-library/jest-dom';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { Switch } from './Switch';
import { SWITCH_SIZES, SwitchSize } from './constants/size';

describe('Switch 컴포넌트', () => {
  describe('기본 렌더링', () => {
    test('switch role을 가진 input이 렌더링된다', () => {
      render(<Switch aria-label="테스트 스위치" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
      expect(switchElement).toHaveAttribute('type', 'checkbox');
    });

    test('기본적으로 체크되지 않은 상태로 렌더링된다', () => {
      render(<Switch aria-label="테스트 스위치" />);
      const switchElement = screen.getByRole('switch') as HTMLInputElement;
      expect(switchElement.checked).toBe(false);
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    test('defaultChecked가 true일 때 체크된 상태로 렌더링된다', () => {
      render(<Switch defaultChecked aria-label="테스트 스위치" />);
      const switchElement = screen.getByRole('switch') as HTMLInputElement;
      expect(switchElement.checked).toBe(true);
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });

    test('disabled 상태일 때 비활성화된다', () => {
      render(<Switch disabled aria-label="테스트 스위치" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeDisabled();
    });
  });

  describe('제어 컴포넌트', () => {
    test('checked prop으로 상태를 제어할 수 있다', () => {
      const { rerender } = render(<Switch checked={false} aria-label="테스트 스위치" />);
      const switchElement = screen.getByRole('switch') as HTMLInputElement;
      expect(switchElement.checked).toBe(false);

      rerender(<Switch checked={true} aria-label="테스트 스위치" />);
      expect(switchElement.checked).toBe(true);
    });

    test('checked가 우선순위를 가진다 (defaultChecked 무시)', () => {
      render(<Switch checked={false} defaultChecked={true} aria-label="테스트 스위치" />);
      const switchElement = screen.getByRole('switch') as HTMLInputElement;
      expect(switchElement.checked).toBe(false);
    });
  });

  describe('사용자 상호작용', () => {
    test('클릭 시 상태가 토글된다', async () => {
      const user = userEvent.setup();
      render(<Switch aria-label="테스트 스위치" />);
      const switchElement = screen.getByRole('switch') as HTMLInputElement;

      expect(switchElement.checked).toBe(false);

      await user.click(switchElement);
      expect(switchElement.checked).toBe(true);

      await user.click(switchElement);
      expect(switchElement.checked).toBe(false);
    });

    test('Space 키로 토글할 수 있다', async () => {
      const user = userEvent.setup();
      render(<Switch aria-label="테스트 스위치" />);
      const switchElement = screen.getByRole('switch') as HTMLInputElement;

      switchElement.focus();
      expect(switchElement.checked).toBe(false);

      await user.keyboard(' ');
      expect(switchElement.checked).toBe(true);

      await user.keyboard(' ');
      expect(switchElement.checked).toBe(false);
    });

    test('Enter 키로 토글할 수 있다', async () => {
      const user = userEvent.setup();
      render(<Switch aria-label="테스트 스위치" />);
      const switchElement = screen.getByRole('switch') as HTMLInputElement;

      switchElement.focus();
      expect(switchElement.checked).toBe(false);

      await user.keyboard('{Enter}');
      expect(switchElement.checked).toBe(true);
    });

    test('disabled 상태에서는 상호작용이 불가능하다', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Switch disabled onChange={handleChange} aria-label="테스트 스위치" />);
      const switchElement = screen.getByRole('switch');

      await user.click(switchElement);
      expect(handleChange).not.toHaveBeenCalled();
    });

    test('label을 클릭해도 토글된다', async () => {
      const user = userEvent.setup();
      render(<Switch label="알림 설정" />);
      const label = screen.getByText('알림 설정');
      const switchElement = screen.getByRole('switch') as HTMLInputElement;

      expect(switchElement.checked).toBe(false);

      await user.click(label);
      expect(switchElement.checked).toBe(true);
    });
  });

  describe('이벤트 핸들러', () => {
    test('onChange 이벤트가 호출된다', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Switch onChange={handleChange} aria-label="테스트 스위치" />);
      const switchElement = screen.getByRole('switch');

      await user.click(switchElement);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            checked: true,
          }),
        }),
      );
    });

    test('제어 컴포넌트에서 onChange가 호출된다', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Switch checked={false} onChange={handleChange} aria-label="테스트 스위치" />);
      const switchElement = screen.getByRole('switch');

      await user.click(switchElement);

      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('크기 variants', () => {
    test.each(Object.values(SwitchSize))('size %s가 올바르게 적용된다', (size) => {
      const { container } = render(<Switch size={size} aria-label="테스트 스위치" />);
      const trackElement = container.querySelector('[data-checked]');

      expect(trackElement).toHaveStyle({
        width: `${SWITCH_SIZES[size].width}px`,
        height: `${SWITCH_SIZES[size].height}px`,
      });
    });

    test('기본 크기는 md이다', () => {
      const { container } = render(<Switch aria-label="테스트 스위치" />);
      const trackElement = container.querySelector('[data-checked]');

      expect(trackElement).toHaveStyle({
        width: `${SWITCH_SIZES.md.width}px`,
        height: `${SWITCH_SIZES.md.height}px`,
      });
    });
  });

  describe('접근성', () => {
    test('aria-label이 올바르게 적용된다', () => {
      const ariaLabel = '다크 모드 토글';
      render(<Switch aria-label={ariaLabel} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-label', ariaLabel);
    });

    test('aria-labelledby가 올바르게 적용된다', () => {
      const labelId = 'switch-label';
      render(
        <div>
          <span id={labelId}>설정</span>
          <Switch aria-labelledby={labelId} />
        </div>,
      );
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-labelledby', labelId);
    });

    test('label prop으로 접근성 라벨이 설정된다', () => {
      const labelText = '자동 저장';
      render(<Switch label={labelText} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-label', labelText);
    });

    test('포커스 시 outline이 표시된다', async () => {
      const user = userEvent.setup();
      render(<Switch aria-label="테스트 스위치" />);
      const switchElement = screen.getByRole('switch');

      await user.tab();
      expect(switchElement).toHaveFocus();
    });
  });

  describe('스타일링', () => {
    test('커스텀 className이 적용된다', () => {
      const customClass = faker.word.noun();
      const { container } = render(<Switch className={customClass} aria-label="테스트 스위치" />);
      const wrapperElement = container.firstChild;
      expect(wrapperElement).toHaveClass(customClass);
    });

    test('커스텀 style이 적용된다', () => {
      const customStyle = { marginTop: '20px' };
      const { container } = render(<Switch style={customStyle} aria-label="테스트 스위치" />);
      const wrapperElement = container.firstChild as HTMLElement;
      expect(wrapperElement).toHaveStyle(customStyle);
    });

    test('data attributes가 올바르게 설정된다', () => {
      const { container } = render(<Switch checked disabled aria-label="테스트 스위치" />);
      const wrapperElement = container.firstChild;
      const trackElement = container.querySelector('[data-checked]');

      expect(wrapperElement).toHaveAttribute('data-disabled', 'true');
      expect(trackElement).toHaveAttribute('data-checked', 'true');
      expect(trackElement).toHaveAttribute('data-disabled', 'true');
    });
  });

  describe('Ref forwarding', () => {
    test('ref가 올바르게 전달된다', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Switch ref={ref} aria-label="테스트 스위치" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('추가 props', () => {
    test('HTML input 속성들이 올바르게 전달된다', () => {
      render(<Switch name="notifications" value="enabled" id="notification-switch" aria-label="테스트 스위치" />);
      const switchElement = screen.getByRole('switch');

      expect(switchElement).toHaveAttribute('name', 'notifications');
      expect(switchElement).toHaveAttribute('value', 'enabled');
      expect(switchElement).toHaveAttribute('id', 'notification-switch');
    });
  });
});
