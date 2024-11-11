import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta = {
  component: Typography,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Typography>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render() {
    return (
      <section>
        <Typography asChild={true} size={32} weight="bold">
          <h1>Weight</h1>
        </Typography>
        <Typography weight="regular">
          [기본 값] regular(400) - 사이프 디자인 시스템
        </Typography>
        <Typography weight="medium">
          medium(500) - 사이프 디자인 시스템
        </Typography>
        <Typography weight="semiBold">
          semiBold(600) - 사이프 디자인 시스템
        </Typography>
        <Typography weight="bold">bold(700) - 사이프 디자인 시스템</Typography>

        <Typography asChild={true} size={32} weight="bold">
          <h1>Size</h1>
        </Typography>
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

        <Typography asChild={true} size={32} weight="bold">
          <h1>Line Height</h1>
        </Typography>
        <Typography lineHeight="regular">
          [기본 값] regular(1.5) - 사이프 디자인 시스템
        </Typography>
        <Typography lineHeight="compact">
          compact(1.3) - 사이프 디자인 시스템
        </Typography>
      </section>
    );
  },
};
