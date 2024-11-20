import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta = {
  component: Divider,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Divider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
