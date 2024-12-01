import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './InputNumber';

const meta = {
  title: 'Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: '사이프',
  },
};
