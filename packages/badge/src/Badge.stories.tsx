import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './Badge';
import { BadgeColor, BadgeIconPosition, BadgeSize, BadgeVariant } from './Badge.constants';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(BadgeSize),
    },
    variant: {
      control: 'select',
      options: Object.values(BadgeVariant),
    },
    color: {
      control: 'select',
      options: Object.values(BadgeColor),
    },
    icon: {
      control: 'select',
      options: Object.values(BadgeIconPosition),
    },
  },
  args: {
    children: 'Badge',
    size: BadgeSize.small,
    variant: BadgeVariant.default,
    color: BadgeColor.gray,
    icon: BadgeIconPosition.none,
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge size={BadgeSize.small}>Small</Badge>
      <Badge size={BadgeSize.large}>Large</Badge>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge variant={BadgeVariant.solid}>Solid</Badge>
      <Badge variant={BadgeVariant.default}>Default</Badge>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge color={BadgeColor.white}>White</Badge>
      <Badge color={BadgeColor.gray}>Gray</Badge>
      <Badge color={BadgeColor.danger}>Danger</Badge>
      <Badge color={BadgeColor.general}>General</Badge>
      <Badge color={BadgeColor['1st']}>1st</Badge>
      <Badge color={BadgeColor['2nd']}>2nd</Badge>
      <Badge color={BadgeColor['3rd']}>3rd</Badge>
      <Badge color={BadgeColor['4th']}>4th</Badge>
    </div>
  ),
};

export const ColorVariantMatrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {Object.values(BadgeVariant).map((variant) => (
        <div key={variant} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ width: '60px', fontSize: '12px' }}>{variant}:</span>
          {Object.values(BadgeColor).map((color) => (
            <Badge key={color} variant={variant} color={color}>
              {color}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Badge icon="left" leftIcon="👈">
          Left Icon
        </Badge>
        <Badge icon="right" rightIcon="👉">
          Right Icon
        </Badge>
        <Badge icon="both" leftIcon="👈" rightIcon="👉">
          Both Icons
        </Badge>
      </div>
    </div>
  ),
};
