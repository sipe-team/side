import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta = {
  component: Typography,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Typography>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
