import type { Meta, StoryObj } from '@storybook/react';
import * as Input from './Input';

const meta = {
  component: Input.Root,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input.Root>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
