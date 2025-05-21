import { Typography } from '@sipe-team/typography';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    orientation: {
      description: '구분선의 방향',
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    color: {
      description: '구분선의 색상',
      control: 'radio',
      options: ['default', 'primary', 'dark'],
    },
  },
} satisfies Meta<typeof Divider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div
      style={{
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
      }}
    >
      {/* 기본 가로 방향 */}
      <section>
        <Typography weight="bold" size={12}>
          <h2>가로 구분선</h2>
        </Typography>

        <div>
          <Divider />
        </div>
      </section>

      {/* 기본 세로 방향 */}
      <section>
        <Typography weight="bold" size={12}>
          <h2>세로 구분선</h2>
        </Typography>

        <div style={{ height: '50px', display: 'flex', alignItems: 'center' }}>
          <Typography size={12}>좌</Typography>
          <Divider orientation="vertical" style={{ margin: '0 16px' }} />
          <Typography size={12}>우</Typography>
        </div>
      </section>

      {/* 색상 변형 섹션 */}
      <section>
        <Typography weight="bold" size={12}>
          <h2>색상 변형</h2>
        </Typography>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <Typography>기본 색상 (default)</Typography>
            <Divider color="default" />
          </div>

          <div>
            <Typography>메인 색상 (primary)</Typography>
            <Divider color="primary" />
          </div>

          <div>
            <Typography>어두운 색상 (dark)</Typography>
            <Divider color="dark" />
          </div>
        </div>
      </section>

      {/* 고급 스타일링 섹션 */}
      <section>
        <Typography weight="bold" size={12}>
          <h2>고급 스타일링</h2>
        </Typography>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <Typography>사용자 정의 색상</Typography>
            <Divider style={{ backgroundColor: '#FF5733' }} />
          </div>

          <div>
            <Typography>두껍게 (4px)</Typography>
            <Divider style={{ height: '4px' }} />
          </div>

          <div>
            <Typography>점선</Typography>
            <Divider style={{ borderStyle: 'dashed', borderTopWidth: '1px', backgroundColor: 'transparent' }} />
          </div>
        </div>
      </section>
    </div>
  ),
};
