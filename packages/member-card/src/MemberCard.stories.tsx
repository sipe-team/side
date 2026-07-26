import type { Meta, StoryObj } from '@storybook/react';

import { MemberCard } from './MemberCard';

const meta = {
  title: 'Components/MemberCard',
  component: MemberCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outline'],
    },
    avatarShape: {
      control: 'select',
      options: ['circle', 'rounded', 'square'],
    },
    socialSize: {
      control: 'select',
      options: ['sm', 'md'],
    },
    isOrganizer: { control: 'boolean' },
  },
  args: {
    name: '홍길동',
    part: 'Frontend',
    period: '1',
    imgSrc: 'https://i.pravatar.cc/140?img=13',
    variant: 'filled',
    avatarShape: 'rounded',
    socialSize: 'sm',
  },
} satisfies Meta<typeof MemberCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <MemberCard {...args} />
    </div>
  ),
};

export const WithLinks: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <MemberCard
        {...args}
        links={[
          { type: 'github', url: 'github.com/sipe-team' },
          { type: 'linkedin', url: 'https://linkedin.com/company/sipe-team' },
          { type: 'link', url: 'sipe.team' },
        ]}
      />
    </div>
  ),
};

export const Organizer: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <MemberCard
        {...args}
        isOrganizer
        links={[
          { type: 'github', url: 'github.com/sipe-team' },
          { type: 'linkedin', url: 'https://linkedin.com/company/sipe-team' },
          { type: 'email', url: 'hello@sipe.team' },
        ]}
      />
    </div>
  ),
};

export const WithIntroduce: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <MemberCard
        {...args}
        introduce="안녕하세요, 프론트엔드 개발자 홍길동입니다. 좋은 사용자 경험을 만드는 데 관심이 많습니다."
      />
    </div>
  ),
};

export const WithReview: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <MemberCard
        {...args}
        introduce="안녕하세요, 프론트엔드 개발자 홍길동입니다."
        review="사이퍼 활동을 통해 다양한 사람들과 협업하며 크게 성장할 수 있었습니다. 강력히 추천합니다."
      />
    </div>
  ),
};

export const AllSocials: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <MemberCard
        {...args}
        socialSize="md"
        links={[
          { type: 'github', url: 'github.com/sipe-team' },
          { type: 'linkedin', url: 'https://linkedin.com/company/sipe-team' },
          { type: 'instagram', url: 'instagram.com/sipe.team' },
          { type: 'youtube', url: 'youtube.com/@sipeteam' },
          { type: 'kakao', url: 'open.kakao.com/o/sipe' },
          { type: 'email', url: 'hello@sipe.team' },
          { type: 'link', url: 'sipe.team' },
        ]}
      />
    </div>
  ),
};

export const OutlineVariant: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <MemberCard
        {...args}
        variant="outline"
        isOrganizer
        introduce="아웃라인 스타일 예시입니다."
        review="배경이 없고 테두리만 강조된 형태입니다."
        links={[
          { type: 'github', url: 'github.com/sipe-team' },
          { type: 'linkedin', url: 'https://linkedin.com/company/sipe-team' },
        ]}
      />
    </div>
  ),
};

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 24,
        width: 720,
      }}
    >
      <MemberCard
        name="김사이퍼"
        part="Frontend"
        period="8"
        imgSrc="https://i.pravatar.cc/140?img=32"
        isOrganizer
        introduce="프론트엔드로 사용자에게 즐거움을 주는 걸 좋아합니다."
        links={[
          { type: 'github', url: 'github.com/kim' },
          { type: 'linkedin', url: 'https://linkedin.com/in/kim' },
        ]}
      />
      <MemberCard
        name="이사이퍼"
        part="Backend"
        period="8"
        imgSrc="https://i.pravatar.cc/140?img=15"
        introduce="안정적인 시스템을 설계합니다."
        review="다양한 사람들과 협업하며 새로운 자극을 받았어요."
        links={[
          { type: 'github', url: 'github.com/lee' },
          { type: 'email', url: 'lee@sipe.team' },
        ]}
      />
      <MemberCard
        name="박사이퍼"
        part="Design"
        period="8"
        imgSrc="https://i.pravatar.cc/140?img=47"
        introduce="사람 중심의 인터랙션을 고민합니다."
        links={[
          { type: 'instagram', url: 'instagram.com/park' },
          { type: 'link', url: 'park.design' },
        ]}
      />
    </div>
  ),
};
