import '@testing-library/jest-dom';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch 컴포넌트', () => {
  test('checked와 defaultChecked를 주입하지 않으면 스위치가 꺼진 상태로 렌더링된다', () => {
    render(<Switch />);
    const input = screen.getByRole('switch') as HTMLInputElement;
    expect(input.checked).toBe(false);
  });

  test('defaultChecked를 주입하면 스위치가 켜진 상태로 렌더링된다', () => {
    render(<Switch defaultChecked />);
    const input = screen.getByRole('switch') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  test('checked를 주입하면 스위치가 켜진다', () => {
    render(<Switch checked />);
    const input = screen.getByRole('switch') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  test('defaultChecked를 주입하더라도 checked를 false로 주입하면 스위치가 꺼진다', () => {
    render(<Switch defaultChecked checked={false} />);
    const input = screen.getByRole('switch') as HTMLInputElement;
    expect(input.checked).toBe(false);
  });

  test('disabled 상태에서는 클릭 이벤트가 발생하지 않는다', () => {
    const handleChange = vi.fn();
    render(<Switch disabled onChange={handleChange} />);

    const input = screen.getByRole('switch') as HTMLInputElement;
    userEvent.click(input);

    expect(handleChange).not.toHaveBeenCalled();
  });

  test('ref가 올바르게 전달된다', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Switch ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test('className을 주입하면 추가로 전달한다.', () => {
    const customClassName = faker.word.noun();
    render(<Switch className={customClassName} />);
    expect(screen.getByRole('switch')).toHaveClass(customClassName);
  });
});
