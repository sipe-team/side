import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Avatar>;
export default meta;

type Story = StoryObj<typeof meta>;

const testImage = 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png';

export const Basic: Story = {
  args: {
    src: testImage,
    alt: 'SIPE Brand Logo',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Avatar size="xs" src={testImage} alt="SIPE Logo XS" />
      <Avatar size="sm" src={testImage} alt="SIPE Logo SM" />
      <Avatar size="md" src={testImage} alt="SIPE Logo MD" />
      <Avatar size="lg" src={testImage} alt="SIPE Logo LG" />
      <Avatar size="xl" src={testImage} alt="SIPE Logo XL" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Avatar shape="circle" src={testImage} alt="GitHub Logo (Circle Shape)" style={{ border: '2px solid #ddd' }} />
      <Avatar
        shape="rounded"
        src={testImage}
        alt="GitHub Logo (Rounded Rectangle Shape)"
        style={{ border: '2px solid #ddd' }}
      />
      <Avatar shape="square" src={testImage} alt="GitHub Logo (Square Shape)" style={{ border: '2px solid #ddd' }} />
    </div>
  ),
};
