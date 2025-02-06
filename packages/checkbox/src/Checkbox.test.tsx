import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Checkbox } from './Checkbox';
import { CHECKBOX_SIZES, type CheckboxSize } from './constants/size';

describe('Checkbox 기본 동작 테스트', () => {
  test('체크박스의 상태를 설정할 수 있다.', () => {
    render(<Checkbox checked={true} label="Test Checkbox" />);
    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  test('체크박스의 레이블을 클릭하면 체크박스의 상태가 변경된다.', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Test Checkbox" onCheckedChange={handleChange} />);
    const label = screen.getByText('Test Checkbox');
    fireEvent.click(label);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  test('체크박스를 클릭하면 체크박스의 상태가 변경된다.', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Test Checkbox" onCheckedChange={handleChange} />);
    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});

describe('Checkbox 스타일 테스트', () => {
  test('전달받은 style을 컴포넌트에 적용한다.', () => {
    render(<Checkbox label="Test Checkbox" style={{ margin: '10px' }} />);
    const checkbox = screen.getByLabelText('Test Checkbox').parentElement;
    expect(checkbox).toHaveStyle('margin: 10px');
  });

  test('checked를 주입하지 않으면 checkbox가 체크되지 않은 상태로 렌더링된다.', () => {
    render(<Checkbox label="Test Checkbox" />);
    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  test('checked를 주입하면 checkbox가 체크된 상태로 렌더링된다.', () => {
    render(<Checkbox checked={true} label="Test Checkbox" />);
    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  test('disabled를 주입하지 않으면 checkbox가 활성화된 상태로 렌더링된다.', () => {
    render(<Checkbox label="Test Checkbox" />);
    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    expect(checkbox.disabled).toBe(false);
  });

  test('disabled를 주입하면 checkbox가 비활성화된 상태로 렌더링된다.', () => {
    render(<Checkbox disabled={true} label="Test Checkbox" />);
    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
  });

  test.each(['small', 'medium', 'large'])('size로 %s주입시 해당 크기로 checkbox의 크기를 설정한다.', (size) => {
    render(<Checkbox size={size as CheckboxSize} label="Test Checkbox" />);
    const checkbox = screen.getByLabelText('Test Checkbox').parentElement;
    const expectedSize = CHECKBOX_SIZES[size as CheckboxSize].checkboxSize;
    expect(checkbox).toHaveStyle(`--checkbox-size: ${expectedSize}px`);
  });

  test('size를 주입하지 않으면 기본 값 medium로 크기를 설정한다.', () => {
    render(<Checkbox label="Test Checkbox" />);
    const checkbox = screen.getByLabelText('Test Checkbox').parentElement;
    expect(checkbox).toHaveStyle(`--checkbox-size: ${CHECKBOX_SIZES.medium.checkboxSize}px`);
  });
});

describe('Checkbox 이벤트 테스트', () => {
  // default
  test('체크박스 영역을 클릭하면 onChange 콜백이 호출된다.', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Test Checkbox" onCheckedChange={handleChange} />);
    const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});

describe('Checkbox 접근성 테스트', () => {
  test('label을 통해 체크박스의 용도를 제공한다.', () => {
    render(<Checkbox label="Accessible Checkbox" />);
    const checkbox = screen.getByLabelText('Accessible Checkbox');
    expect(checkbox).toBeInTheDocument();
  });
});
