import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { useState } from 'react';
import { Checkbox, CheckboxGroup } from './Checkbox';

test('체크박스를 클릭하면 상태가 변경된다.', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="테스트" />);

    const checkbox = screen.getByRole('checkbox', { name: '테스트' });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
});

test('disabled 상태의 체크박스는 클릭할 수 없다.', async () => {
    const user = userEvent.setup();
    render(<Checkbox disabled label="테스트" />);

    const checkbox = screen.getByRole('checkbox', { name: '테스트' });
    expect(checkbox).toBeDisabled();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
});

test('size를 주입하지 않으면 기본값 md로 설정된다.', () => {
    render(<Checkbox label="테스트" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveStyle({ width: '20px', height: '20px' });
});

test.each([
    { size: 'sm', expected: '16px' },
    { size: 'md', expected: '20px' },
    { size: 'lg', expected: '24px' },
] as const)('size가 $size일 때 체크박스 크기가 $expected로 설정된다.', ({ size, expected }) => {
    render(<Checkbox size={size} label="테스트" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveStyle({ width: expected, height: expected });
});

test('체크박스 그룹에서 여러 항목을 선택할 수 있다.', async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
        const [selected, setSelected] = useState<string[]>([]);
        return (
            <CheckboxGroup value={selected} onChange={setSelected}>
                <Checkbox value="1" label="항목 1" />
                <Checkbox value="2" label="항목 2" />
                <Checkbox value="3" label="항목 3" />
            </CheckboxGroup>
        );
    };

    render(<TestComponent />);

    const checkbox1 = screen.getByRole('checkbox', { name: '항목 1' });
    const checkbox2 = screen.getByRole('checkbox', { name: '항목 2' });

    await user.click(checkbox1);
    expect(checkbox1).toBeChecked();
    expect(checkbox2).not.toBeChecked();

    await user.click(checkbox2);
    expect(checkbox1).toBeChecked();
    expect(checkbox2).toBeChecked();

    await user.click(checkbox1);
    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).toBeChecked();
});

test('체크박스 그룹에서 value prop으로 선택된 항목을 제어할 수 있다.', async () => {
    const selectedValues = ['1', '3'];

    render(
        <CheckboxGroup value={selectedValues}>
            <Checkbox value="1" label="항목 1" />
            <Checkbox value="2" label="항목 2" />
            <Checkbox value="3" label="항목 3" />
        </CheckboxGroup>
    );

    const checkbox1 = screen.getByRole('checkbox', { name: '항목 1' });
    const checkbox2 = screen.getByRole('checkbox', { name: '항목 2' });
    const checkbox3 = screen.getByRole('checkbox', { name: '항목 3' });

    expect(checkbox1).toHaveAttribute('data-state', 'checked');
    expect(checkbox2).toHaveAttribute('data-state', 'unchecked');
    expect(checkbox3).toHaveAttribute('data-state', 'checked');
});