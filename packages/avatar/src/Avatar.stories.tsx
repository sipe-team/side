import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { faker } from '@faker-js/faker';


const meta = {
  title: 'Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Avatar>;
export default meta;

type Story = StoryObj<typeof meta>;

const testImage = faker.image.avatar();

export const Basic: Story = {
  args: {
    src: 'https://randomuser.me/api/portraits/men/1.jpg',
    alt: '대체 텍스트',
  },
};

export const Sizes: Story = {
  render: () => (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Avatar size="xs" src={testImage} alt="XSmall" />
        <Avatar size="sm" src={testImage}  alt="small" />
        <Avatar size="md" src={testImage}  alt="medium" />
        <Avatar size="lg" src={testImage} alt="large" />
        <Avatar size="xl" src={testImage} alt="XLarge" />
      </div>
  ),
};

export const Shapes: Story = {
  render: () => (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Avatar shape="circle" src={testImage}  alt="원형" />
        <Avatar shape="rounded" src={testImage}  alt="둥근 사각형" />
        <Avatar shape="square" src={testImage}  alt="사각형" />
      </div>
  ),
};
