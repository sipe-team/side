import { userEvent } from '@vitest/browser/context';
import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

describe('Radio Group Component', () => {
  test('Radio 옵션이 정확히 렌더링 된다.', async () => {
    const screen = render(
      <RadioGroup name="fruits">
        <Radio value={'apple'}>사과</Radio>
        <Radio value={'orange'}>오렌지</Radio>
        <Radio value={'grape'}>포도</Radio>
      </RadioGroup>,
    );

    await expect.element(screen.getByText('사과')).toBeInTheDocument();
  });

  test('비제어 방식에서 Radio 옵션을 클릭하면 해당 옵션이 선택 되어야 한다.', async () => {
    const screen = render(
      <form>
        <RadioGroup name="fruits">
          <Radio value={'apple'}>사과</Radio>
          <Radio value={'orange'}>오렌지</Radio>
          <Radio value={'grape'}>포도</Radio>
        </RadioGroup>
      </form>,
    );

    const orangeRadio = screen.getByRole('radio', { name: '오렌지' });
    const user = userEvent.setup();

    await user.click(orangeRadio);

    const form = screen.getByRole('form');
    await expect.element(form).toBeInTheDocument();

    const formData = new FormData(form.element() as HTMLFormElement);
    expect(formData.get('fruits')).toBe('orange');
  });

  test('제어 방식에서 Radio 옵션을 클릭하면 해당 옵션이 선택 되어야 한다.', async () => {
    const handleChange = vi.fn();
    const screen = render(
      <RadioGroup value="apple" onChangeValue={handleChange}>
        <Radio value="apple">사과</Radio>
        <Radio value="orange">오렌지</Radio>
        <Radio value="grape">포도</Radio>
      </RadioGroup>,
    );

    const orangeRadio = screen.getByRole('radio', { name: '오렌지' });
    const user = userEvent.setup();

    await user.click(orangeRadio);

    expect(handleChange).toHaveBeenCalledWith('orange');
  });

  test.each(['small', 'medium', 'large'] as const)('%s 크기로 RadioGroup 컴포넌트 크기를 결정한다.', async (size) => {
    const screen = render(
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

    const radio = screen.getByRole('radio', { name: '사과' });
    await expect.element(radio).toHaveStyle({
      width: sizeMap[size],
      height: sizeMap[size],
    });
  });

  test('RadioGroup이 비활성화(disabled) 상태일 경우 선택할 수 없어야 한다.', async () => {
    const handleChange = vi.fn();

    const screen = render(
      <RadioGroup disabled name="fruits" onChangeValue={handleChange}>
        <Radio value="apple">사과</Radio>
        <Radio value="orange">오렌지</Radio>
      </RadioGroup>,
    );

    const orangeRadio = screen.getByRole('radio', { name: '오렌지' });
    const user = userEvent.setup();

    await user.click(orangeRadio);

    expect(handleChange).not.toHaveBeenCalled();
    await expect.element(orangeRadio).toBeDisabled();
  });

  test('Radio가 비활성화(disabled) 상태일 경우 선택할 수 없어야 한다.', async () => {
    const handleChange = vi.fn();

    const screen = render(
      <RadioGroup name="fruits">
        <Radio value="apple">사과</Radio>
        <Radio value="orange" disabled>
          오렌지
        </Radio>
        <Radio value="grape">포도</Radio>
      </RadioGroup>,
    );

    const orangeRadio = screen.getByRole('radio', { name: '오렌지' });
    const user = userEvent.setup();

    await user.click(orangeRadio);

    expect(handleChange).not.toHaveBeenCalled();
    await expect.element(orangeRadio).toBeDisabled();
  });

  test('초기 설정된 기본값이 있다면 해당 Radio가 먼저 선택되어야 한다.', async () => {
    const screen = render(
      <RadioGroup defaultValue="orange" name="fruits">
        <Radio value="apple">사과</Radio>
        <Radio value="orange">오렌지</Radio>
        <Radio value="grape">포도</Radio>
      </RadioGroup>,
    );

    const orangeRadio = screen.getByRole('radio', { name: '오렌지' });
    await expect.element(orangeRadio).toBeChecked();
  });

  test('Radio가 클릭될 때 지정된 이벤트 핸들러가 호출된다', async () => {
    const handleChange = vi.fn();

    const screen = render(
      <RadioGroup name="fruits" onChangeValue={handleChange}>
        <Radio value="apple">사과</Radio>
        <Radio value="orange">오렌지</Radio>
      </RadioGroup>,
    );

    const orangeRadio = screen.getByRole('radio', { name: '오렌지' });
    const user = userEvent.setup();

    await user.click(orangeRadio);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('orange');
  });
});
