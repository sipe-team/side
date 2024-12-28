import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const meta = {
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup labelText="과일" defaultValue="orange">
      <Radio value="apple">사과</Radio>
      <Radio value="orange">오렌지</Radio>
      <Radio value="grape">포도</Radio>
    </RadioGroup>
  ),
};

export const Size: Story = {
  render: () => (
    <div>
      <RadioGroup labelText="Small" size="small">
        <Radio value="1">옵션 1</Radio>
        <Radio value="2">옵션 2</Radio>
      </RadioGroup>

      <RadioGroup labelText="Medium" size="medium">
        <Radio value="1">옵션 1</Radio>
        <Radio value="2">옵션 2</Radio>
      </RadioGroup>

      <RadioGroup labelText="Large" size="large">
        <Radio value="1">옵션 1</Radio>
        <Radio value="2">옵션 2</Radio>
      </RadioGroup>
    </div>
  ),
};

// 비활성화 상태
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <RadioGroup labelText="전체 비활성화" disabled>
        <Radio value="1">옵션 1</Radio>
        <Radio value="2">옵션 2</Radio>
      </RadioGroup>

      <RadioGroup labelText="개별 비활성화">
        <Radio value="1">활성화 옵션</Radio>
        <Radio value="2" disabled>
          비활성화 옵션
        </Radio>
      </RadioGroup>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('option1');

    return (
      <div>
        <RadioGroup
          labelText="제어 컴포넌트"
          value={selectedValue}
          onChangeValue={setSelectedValue}
        >
          <Radio value="option1">옵션 1</Radio>
          <Radio value="option2">옵션 2</Radio>
          <Radio value="option3">옵션 3</Radio>
        </RadioGroup>
        <p>선택된 값: {selectedValue}</p>
      </div>
    );
  },
};
