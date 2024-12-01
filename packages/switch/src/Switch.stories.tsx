import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from './Switch';

const meta = {
  component: Switch,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Switch>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
