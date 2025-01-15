import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    ratio: {
      control: 'select',
      options: ['rectangle', 'square', 'wide', 'portrait', 'auto'],
    },
    variant: {
      control: 'select',
      options: ['filled', 'outline'],
    },
  },
} satisfies Meta<typeof Card>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <span style={{ fontSize: '20px' }}>Card</span>,
    variant: 'filled',
  },
};
