import type { Meta, StoryObj } from '@storybook/react';

import { Image } from './Image';

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
  args: {
    src: 'https://picsum.photos/400/300',
    alt: '예시 이미지',
    width: 400,
    height: 300,
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 이미지 렌더링입니다. 기본 크기와 기본 fit 동작을 확인할 수 있습니다.',
      },
    },
  },
};

export const Fallbacks: Story = {
  parameters: {
    docs: {
      description: {
        story: 'fallbackSrc가 있을 때와 없을 때 동작을 한 번에 비교합니다.',
      },
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Image
          {...args}
          alt="fallback with src"
          src="https://invalid-url.com/broken.jpg"
          fallbackSrc="https://dummyimage.com/400x300/e5e7eb/111827&text=FALLBACK"
        />
        <span style={{ fontSize: 12, color: '#71717a' }}>with fallbackSrc</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div
          style={{
            width: 400,
            height: 300,
            border: '1px dashed #d4d4d8',
            borderRadius: 8,
            background: 'repeating-linear-gradient(45deg, #fafafa, #fafafa 10px, #f4f4f5 10px, #f4f4f5 20px)',
          }}
        >
          <Image {...args} alt="error without fallback" src="https://invalid-url.com/broken.jpg" />
        </div>
        <span style={{ fontSize: 12, color: '#71717a' }}>without fallbackSrc</span>
      </div>
    </div>
  ),
  args: {
    width: 400,
    height: 300,
  },
};

export const WithPlaceholder: Story = {
  parameters: {
    docs: {
      description: {
        story: '로딩 중 placeholder 확인은 DevTools에서 네트워크를 Slow 3G로 설정 후 새로고침하세요.',
      },
    },
  },
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'placeholder 예시',
    placeholder: (
      <div
        style={{
          width: 400,
          height: 300,
          background: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        로딩 중...
      </div>
    ),
  },
};

export const WithFill: Story = {
  parameters: {
    docs: {
      description: {
        story: 'fill 사용 예시입니다. 부모 컨테이너에 `position: relative`, `width: 400`, `height: 300`이 필요합니다.',
      },
    },
  },
  render: (args) => (
    <div style={{ position: 'relative', width: 400, height: 300 }}>
      <Image {...args} fill />
    </div>
  ),
  args: {
    src: 'https://picsum.photos/400/300',
  },
};

export const Fits: Story = {
  parameters: {
    docs: {
      description: {
        story: 'fit 옵션(`contain`, `cover`)을 같은 크기 박스에서 비교하는 예시입니다.',
      },
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Image {...args} fit="contain" alt="fit contain" />
        <span style={{ fontSize: 12, color: '#71717a' }}>fit: contain</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Image {...args} fit="cover" alt="fit cover" />
        <span style={{ fontSize: 12, color: '#71717a' }}>fit: cover</span>
      </div>
    </div>
  ),
  args: {
    src: 'https://picsum.photos/600/200',
    width: 300,
    height: 300,
  },
};

export const ResponsiveWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: 'width를 string(100%)으로 전달했을 때 부모 너비를 따라 반응형으로 동작하는 예시입니다.',
      },
    },
  },
  render: (args) => (
    <div
      style={{
        width: '100%',
        maxWidth: 500,
        minWidth: 220,
        resize: 'horizontal',
        overflow: 'auto',
        border: '1px solid #e4e4e7',
        padding: 8,
      }}
    >
      <Image {...args} />
    </div>
  ),
  args: {
    src: 'https://picsum.photos/400/300',
    width: '100%',
    height: 300,
  },
};
