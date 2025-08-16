import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['rectangular', 'circle', 'text', 'rounded'],
      description: 'Visual variant of the skeleton',
      defaultValue: 'rectangular',
    },
    width: {
      control: { type: 'number', min: 20, max: 500, step: 10 },
      description: 'Width of the skeleton in pixels',
    },
    height: {
      control: { type: 'number', min: 20, max: 200, step: 10 },
      description: 'Height of the skeleton in pixels',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show skeleton or content',
      defaultValue: true,
    },
    asChild: {
      control: 'boolean',
      description: 'Whether to use as a wrapper',
      defaultValue: false,
    },
    pulse: {
      control: 'boolean',
      description: 'Enable faster pulse animation',
      defaultValue: false,
    },
    shimmer: {
      control: 'boolean',
      description: 'Enable shimmer effect',
      defaultValue: false,
    },
    lines: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Number of lines for text variant',
      defaultValue: 1,
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    loading: true,
    variant: 'rectangular',
    width: 200,
    height: 100,
  },
};

export const Circle: Story = {
  args: {
    loading: true,
    variant: 'circle',
    width: 80,
    height: 80,
  },
};

export const Text: Story = {
  args: {
    loading: true,
    variant: 'text',
    width: 300,
    lines: 3,
  },
};

export const Rounded: Story = {
  args: {
    loading: true,
    variant: 'rounded',
    width: 200,
    height: 60,
  },
};

export const WithShimmer: Story = {
  args: {
    loading: true,
    variant: 'rectangular',
    width: 200,
    height: 100,
    shimmer: true,
  },
};

export const WithPulse: Story = {
  args: {
    loading: true,
    variant: 'rectangular',
    width: 200,
    height: 100,
    pulse: true,
  },
};
