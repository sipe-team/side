import { faker } from '@faker-js/faker';
import { userEvent } from '@vitest/browser/context';
import { createRef } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { Switch } from './Switch';

describe('Switch 컴포넌트', () => {
  test('checked와 defaultChecked를 주입하지 않으면 스위치가 꺼진 상태로 렌더링된다', async () => {
    const screen = render(<Switch />);
    const input = screen.getByRole('switch');
    await expect.element(input).not.toBeChecked();
  });

  test('defaultChecked를 주입하면 스위치가 켜진 상태로 렌더링된다', async () => {
    const screen = render(<Switch defaultChecked />);
    const input = screen.getByRole('switch');
    await expect.element(input).toBeChecked();
  });

  test('checked를 주입하면 스위치가 켜진다', async () => {
    const screen = render(<Switch checked />);
    const input = screen.getByRole('switch');
    await expect.element(input).toBeChecked();
  });

  test('defaultChecked를 주입하더라도 checked를 false로 주입하면 스위치가 꺼진다', async () => {
    const screen = render(<Switch defaultChecked checked={false} />);
    const input = screen.getByRole('switch');
    await expect.element(input).not.toBeChecked();
  });

  test('disabled 상태에서는 클릭 이벤트가 발생하지 않는다', async () => {
    const handleChange = vi.fn();
    const screen = render(<Switch disabled onChange={handleChange} />);

    const input = screen.getByRole('switch');
    const user = userEvent.setup();

    await user.click(input);

    expect(handleChange).not.toHaveBeenCalled();
  });

  test('ref가 올바르게 전달된다', async () => {
    const ref = createRef<HTMLInputElement>();
    render(<Switch ref={ref} />);
    await expect.element(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test('className을 주입하면 추가로 전달한다.', async () => {
    const customClassName = faker.word.noun();
    const screen = render(<Switch className={customClassName} />);
    await expect.element(screen.getByRole('switch')).toHaveClass(customClassName);
  });
});
