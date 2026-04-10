import type { Meta, StoryObj } from '@storybook/react';
import { Badge, type BadgeSize, type BadgeVariant } from './Badge';
import { BadgeSize as BadgeSizeEnum, BadgeVariant as BadgeVariantEnum } from './Badge.css';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.keys(BadgeSizeEnum),
      description: 'Size of the badge',
      defaultValue: 'medium',
    },
    variant: {
      control: 'select',
      options: Object.keys(BadgeVariantEnum),
      description: 'Visual style of the badge',
      defaultValue: 'filled',
    },
  },
} satisfies Meta<typeof Badge>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: '사이프',
    size: 'medium',
    variant: 'filled',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      {Object.keys(BadgeSizeEnum).map((size) => (
        <Badge key={size} {...args} size={size as BadgeSize}>
          {size}
        </Badge>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      {Object.keys(BadgeVariantEnum).map((variant) => (
        <Badge key={variant} {...args} variant={variant as BadgeVariant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};
