import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';
import { RadioSize } from './constants/sizes';

describe('Radio Group Component', () => {
  test('Radio 옵션이 정확히 렌더링 된다.', () => {
    render(
      <RadioGroup name="fruits">
        <Radio value="apple">사과</Radio>
        <Radio value="orange">오렌지</Radio>
        <Radio value="grape">포도</Radio>
      </RadioGroup>,
    );

    expect(screen.getByText('사과')).toBeInTheDocument();
    expect(screen.getByText('오렌지')).toBeInTheDocument();
    expect(screen.getByText('포도')).toBeInTheDocument();
  });

  test('비제어 방식에서 Radio 옵션을 클릭하면 해당 옵션이 선택 되어야 한다.', async () => {
    const user = userEvent.setup();

    render(
      <form>
        <RadioGroup name="fruits">
          <Radio value="apple">사과</Radio>
          <Radio value="orange">오렌지</Radio>
          <Radio value="grape">포도</Radio>
        </RadioGroup>
      </form>,
    );

    const orangeRadio = screen.getByRole('radio', { name: '오렌지' });
    await user.click(orangeRadio);

    const form = orangeRadio.closest('form');
    expect(form).toBeInTheDocument();

    const formData = new FormData(form as HTMLFormElement);
    expect(formData.get('fruits')).toBe('orange');
  });

  test('제어 방식에서 Radio 옵션을 클릭하면 해당 옵션이 선택 되어야 한다.', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <RadioGroup value="apple" onChangeValue={handleChange}>
        <Radio value="apple">사과</Radio>
        <Radio value="orange">오렌지</Radio>
        <Radio value="grape">포도</Radio>
      </RadioGroup>,
    );

    const orangeRadio = screen.getByRole('radio', { name: '오렌지' });
    await user.click(orangeRadio);

    expect(handleChange).toHaveBeenCalledWith('orange');
  });

  test.each(Object.values(RadioSize))('%s 크기로 RadioGroup 컴포넌트 크기를 결정한다.', (size) => {
    render(
      <RadioGroup size={size}>
        <Radio value="apple">사과</Radio>
      </RadioGroup>,
    );

    const radio = screen.getByRole('radio', { name: '사과' });

    expect(radio).toHaveClass(expect.stringMatching(/radioInput_/));
  });

  test('RadioGroup이 비활성화(disabled) 상태일 경우 선택할 수 없어야 한다.', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <RadioGroup disabled name="fruits" onChangeValue={handleChange}>
        <Radio value="apple">사과</Radio>
        <Radio value="orange">오렌지</Radio>
      </RadioGroup>,
    );

    const orangeRadio = screen.getByRole('radio', { name: '오렌지' });
    await user.click(orangeRadio);

    expect(handleChange).not.toHaveBeenCalled();
    expect(orangeRadio).toBeDisabled();
  });

  test('Radio가 비활성화(disabled) 상태일 경우 선택할 수 없어야 한다.', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <RadioGroup name="fruits" onChangeValue={handleChange}>
        <Radio value="apple">사과</Radio>
        <Radio value="orange" disabled>
          오렌지
        </Radio>
        <Radio value="grape">포도</Radio>
      </RadioGroup>,
    );

    const orangeRadio = screen.getByRole('radio', { name: '오렌지' });
    await user.click(orangeRadio);

    expect(handleChange).not.toHaveBeenCalled();
    expect(orangeRadio).toBeDisabled();
  });

  test('초기 설정된 기본값이 있다면 해당 Radio가 먼저 선택되어야 한다.', () => {
    render(
      <RadioGroup defaultValue="orange" name="fruits">
        <Radio value="apple">사과</Radio>
        <Radio value="orange">오렌지</Radio>
        <Radio value="grape">포도</Radio>
      </RadioGroup>,
    );

    const orangeRadio = screen.getByRole('radio', { name: '오렌지' });
    expect(orangeRadio).toBeChecked();
  });

  test('Radio가 클릭될 때 지정된 이벤트 핸들러가 호출된다', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <RadioGroup name="fruits" onChangeValue={handleChange}>
        <Radio value="apple">사과</Radio>
        <Radio value="orange">오렌지</Radio>
      </RadioGroup>,
    );

    const orangeRadio = screen.getByRole('radio', { name: '오렌지' });
    await user.click(orangeRadio);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('orange');
  });

  test('레이블이 제공되면 fieldset의 legend로 표시된다.', () => {
    const labelText = '좋아하는 과일을 선택하세요';

    render(
      <RadioGroup labelText={labelText}>
        <Radio value="apple">사과</Radio>
        <Radio value="orange">오렌지</Radio>
      </RadioGroup>,
    );

    expect(screen.getByText(labelText)).toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  test('className prop이 제대로 적용된다.', () => {
    const customClassName = 'custom-radio-group';

    render(
      <RadioGroup className={customClassName}>
        <Radio value="apple">사과</Radio>
      </RadioGroup>,
    );

    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass(customClassName);
  });

  test('Radio 컴포넌트에 className이 제대로 적용된다.', () => {
    const customClassName = 'custom-radio';

    render(
      <RadioGroup>
        <Radio value="apple" className={customClassName}>
          사과
        </Radio>
      </RadioGroup>,
    );

    const radioLabel = screen.getByText('사과').closest('label');
    expect(radioLabel).toHaveClass(customClassName);
  });

  test('라벨을 클릭해도 라디오가 선택된다.', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <RadioGroup onChangeValue={handleChange}>
        <Radio value="apple">사과</Radio>
      </RadioGroup>,
    );

    const label = screen.getByText('사과');
    await user.click(label);

    expect(handleChange).toHaveBeenCalledWith('apple');
  });

  test('키보드 네비게이션이 작동한다.', async () => {
    const user = userEvent.setup();

    render(
      <RadioGroup name="fruits">
        <Radio value="apple">사과</Radio>
        <Radio value="orange">오렌지</Radio>
        <Radio value="grape">포도</Radio>
      </RadioGroup>,
    );

    const firstRadio = screen.getByRole('radio', { name: '사과' });

    await user.click(firstRadio);
    expect(firstRadio).toHaveFocus();

    await user.keyboard(' ');
    expect(firstRadio).toBeChecked();
  });
});
