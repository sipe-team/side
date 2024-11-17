import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Action, Input } from './Input';

const meta = {
  component: Input,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "password",
    fontWeight: "regular",
    fontSize: 20
  },

  render: (args) => 
    {
      const [value, setValue] = useState('value')
      return <Input value={value} onChange={(e) => setValue(e.target.value)} {...args} />
  }
};

export const disabled: Story = {
  render: (args) => 
    {
      const [value, setValue] = useState('value')
      return <Input value={value} onChange={(e) => setValue(e.target.value)} {...args}/>
  },
  args: {
    disabled: true
  }
};

export const WithActionButton: Story = {
  render: () => {
    const [value, setValue] = useState('value');
    return (
        <Input 
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
            <Action onClick={() => setValue('')}>
                <svg style={{ width: '24px', height: '24px', color: 'currentColor' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path 
                  fillRule="evenodd" 
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" 
                  clipRule="evenodd"
                />
                </svg>
            </Action>
        </Input>
    );
  }
};


