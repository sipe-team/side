import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Checkbox, CheckboxSize } from './Checkbox';
import { CHECKBOX_SIZES } from './Checkbox.css';

describe('Checkbox 기본 동작 테스트', () => {
  test('체크박스의 상태를 설정할 수 있다.', () => {
    render(
      <Checkbox.Root checked={true}>
        <Checkbox.Input />
        <Checkbox.Label>Test Checkbox</Checkbox.Label>
      </Checkbox.Root>,
    );
    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  test('체크박스의 레이블을 클릭하면 체크박스의 상태가 변경된다.', () => {
    const handleChange = vi.fn();
    render(
      <Checkbox.Root onCheckboxChange={handleChange}>
        <Checkbox.Input />
        <Checkbox.Label>Test Checkbox</Checkbox.Label>
      </Checkbox.Root>,
    );
    const label = screen.getByText('Test Checkbox');
    fireEvent.click(label);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  test('체크박스를 클릭하면 체크박스의 상태가 변경된다.', () => {
    const handleChange = vi.fn();
    render(
      <Checkbox.Root onCheckboxChange={handleChange}>
        <Checkbox.Input />
        <Checkbox.Label>Test Checkbox</Checkbox.Label>
      </Checkbox.Root>,
    );
    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});

describe('Checkbox 스타일 테스트', () => {
  test('전달받은 style을 컴포넌트에 적용한다.', () => {
    const testStyle = { backgroundColor: 'red' };
    render(
      <Checkbox.Root style={testStyle}>
        <Checkbox.Input />
        <Checkbox.Label>Test Checkbox</Checkbox.Label>
      </Checkbox.Root>,
    );
    const checkbox = screen.getByLabelText('Test Checkbox').parentElement;
    expect(checkbox).toHaveStyle(testStyle);
  });

  test('checked를 주입하지 않으면 checkbox가 체크되지 않은 상태로 렌더링된다.', () => {
    render(
      <Checkbox.Root>
        <Checkbox.Input />
        <Checkbox.Label>Test Checkbox</Checkbox.Label>
      </Checkbox.Root>,
    );

    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  test('checked를 주입하면 checkbox가 체크된 상태로 렌더링된다.', () => {
    render(
      <Checkbox.Root checked={true}>
        <Checkbox.Input />
        <Checkbox.Label>Test Checkbox</Checkbox.Label>
      </Checkbox.Root>,
    );

    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  test('disabled를 주입하지 않으면 checkbox가 활성화된 상태로 렌더링된다.', () => {
    render(
      <Checkbox.Root>
        <Checkbox.Input />
        <Checkbox.Label>Test Checkbox</Checkbox.Label>
      </Checkbox.Root>,
    );

    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    expect(checkbox.disabled).toBe(false);
  });

  test('disabled를 주입하면 checkbox가 비활성화된 상태로 렌더링된다.', () => {
    render(
      <Checkbox.Root disabled={true}>
        <Checkbox.Input />
        <Checkbox.Label>Test Checkbox</Checkbox.Label>
      </Checkbox.Root>,
    );

    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
  });

  test.each(Object.values(CheckboxSize))('size로 %s 주입시 input의 크기가 %s에 맞게 설정된다.', (size) => {
    render(
      <Checkbox.Root size={size}>
        <Checkbox.Input />
        <Checkbox.Label>Test Checkbox</Checkbox.Label>
      </Checkbox.Root>,
    );

    const checkbox = screen.getByLabelText('Test Checkbox');
    expect(checkbox).toHaveStyle({
      width: CHECKBOX_SIZES[size].inputSize,
      height: CHECKBOX_SIZES[size].inputSize,
    });
  });

  test('size를 주입하지 않으면 기본 값 medium로 크기를 설정한다.', () => {
    render(
      <Checkbox.Root>
        <Checkbox.Input />
        <Checkbox.Label>Test Checkbox</Checkbox.Label>
      </Checkbox.Root>,
    );

    const checkbox = screen.getByLabelText('Test Checkbox');
    expect(checkbox).toHaveStyle({
      width: CHECKBOX_SIZES[CheckboxSize.medium].inputSize,
      height: CHECKBOX_SIZES[CheckboxSize.medium].inputSize,
    });
  });
});

describe('Checkbox 이벤트 테스트', () => {
  test('체크박스 영역을 클릭하면 onChange 콜백이 호출된다.', () => {
    const handleChange = vi.fn();
    render(
      <Checkbox.Root onCheckboxChange={handleChange}>
        <Checkbox.Input />
        <Checkbox.Label>Test Checkbox</Checkbox.Label>
      </Checkbox.Root>,
    );

    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
  });
});

describe('Checkbox 접근성 테스트', () => {
  test('label을 통해 체크박스의 용도를 제공한다.', () => {
    render(
      <Checkbox.Root>
        <Checkbox.Input />
        <Checkbox.Label>Accessible Checkbox</Checkbox.Label>
      </Checkbox.Root>,
    );

    const checkbox = screen.getByLabelText('Accessible Checkbox');
    expect(checkbox).toBeInTheDocument();
  });
});
