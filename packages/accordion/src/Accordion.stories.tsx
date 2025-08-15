import { color } from '@sipe-team/tokens';
import { Typography } from '@sipe-team/typography';

import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from './Accordion';

const contentTextColor = color.gray200;

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Basic: Story = {
  render: () => (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.Trigger>
          <Typography weight="bold">
            수도권에 거주하고 있지 않지만 주요 활동 지역은 수도권인데 활동을 할 수 있나요?
          </Typography>
          <Accordion.Indicator />
        </Accordion.Trigger>
        <Accordion.Content>
          <Typography weight="semiBold" color={contentTextColor}>
            네 가능합니다. 다만, 모든 활동이 수도권에서 진행될 예정으로, 결석이나 지각을 하는 경우 수료 조건에 영향이
            있을 수 있습니다.
          </Typography>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
};

export const WithDefaultOpen: Story = {
  render: () => (
    <Accordion.Root>
      <Accordion.Item defaultOpen>
        <Accordion.Trigger>
          <Typography weight="bold">이 항목은 기본으로 열려있습니다.</Typography>
          <Accordion.Indicator />
        </Accordion.Trigger>
        <Accordion.Content>
          <Typography weight="semiBold" color={contentTextColor}>
            `Accordion.Item` 컴포넌트에 `defaultOpen` prop을 전달하여 기본 상태를 열림으로 설정할 수 있습니다.
          </Typography>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.Trigger>
          <Typography weight="bold">이 항목은 닫혀있습니다.</Typography>
          <Accordion.Indicator />
        </Accordion.Trigger>
        <Accordion.Content>
          <Typography weight="semiBold" color={contentTextColor}>
            두 번째 항목의 내용입니다.
          </Typography>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
};

export const AccordionList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
      <Accordion.Root>
        <Accordion.Item>
          <Accordion.Trigger>
            <Typography weight="bold">4기 선발 기준은 어떻게 되나요?</Typography>
            <Accordion.Indicator />
          </Accordion.Trigger>
          <Accordion.Content>
            <Typography weight="semiBold" color={contentTextColor}>
              함께 대화하고 싶은, 구성원들의 기술적 성장에 기여할 수 있는, 그리고 동아리 활동에 성실하게 참여 가능한
              현직 개발자를 저희의 인재상으로 삼고 있습니다.
            </Typography>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
      <Accordion.Root>
        <Accordion.Item>
          <Accordion.Trigger>
            <Typography weight="bold">
              수도권에 거주하고 있지 않지만 주요 활동 지역은 수도권인데 활동을 할 수 있나요?
            </Typography>
            <Accordion.Indicator />
          </Accordion.Trigger>
          <Accordion.Content>
            <Typography weight="semiBold" color={contentTextColor}>
              네 가능합니다. 다만, 모든 활동이 수도권에서 진행될 예정으로, 결석이나 지각을 하는 경우 수료 조건에 영향이
              있을 수 있습니다.
            </Typography>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
      <Accordion.Root>
        <Accordion.Item>
          <Accordion.Trigger>
            <Typography weight="bold">4기 선발 인원은 몇명인가요?</Typography>
            <Accordion.Indicator />
          </Accordion.Trigger>
          <Accordion.Content>
            <Typography weight="semiBold" color={contentTextColor}>
              4기는 40명 내외로 구성할 예정이며, 선발 인원은 지원자 수에 따라서 변동될 수 있습니다.
            </Typography>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
      <Accordion.Root>
        <Accordion.Item>
          <Accordion.Trigger>
            <Typography weight="bold">미성년자이지만 개발자로 근무하고 있는데 지원할 수 있나요?</Typography>
            <Accordion.Indicator />
          </Accordion.Trigger>
          <Accordion.Content>
            <Typography weight="semiBold" color={contentTextColor}>
              아니오. 아쉽지만 사이프는 미성년자는 선발 대상에서 제외하고 있습니다.
            </Typography>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  ),
};

export const TriggerUsingAsChild: Story = {
  render: () => (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.Trigger asChild>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Typography weight="bold">asChild prop을 사용하여 `div`로 렌더링된 Trigger</Typography>
            <Accordion.Indicator />
          </div>
        </Accordion.Trigger>
        <Accordion.Content>
          <Typography weight="semiBold" color={contentTextColor}>
            `Accordion.Trigger` 컴포넌트에 `asChild` prop을 전달하여 다른 HTML 요소로 렌더링할 수 있습니다.
          </Typography>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
};
