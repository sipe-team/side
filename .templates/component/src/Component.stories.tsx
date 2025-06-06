import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

export default {
  title: 'Components/Component',
  component: Component,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Component>;

type Story = StoryObj<typeof Component>;

export const Basic: Story = {
  args: {
    children: 'children',
  },
};
