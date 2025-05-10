import { userEvent } from '@vitest/browser/context';
import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { Checkbox } from './Checkbox';
import { CHECKBOX_SIZES, type CheckboxSize } from './constants/size';

describe('Checkbox 기본 동작 테스트', () => {
  test('체크박스의 상태를 설정할 수 있다.', async () => {
    const screen = render(<Checkbox checked={true} label="Test Checkbox" />);
    const checkbox = screen.getByLabelText('Test Checkbox');

    await expect.element(checkbox).toBeChecked();
  });

  test('체크박스의 레이블을 클릭하면 체크박스의 상태가 변경된다.', async () => {
    const handleChange = vi.fn();
    const screen = render(<Checkbox label="Test Checkbox" onCheckedChange={handleChange} />);
    const label = screen.getByText('Test Checkbox');
    const user = userEvent.setup();

    await user.click(label);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  test('체크박스를 클릭하면 체크박스의 상태가 변경된다.', async () => {
    const handleChange = vi.fn();
    const screen = render(<Checkbox label="Test Checkbox" onCheckedChange={handleChange} />);
    const checkbox = screen.getByLabelText('Test Checkbox');
    const user = userEvent.setup();

    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
  });
});

describe('Checkbox 스타일 테스트', () => {
  test('전달받은 style을 컴포넌트에 적용한다.', async () => {
    const screen = render(<Checkbox data-testid="checkbox" label="Test Checkbox" style={{ margin: '10px' }} />);
    const container = screen.getByTestId('checkbox');

    await expect.element(container).toHaveStyle({ margin: '10px' });
  });

  test('checked를 주입하지 않으면 checkbox가 체크되지 않은 상태로 렌더링된다.', async () => {
    const screen = render(<Checkbox label="Test Checkbox" />);
    const checkbox = screen.getByLabelText('Test Checkbox');

    await expect.element(checkbox).not.toBeChecked();
  });

  test('checked를 주입하면 checkbox가 체크된 상태로 렌더링된다.', async () => {
    const screen = render(<Checkbox checked={true} label="Test Checkbox" />);
    const checkbox = screen.getByLabelText('Test Checkbox');

    await expect.element(checkbox).toBeChecked();
  });

  test('disabled를 주입하지 않으면 checkbox가 활성화된 상태로 렌더링된다.', async () => {
    const screen = render(<Checkbox label="Test Checkbox" />);
    const checkbox = screen.getByLabelText('Test Checkbox');

    await expect.element(checkbox).not.toBeDisabled();
  });

  test('disabled를 주입하면 checkbox가 비활성화된 상태로 렌더링된다.', async () => {
    const screen = render(<Checkbox disabled={true} label="Test Checkbox" />);
    const checkbox = screen.getByLabelText('Test Checkbox');

    await expect.element(checkbox).toBeDisabled();
  });

  test.each(['small', 'medium', 'large'])('size로 %s주입시 해당 크기로 checkbox의 크기를 설정한다.', async (size) => {
    const screen = render(<Checkbox data-testid="checkbox" size={size as CheckboxSize} label="Test Checkbox" />);
    const container = screen.getByTestId('checkbox');
    const expectedSize = CHECKBOX_SIZES[size as CheckboxSize].checkboxSize;

    await expect.element(container).toHaveStyle(`--checkbox-size: ${expectedSize}px`);
  });

  test('size를 주입하지 않으면 기본 값 medium로 크기를 설정한다.', async () => {
    const screen = render(<Checkbox data-testid="checkbox" label="Test Checkbox" />);
    const container = screen.getByTestId('checkbox');

    await expect.element(container).toHaveStyle(`--checkbox-size: ${CHECKBOX_SIZES.medium.checkboxSize}px`);
  });
});

describe('Checkbox 이벤트 테스트', () => {
  test('체크박스 영역을 클릭하면 onChange 콜백이 호출된다.', async () => {
    const handleChange = vi.fn();
    const screen = render(<Checkbox label="Test Checkbox" onCheckedChange={handleChange} />);
    const checkbox = screen.getByLabelText('Test Checkbox');
    const user = userEvent.setup();

    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
  });
});

describe('Checkbox 접근성 테스트', () => {
  test('label을 통해 체크박스의 용도를 제공한다.', async () => {
    const screen = render(<Checkbox label="Accessible Checkbox" />);
    const checkbox = screen.getByLabelText('Accessible Checkbox');

    await expect.element(checkbox).toBeInTheDocument();
  });
});
