import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta = {
  component: Checkbox,
  title: 'Checkbox',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
