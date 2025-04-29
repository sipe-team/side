import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';
import { useCheckboxGroup } from './hooks/useCheckboxGroup';

const meta = {
  title: 'Components/Checkbox',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Checkbox.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

// Basic checkbox with label
export const Basic: Story = {
  render: () => {
    return (
      <div>
        <Checkbox.Root>
          <Checkbox.Input />
          <Checkbox.Label>Basic checkbox</Checkbox.Label>
        </Checkbox.Root>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
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
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div>
        <Checkbox.Root checked={checked} onCheckboxChange={setChecked}>
          <Checkbox.Input />
          <Checkbox.Label>Controlled checkbox</Checkbox.Label>
        </Checkbox.Root>
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => {
    return (
      <Checkbox.Root defaultChecked>
        <Checkbox.Input />
        <Checkbox.Label>Uncontrolled checkbox</Checkbox.Label>
      </Checkbox.Root>
    );
  },
};

// Disabled states
export const Disabled: Story = {
  render: () => (
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
};

export const Indeterminate: Story = {
  render: () => {
    const { checkedItems, updateCheckedItems, setAllChecked, allChecked, indeterminate } = useCheckboxGroup({
      total: 3,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Checkbox.Root checked={allChecked} indeterminate={indeterminate} onCheckboxChange={setAllChecked}>
          <Checkbox.Input />
          <Checkbox.Label>Select all options</Checkbox.Label>
        </Checkbox.Root>

        <div style={{ marginLeft: '1.5rem' }}>
          <Checkbox.Root
            checked={checkedItems[0] || false}
            onCheckboxChange={(checked) => updateCheckedItems(0, checked)}
          >
            <Checkbox.Input />
            <Checkbox.Label>Option 1</Checkbox.Label>
          </Checkbox.Root>

          <Checkbox.Root
            checked={checkedItems[1] || false}
            onCheckboxChange={(checked) => updateCheckedItems(1, checked)}
          >
            <Checkbox.Input />
            <Checkbox.Label>Option 2</Checkbox.Label>
          </Checkbox.Root>

          <Checkbox.Root
            checked={checkedItems[2] || false}
            onCheckboxChange={(checked) => updateCheckedItems(2, checked)}
          >
            <Checkbox.Input />
            <Checkbox.Label>Option 3</Checkbox.Label>
          </Checkbox.Root>
        </div>
      </div>
    );
  },
};

// Form integration
export const WithinForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      terms: false,
      newsletter: false,
      updates: false,
    });

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Form submitted:', formData);
        }}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <fieldset>
          <legend>Form example</legend>

          <Checkbox.Root
            checked={formData.terms}
            onCheckboxChange={(checked) => setFormData((prev) => ({ ...prev, terms: checked }))}
          >
            <Checkbox.Input name="terms" required />
            <Checkbox.Label>Accept terms (required)</Checkbox.Label>
          </Checkbox.Root>

          <Checkbox.Root
            checked={formData.newsletter}
            onCheckboxChange={(checked) => setFormData((prev) => ({ ...prev, newsletter: checked }))}
          >
            <Checkbox.Input name="newsletter" />
            <Checkbox.Label>Subscribe to newsletter</Checkbox.Label>
          </Checkbox.Root>

          <Checkbox.Root
            checked={formData.updates}
            onCheckboxChange={(checked) => setFormData((prev) => ({ ...prev, updates: checked }))}
          >
            <Checkbox.Input name="updates" />
            <Checkbox.Label>Receive updates</Checkbox.Label>
          </Checkbox.Root>
        </fieldset>

        <div>
          <button type="submit">Submit</button>
          <button
            type="reset"
            onClick={() => setFormData({ terms: false, newsletter: false, updates: false })}
            style={{ marginLeft: '1rem' }}
          >
            Reset
          </button>
        </div>
      </form>
    );
  },
};
