import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  component: Badge,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
