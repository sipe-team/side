// Skeleton.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta = {
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['circle', 'rectangular'],
    },
    width: {
      control: { type: 'number', min: 20, max: 200, step: 10 },
    },
    height: {
      control: { type: 'number', min: 20, max: 200, step: 10 },
    },
    loading: {
      control: 'boolean',
    },
    asChild: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    loading: true,
    variant: 'rectangular',
    width: 100,
    height: 100,
  },
};

export const CircleSkeleton: Story = {
  args: {
    loading: true,
    variant: 'circle',
    width: 80,
    height: 80,
  },
};

export const RectangularSkeleton: Story = {
  args: {
    loading: true,
    variant: 'rectangular',
    width: 80,
    height: 30,
  },
};

export const SkeletonWithChildren: Story = {
  args: {
    loading: true,
    asChild: true,
    children: <button type="button">Loading...</button>,
    variant: 'rectangular',
    width: 120,
    height: 50,
  },
};
