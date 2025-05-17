import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      description: '버튼의 색상을 지정합니다',
      options: ['primary', 'black', 'white'],
      control: { type: 'radio' },
    },
    variant: {
      description: '버튼의 스타일을 지정합니다',
      options: ['filled', 'outline', 'weak'],
      control: { type: 'radio' },
    },
    disabled: {
      description: '버튼의 비활성화 상태를 지정합니다',
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    variant: 'filled',
  },
};

export const Colors: Story = {
  args: {
    children: 'Button',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button {...args} color="primary">
        Primary
      </Button>
      <Button {...args} color="black">
        Black
      </Button>
      <Button {...args} color="white">
        White
      </Button>
    </div>
  ),
};

export const Variants: Story = {
  args: {
    children: 'Button',
    color: 'primary',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button {...args} variant="filled">
        Filled
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="weak">
        Weak
      </Button>
    </div>
  ),
};

export const States: Story = {
  args: {
    children: 'Button',
    color: 'primary',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button {...args}>Normal</Button>
      <Button {...args} disabled>
        Disabled
      </Button>
    </div>
  ),
};
