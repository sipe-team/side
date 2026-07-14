import { useState } from 'react';

import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Tooltip, type TooltipProps } from './Tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    tooltipContent: { control: 'text', description: '툴팁에 표시될 내용' },
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: '툴팁이 나타나는 위치',
    },
    tooltipStyle: { control: 'object', description: '툴팁의 커스텀 스타일' },
    tooltipClassName: { control: 'text', description: '툴팁에 적용할 클래스명' },
    gap: { control: 'number', description: '툴팁과 트리거 사이의 간격' },
    asChild: { control: { type: 'boolean' }, description: '`true`일 경우, 자식 요소를 그대로 사용합니다.' },
    disableHoverListener: { control: 'boolean', description: 'hover 이벤트 비활성화' },
    disableFocusListener: { control: 'boolean', description: 'focus 이벤트 비활성화' },
  },
} as Meta<TooltipProps>;

const Template: StoryFn<TooltipProps> = (args) => (
  <div style={{ margin: '100px', textAlign: 'center' }}>
    <Tooltip {...args}>
      <button type="button" style={{ padding: '8px 12px', cursor: 'pointer' }}>
        Hover Me
      </button>
    </Tooltip>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  tooltipContent: 'This is a tooltip',
  placement: 'top',
  tooltipStyle: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '4px',
  },
};

export const ClickControlled: StoryObj<TooltipProps> = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ margin: '100px', textAlign: 'center' }}>
        <Tooltip
          tooltipContent="Click to toggle this tooltip"
          placement="bottom"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          disableHoverListener
          disableFocusListener
          tooltipStyle={{ backgroundColor: '#000', color: '#fff', padding: '8px 12px', borderRadius: '4px' }}
        >
          <button type="button" style={{ padding: '8px 12px', cursor: 'pointer' }} onClick={() => setOpen((v) => !v)}>
            Click Me
          </button>
        </Tooltip>
      </div>
    );
  },
};

export const CustomStyles = Template.bind({});
CustomStyles.args = {
  tooltipContent: 'Custom styled tooltip',
  placement: 'right',
  tooltipStyle: {
    backgroundColor: '#005f73',
    color: '#e0fbfc',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    lineHeight: '1.5',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

export const AsChildExample = () => (
  <div style={{ display: 'flex', gap: '20px', padding: '50px', textAlign: 'center' }}>
    <Tooltip tooltipContent="This is a tooltip" asChild placement="top">
      <h1>Hover me (H1 element)</h1>
    </Tooltip>
    <Tooltip tooltipContent="Styled Tooltip" asChild placement="bottom">
      <button type="button" style={{ color: 'red', fontSize: '16px' }}>
        Hover me (Styled Button)
      </button>
    </Tooltip>
  </div>
);

export const AllPlacements = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', padding: '50px' }}>
    <Tooltip tooltipContent="Top Left" placement="top-left">
      <button type="button">Top Left</button>
    </Tooltip>
    <Tooltip tooltipContent="Top Left" placement="top-left" asChild={false}>
      <button type="button">Top Left</button>
    </Tooltip>
    <Tooltip tooltipContent="Top" placement="top">
      <button type="button">Top</button>
    </Tooltip>
    <Tooltip tooltipContent="Top" placement="top" asChild={false}>
      <button type="button">Top</button>
    </Tooltip>
    <Tooltip tooltipContent="Top Right" placement="top-right">
      <button type="button">Top Right</button>
    </Tooltip>
    <Tooltip tooltipContent="Top Right" placement="top-right" asChild={false}>
      <button type="button">Top Right</button>
    </Tooltip>
    <Tooltip tooltipContent="Left" placement="left">
      <button type="button">Left</button>
    </Tooltip>
    <Tooltip tooltipContent="Left" placement="left" asChild={false}>
      <button type="button">Left</button>
    </Tooltip>
    <Tooltip tooltipContent="Right" placement="right">
      <button type="button">Right</button>
    </Tooltip>
    <Tooltip tooltipContent="Right" placement="right" asChild={false}>
      <button type="button">Right</button>
    </Tooltip>
    <Tooltip tooltipContent="Bottom Left" placement="bottom-left">
      <button type="button">Bottom Left</button>
    </Tooltip>
    <Tooltip tooltipContent="Bottom Left" placement="bottom-left" asChild={false}>
      <button type="button">Bottom Left</button>
    </Tooltip>
    <Tooltip tooltipContent="Bottom" placement="bottom">
      <button type="button">Bottom</button>
    </Tooltip>
    <Tooltip tooltipContent="Bottom" placement="bottom" asChild={false}>
      <button type="button">Bottom</button>
    </Tooltip>
    <Tooltip tooltipContent="Bottom Right" placement="bottom-right">
      <button type="button">Bottom Right</button>
    </Tooltip>
    <Tooltip tooltipContent="Bottom Right" placement="bottom-right" asChild={false}>
      <button type="button">Bottom Right</button>
    </Tooltip>
  </div>
);
