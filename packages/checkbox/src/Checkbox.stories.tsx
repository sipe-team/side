import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox, CheckboxGroup } from './Checkbox';

const meta = {
    title: 'Components/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        size: {
            description: '체크박스의 크기를 지정합니다',
            options: ['sm', 'md', 'lg'],
            control: { type: 'radio' },
        },
        disabled: {
            description: '체크박스의 비활성화 상태를 지정합니다',
            control: { type: 'boolean' },
        },
        checked: {
            description: '체크박스의 선택 상태를 지정합니다',
            control: { type: 'boolean' },
        },
        label: {
            description: '체크박스의 레이블을 지정합니다',
            control: 'text',
        },
    },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        label: '체크박스',
        size: 'md',
    },
};

export const Sizes: Story = {
    args: {
        label: '체크박스',
    },
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Checkbox {...args} size="sm" label="Small" />
            <Checkbox {...args} size="md" label="Medium (Default)" />
            <Checkbox {...args} size="lg" label="Large" />
        </div>
    ),
};

export const States: Story = {
    args: {
        label: '체크박스',
    },
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Checkbox {...args} label="Unchecked (Default)" />
            <Checkbox {...args} label="Checked" defaultChecked />
            <Checkbox {...args} label="Disabled" disabled />
            <Checkbox {...args} label="Disabled & Checked" disabled defaultChecked />
        </div>
    ),
};

export const Controlled: Story = {
    args: {
        label: 'Controlled Checkbox',
    },
    render: (args) => {
        const [checked, setChecked] = useState<boolean | 'indeterminate'>(false);

        return (
            <Checkbox
                {...args}
                checked={checked}
                onCheckedChange={(state) => setChecked(state)}
            />
        );
    },
};

export const Group: Story = {
    args: {
        size: 'md',
    },
    render: (args) => {
        const [selected, setSelected] = useState<string[]>([]);

        return (
            <CheckboxGroup value={selected} onChange={setSelected}>
                <Checkbox {...args} value="apple" label="사과" />
                <Checkbox {...args} value="banana" label="바나나" />
                <Checkbox {...args} value="orange" label="오렌지" />
            </CheckboxGroup>
        );
    },
};