import { render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

describe('Radio Group Component', () => {
  test('Radio 옵션이 정확히 렌더링 된다.', () => {
    const { getByText } = render(
      <RadioGroup name="fruits">
        <Radio value={'apple'}>사과</Radio>
        <Radio value={'orange'}>오렌지</Radio>
        <Radio value={'grape'}>포도</Radio>
      </RadioGroup>,
    );

    expect(getByText('사과')).toBeInTheDocument();
  });

  test('비제어 방식에서 Radio 옵션을 클릭하면 해당 옵션이 선택 되어야 한다.', () => {
    const { getByRole } = render(
      <form>
        <RadioGroup name="fruits">
          <Radio value={'apple'}>사과</Radio>
          <Radio value={'orange'}>오렌지</Radio>
          <Radio value={'grape'}>포도</Radio>
        </RadioGroup>
      </form>,
    );

    const orangeRadio = getByRole('radio', { name: '오렌지' });
    orangeRadio.click();

    const form = orangeRadio.closest('form');
    expect(form).toBeInTheDocument(); // form 존재 여부 체크

    const formData = new FormData(form as HTMLFormElement);
    expect(formData.get('fruits')).toBe('orange');
  });

  test('제어 방식에서 Radio 옵션을 클릭하면 해당 옵션이 선택 되어야 한다.', () => {
    const handleChange = vi.fn();
    const { getByRole } = render(
      <RadioGroup value="apple" onChangeValue={handleChange}>
        <Radio value="apple">사과</Radio>
        <Radio value="orange">오렌지</Radio>
        <Radio value="grape">포도</Radio>
      </RadioGroup>,
    );

    const orangeRadio = getByRole('radio', { name: '오렌지' });
    orangeRadio.click();

    expect(handleChange).toHaveBeenCalledWith('orange');
  });

  test.each(['small', 'medium', 'large'] as const)(
    '%s 크기로 RadioGroup 컴포넌트 크기를 결정한다.',
    (size) => {
      const { getByRole } = render(
        <RadioGroup size={size}>
          <Radio value={'apple'}>사과</Radio>
          <Radio value={'orange'}>오렌지</Radio>
          <Radio value={'grape'}>포도</Radio>
        </RadioGroup>,
      );

      const sizeMap = {
        small: '12px',
        medium: '16px',
        large: '20px',
      };

      const radio = getByRole('radio', { name: '사과' });
      expect(radio).toHaveStyle({
        width: sizeMap[size],
        height: sizeMap[size],
      });
    },
  );

  test('RadioGroup이 비활성화(disabled) 상태일 경우 선택할 수 없어야 한다.', () => {
    const handleChange = vi.fn();

    const { getByRole } = render(
      <RadioGroup disabled name="fruits" onChangeValue={handleChange}>
        <Radio value="apple">사과</Radio>
        <Radio value="orange">오렌지</Radio>
      </RadioGroup>,
    );

    const orangeRadio = getByRole('radio', { name: '오렌지' });
    orangeRadio.click();

    expect(handleChange).not.toHaveBeenCalled();
    expect(orangeRadio).toBeDisabled();
  });

  test('Radio가 비활성화(disabled) 상태일 경우 선택할 수 없어야 한다.', () => {
    const handleChange = vi.fn();

    const { getByRole } = render(
      <RadioGroup name="fruits">
        <Radio value="apple">사과</Radio>
        <Radio value="orange" disabled>
          오렌지
        </Radio>
        <Radio value="grape">포도</Radio>
      </RadioGroup>,
    );

    const orangeRadio = getByRole('radio', { name: '오렌지' });
    orangeRadio.click();

    expect(handleChange).not.toHaveBeenCalled();
    expect(orangeRadio).toBeDisabled();
  });

  test('초기 설정된 기본값이 있다면 해당 Radio가 먼저 선택되어야 한다.', () => {
    const { getByRole } = render(
      <RadioGroup defaultValue="orange" name="fruits">
        <Radio value="apple">사과</Radio>
        <Radio value="orange">오렌지</Radio>
        <Radio value="grape">포도</Radio>
      </RadioGroup>,
    );

    const orangeRadio = getByRole('radio', { name: '오렌지' });
    expect(orangeRadio).toBeChecked();
  });

  test('Radio가 클릭될 때 지정된 이벤트 핸들러가 호출된다', () => {
    const handleChange = vi.fn();

    const { getByRole } = render(
      <RadioGroup name="fruits" onChangeValue={handleChange}>
        <Radio value="apple">사과</Radio>
        <Radio value="orange">오렌지</Radio>
      </RadioGroup>,
    );

    const orangeRadio = getByRole('radio', { name: '오렌지' });
    orangeRadio.click();

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('orange');
  });
});
