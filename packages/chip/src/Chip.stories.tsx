import type { Meta, StoryObj } from '@storybook/react';

import { Chip } from './Chip';
import { ChipColor, ChipSize, ChipState, ChipVariant } from './Chip.constants';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: Object.values(ChipColor),
    },
    variant: {
      control: 'select',
      options: Object.values(ChipVariant),
    },
    size: {
      control: 'select',
      options: Object.values(ChipSize),
    },
    state: {
      control: 'select',
      options: Object.values(ChipState),
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'SIPE chip',
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip color="primary">Primary</Chip>
      <Chip color="secondary">Secondary</Chip>
      <Chip color="success">Success</Chip>
      <Chip color="warning">Warning</Chip>
      <Chip color="danger">Danger</Chip>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip variant="filled">Filled</Chip>
      <Chip variant="outline">Outline</Chip>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Chip size="small">Small</Chip>
      <Chip size="medium">Medium</Chip>
      <Chip size="large">Large</Chip>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip state="default">Default</Chip>
      <Chip state="selected">Selected</Chip>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    color: 'primary',
    variant: 'filled',
    size: 'medium',
    state: 'default',
    children: 'Interactive Chip',
  },
};
