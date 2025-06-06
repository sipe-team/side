import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';
import { RadioSize } from './constants/sizes';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(RadioSize),
      description: 'Size of the radio buttons',
      defaultValue: 'medium',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the entire radio group is disabled',
      defaultValue: false,
    },
    labelText: {
      control: 'text',
      description: 'Label text for the radio group',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labelText: '과일을 선택하세요',
    defaultValue: 'orange',
    size: 'medium',
    children: (
      <>
        <Radio value="apple">사과</Radio>
        <Radio value="orange">오렌지</Radio>
        <Radio value="grape">포도</Radio>
      </>
    ),
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {Object.values(RadioSize).map((size) => (
        <RadioGroup
          key={size}
          labelText={`${size.charAt(0).toUpperCase() + size.slice(1)} Size`}
          size={size}
          defaultValue="option2"
        >
          <Radio value="option1">옵션 1</Radio>
          <Radio value="option2">옵션 2</Radio>
          <Radio value="option3">옵션 3</Radio>
        </RadioGroup>
      ))}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <RadioGroup labelText="기본 상태" defaultValue="option1">
        <Radio value="option1">선택된 옵션</Radio>
        <Radio value="option2">선택되지 않은 옵션</Radio>
      </RadioGroup>

      <RadioGroup labelText="전체 비활성화" disabled defaultValue="option1">
        <Radio value="option1">비활성화된 선택 옵션</Radio>
        <Radio value="option2">비활성화된 미선택 옵션</Radio>
      </RadioGroup>

      <RadioGroup labelText="개별 비활성화" defaultValue="option1">
        <Radio value="option1">활성화된 선택 옵션</Radio>
        <Radio value="option2" disabled>
          비활성화된 옵션
        </Radio>
        <Radio value="option3">활성화된 미선택 옵션</Radio>
      </RadioGroup>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <RadioGroup labelText="제어 컴포넌트" value={selectedValue} onChangeValue={setSelectedValue}>
          <Radio value="option1">옵션 1</Radio>
          <Radio value="option2">옵션 2</Radio>
          <Radio value="option3">옵션 3</Radio>
        </RadioGroup>

        <div
          style={{
            padding: '1rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            marginTop: '1rem',
          }}
        >
          <strong>선택된 값:</strong> {selectedValue}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button
            type="button"
            onClick={() => setSelectedValue('option1')}
            style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            옵션 1 선택
          </button>
          <button
            type="button"
            onClick={() => setSelectedValue('option2')}
            style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            옵션 2 선택
          </button>
          <button
            type="button"
            onClick={() => setSelectedValue('option3')}
            style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            옵션 3 선택
          </button>
        </div>
      </div>
    );
  },
};

export const WithoutLabel: Story = {
  args: {
    size: 'medium',
    defaultValue: 'option2',
    children: (
      <>
        <Radio value="option1">라벨 없는 라디오 그룹</Radio>
        <Radio value="option2">옵션 2</Radio>
        <Radio value="option3">옵션 3</Radio>
      </>
    ),
  },
};

export const LongContent: Story = {
  args: {
    labelText: '긴 텍스트를 가진 라디오 옵션들',
    size: 'medium',
    children: (
      <>
        <Radio value="long1">
          이것은 매우 긴 텍스트를 가진 라디오 옵션입니다. 텍스트가 여러 줄에 걸쳐서 표시될 수 있습니다.
        </Radio>
        <Radio value="long2">
          또 다른 긴 텍스트 옵션으로, 라디오 버튼과 텍스트 사이의 정렬이 올바르게 되는지 확인할 수 있습니다.
        </Radio>
        <Radio value="short">짧은 옵션</Radio>
      </>
    ),
  },
};
