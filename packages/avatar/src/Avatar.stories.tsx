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
    alt: 'SIPE 브랜드 로고',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Avatar size="xs" src={testImage} alt="SIPE 로고 XS" />
      <Avatar size="sm" src={testImage} alt="SIPE 로고 SM" />
      <Avatar size="md" src={testImage} alt="SIPE 로고 MD" />
      <Avatar size="lg" src={testImage} alt="SIPE 로고 LG" />
      <Avatar size="xl" src={testImage} alt="SIPE 로고 XL" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Avatar shape="circle" src={testImage} alt="GitHub 로고 (원형 모양)" style={{ border: '2px solid #ddd' }} />
      <Avatar
        shape="rounded"
        src={testImage}
        alt="GitHub 로고 (둥근 사각형 모양)"
        style={{ border: '2px solid #ddd' }}
      />
      <Avatar shape="square" src={testImage} alt="GitHub 로고 (사각형 모양)" style={{ border: '2px solid #ddd' }} />
    </div>
  ),
};
