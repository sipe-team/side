import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';
import { useCheckboxGroup } from './hooks/useCheckboxGroup';

const meta = {
  title: 'Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Basic Checkbox',
    value: 'test',
    name: 'test',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    value: 'test',
    name: 'test',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    value: 'test',
    name: 'test',
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div>
      <Checkbox
        label="Small Checkbox"
        size="small"
        name={'test1'}
        value={'test1'}
        style={{ marginBottom: '1rem' }}
      />
      <Checkbox
        label="Medium Checkbox"
        size="medium"
        name={'test2'}
        value={'test2'}
        style={{ marginBottom: '1rem' }}
      />
      <Checkbox
        label="Large Checkbox"
        size="large"
        name={'test3'}
        value={'test3'}
        style={{ marginBottom: '1rem' }}
      />
    </div>
  ),
};

export const customStyles: Story = {
  args: {
    label: 'Custom Styled Checkbox',
    style: {
      padding: '20px',
      border: '2px solid #f8f',
      borderRadius: '10px',
      backgroundColor: '#f8f9fa',
    },
    value: 'test',
    name: 'test',
  },
};

export const Controlled: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <Checkbox
        label="Controlled Checkbox"
        checked={isChecked}
        onCheckedChange={setIsChecked}
      />
    );
  },
};

export const Uncontrolled: Story = {
  args: {
    label: 'Uncontrolled Checkbox',
    defaultChecked: true,
    value: 'test',
    name: 'test',
  },
};

export const CheckboxGroup: Story = {
  render: () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];
    const { checkedItems, updateCheckedItems, setAllChecked, allChecked } =
      useCheckboxGroup({
        total: items.length,
      });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Checkbox
          label="Select All"
          checked={allChecked}
          onCheckedChange={setAllChecked}
        />
        {items.map((item, index) => (
          <Checkbox
            key={item}
            label={item}
            checked={checkedItems[index]}
            onCheckedChange={(checked) => updateCheckedItems(index, checked)}
          />
        ))}
      </div>
    );
  },
};

export const Indeterminate: Story = {
  render: () => {
    const [parentChecked, setParentChecked] = useState(false);
    const [parentIndeterminate, setParentIndeterminate] = useState(false);
    const [childChecked, setChildChecked] = useState([false, false]);

    const updateParentState = (newChildChecked: boolean[]) => {
      const checkedCount = newChildChecked.filter(Boolean).length;
      setParentIndeterminate(
        checkedCount > 0 && checkedCount < newChildChecked.length,
      );
      setParentChecked(checkedCount === newChildChecked.length);
    };

    const handleParentChange = (checked: boolean) => {
      setParentChecked(checked);
      setParentIndeterminate(false);
      setChildChecked([checked, checked]);
    };

    const handleChildChange = (index: number, checked: boolean) => {
      const newChildChecked = [...childChecked];
      newChildChecked[index] = checked;
      setChildChecked(newChildChecked);
      updateParentState(newChildChecked);
    };

    console.log('parent indeterminate 확인: ', parentIndeterminate);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Checkbox
          label="Parent Checkbox"
          checked={parentChecked}
          indeterminate={parentIndeterminate}
          onCheckedChange={handleParentChange}
        />
        <div style={{ marginLeft: '1.5rem' }}>
          <Checkbox
            label="Child Checkbox 1"
            checked={childChecked[0]}
            onCheckedChange={(checked) => handleChildChange(0, checked)}
          />
          <Checkbox
            label="Child Checkbox 2"
            checked={childChecked[1]}
            onCheckedChange={(checked) => handleChildChange(1, checked)}
          />
        </div>
      </div>
    );
  },
};
