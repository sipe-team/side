import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';
import { useCheckboxGroup } from './hooks/useCheckboxGroup';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the checkbox',
      defaultValue: 'medium',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
      defaultValue: false,
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked (controlled)',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state (uncontrolled)',
      defaultValue: false,
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in an indeterminate state',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof Checkbox.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    size: 'medium',
    children: (
      <>
        <Checkbox.Input />
        <Checkbox.Label>Basic checkbox</Checkbox.Label>
      </>
    ),
  },
};

export const Sizes: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Checkbox.Root size="small">
          <Checkbox.Input />
          <Checkbox.Label>Small size</Checkbox.Label>
        </Checkbox.Root>
        <Checkbox.Root size="medium">
          <Checkbox.Input />
          <Checkbox.Label>Medium size</Checkbox.Label>
        </Checkbox.Root>
        <Checkbox.Root size="large">
          <Checkbox.Input />
          <Checkbox.Label>Large size</Checkbox.Label>
        </Checkbox.Root>
      </div>
    ),
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div>
        <Checkbox.Root checked={checked} onCheckedChange={setChecked}>
          <Checkbox.Input />
          <Checkbox.Label>Controlled checkbox</Checkbox.Label>
        </Checkbox.Root>
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  args: {
    children: (
      <div>
        <Checkbox.Root defaultChecked={true}>
          <Checkbox.Input />
          <Checkbox.Label>Uncontrolled checkbox</Checkbox.Label>
        </Checkbox.Root>
      </div>
    ),
  },
};

export const Disabled: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Checkbox.Root disabled>
          <Checkbox.Input />
          <Checkbox.Label>Disabled unchecked</Checkbox.Label>
        </Checkbox.Root>
        <Checkbox.Root disabled checked>
          <Checkbox.Input />
          <Checkbox.Label>Disabled checked</Checkbox.Label>
        </Checkbox.Root>
      </div>
    ),
  },
};

export const Indeterminate: Story = {
  render: () => {
    const { allChecked, indeterminate, checkedItems, updateCheckedItems, setAllChecked } = useCheckboxGroup({
      total: 3,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Checkbox.Root checked={allChecked} indeterminate={indeterminate} onCheckedChange={setAllChecked}>
          <Checkbox.Input />
          <Checkbox.Label>Select all options</Checkbox.Label>
        </Checkbox.Root>

        <div style={{ marginLeft: '1.5rem' }}>
          {checkedItems.map((item, index) => (
            <Checkbox.Root
              key={`${item}-newDate`}
              checked={item}
              onCheckedChange={(checked) => updateCheckedItems(index, checked)}
            >
              <Checkbox.Input />
              <Checkbox.Label>{`Option ${index + 1}`}</Checkbox.Label>
            </Checkbox.Root>
          ))}
        </div>
      </div>
    );
  },
};
