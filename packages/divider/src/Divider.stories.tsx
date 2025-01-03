import { Typography } from '@sipe-team/typography';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta = {
  title: 'Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
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

      {/* 스타일 섹션 */}
      <section>
        <Typography weight="bold" size={12}>
          <h2>스타일링</h2>
        </Typography>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <Typography>default</Typography>
            <Divider style={{ backgroundColor: '#E5E7EB' }} />
          </div>

          <div>
            <Typography>colored</Typography>
            <Divider style={{ backgroundColor: '#3B82F6' }} />
          </div>

          <div>
            <Typography>thick</Typography>
            <Divider style={{ backgroundColor: '#E5E7EB', height: '4px' }} />
          </div>
        </div>
      </section>
    </div>
  ),
};
