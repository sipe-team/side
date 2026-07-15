import type { Meta, StoryObj } from '@storybook/react';

import { Template } from './Template';

const meta = {
  title: 'Components/Template',
  component: Template,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Template>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'Template',
  },
};
