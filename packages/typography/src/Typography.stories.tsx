import { fontSize, fontWeight, lineHeight } from '@sipe-team/tokens';
import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    weight: {
      control: 'select',
      options: Object.keys(fontWeight),
      description: '글꼴 굵기',
    },
    size: {
      control: 'select',
      options: Object.keys(fontSize),
      description: '글꼴 크기',
    },
    lineHeight: {
      control: 'select',
      options: Object.keys(lineHeight),
      description: '줄 높이',
    },
    color: {
      control: 'color',
      description: '글꼴 색상',
    },
    asChild: {
      control: 'boolean',
      description: '자식 요소의 태그를 사용',
    },
  },
} satisfies Meta<typeof Typography>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render() {
    return (
      <section style={{ maxWidth: '600px' }}>
        <Typography size={32} weight="bold" style={{ marginBottom: '24px' }}>
          Typography
        </Typography>

        <Typography size={24} weight="bold" style={{ marginBottom: '16px' }}>
          Weight
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
          <Typography weight="regular">[기본 값] regular(400) - 사이프 디자인 시스템</Typography>
          <Typography weight="medium">medium(500) - 사이프 디자인 시스템</Typography>
          <Typography weight="semiBold">semiBold(600) - 사이프 디자인 시스템</Typography>
          <Typography weight="bold">bold(700) - 사이프 디자인 시스템</Typography>
        </div>

        <Typography size={24} weight="bold" style={{ marginBottom: '16px' }}>
          Size
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
          <Typography size={12}>12 - 사이프 디자인 시스템</Typography>
          <Typography size={14}>[기본 값] 14 - 사이프 디자인 시스템</Typography>
          <Typography size={16}>16 - 사이프 디자인 시스템</Typography>
          <Typography size={18}>18 - 사이프 디자인 시스템</Typography>
          <Typography size={20}>20 - 사이프 디자인 시스템</Typography>
          <Typography size={24}>24 - 사이프 디자인 시스템</Typography>
          <Typography size={28}>28 - 사이프 디자인 시스템</Typography>
          <Typography size={32}>32 - 사이프 디자인 시스템</Typography>
          <Typography size={36}>36 - 사이프 디자인 시스템</Typography>
          <Typography size={48}>48 - 사이프 디자인 시스템</Typography>
        </div>

        <Typography size={24} weight="bold" style={{ marginBottom: '16px' }}>
          Line Height
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <Typography weight="semiBold">regular(1.5) - 기본값</Typography>
            <Typography lineHeight="regular">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </Typography>
          </div>
          <div>
            <Typography weight="semiBold">compact(1.3)</Typography>
            <Typography lineHeight="compact">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </Typography>
          </div>
        </div>
      </section>
    );
  },
};

export const ColorVariants: Story = {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Typography color="#FF0000">빨간색 텍스트</Typography>
        <Typography color="#00FF00">녹색 텍스트</Typography>
        <Typography color="#0000FF">파란색 텍스트</Typography>
        <Typography color="#FF00FF">핑크색 텍스트</Typography>
        <Typography color="rgba(0, 0, 0, 0.5)">반투명 텍스트</Typography>
      </div>
    );
  },
};

export const SemanticElements: Story = {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Typography size={32} weight="bold">
          제목 1
        </Typography>
        <Typography size={28} weight="bold">
          제목 2
        </Typography>
        <Typography size={24} weight="bold">
          제목 3
        </Typography>
        <Typography size={20} weight="semiBold">
          제목 4
        </Typography>
        <Typography size={18} weight="semiBold">
          제목 5
        </Typography>
        <Typography size={16} weight="semiBold">
          제목 6
        </Typography>
        <Typography size={14}>일반 텍스트 단락입니다.</Typography>
        <Typography size={14}>인라인 텍스트입니다.</Typography>
      </div>
    );
  },
};

export const Polymorphic: Story = {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Typography weight="bold" size={20}>
          기본 요소 (p)
        </Typography>

        <Typography
          style={{
            cursor: 'pointer',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 16px',
          }}
        >
          버튼으로 렌더링
        </Typography>

        <Typography asChild>
          <a href="https://github.com/sipe-team/side" style={{ color: '#007bff', textDecoration: 'underline' }}>
            링크로 렌더링 (asChild)
          </a>
        </Typography>

        <Typography asChild>
          <label>
            <input type="checkbox" /> 체크박스 라벨로 렌더링 (asChild)
          </label>
        </Typography>
      </div>
    );
  },
};
