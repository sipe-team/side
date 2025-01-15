import type { Meta, StoryObj } from '@storybook/react';
import * as Icons from '.';

export default {
  title: 'Components/Icons',
  parameters: {
    layout: 'centered',
  },
  component: Icons.AccordionArrowIcon,
} satisfies Meta;

const CHECKERBOARD_COLOR = '#cccccc';

const checkerboardStyle = {
  backgroundColor: '#e0e0e0',
  backgroundImage: `
  linear-gradient(45deg, ${CHECKERBOARD_COLOR} 25%, transparent 25%),
  linear-gradient(-45deg, ${CHECKERBOARD_COLOR} 25%, transparent 25%),
  linear-gradient(45deg, transparent 75%, ${CHECKERBOARD_COLOR} 75%),
  linear-gradient(-45deg, transparent 75%, ${CHECKERBOARD_COLOR} 75%)
  `,
  backgroundSize: '20px 20px',
  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
};

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      padding: '12px',
      borderRadius: '8px',
      ...checkerboardStyle,
    }}
  >
    {children}
  </div>
);

export const Default: StoryObj = {
  render: () => (
    <IconWrapper>
      <Icons.AccordionArrowIcon />
    </IconWrapper>
  ),
};

export const AllIcons: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '20px',
        padding: '20px',
        width: '800px',
      }}
    >
      {Object.entries(Icons).map(([name, Icon]) => {
        if (name === 'IconProps') return null;
        return (
          <IconWrapper key={name}>
            <Icon size={24} />
            <span style={{ fontSize: '12px' }}>{name}</span>
          </IconWrapper>
        );
      })}
    </div>
  ),
};

export const Sizes: StoryObj = {
  render: () => {
    const sizes = [16, 24, 32, 48];
    const IconComponent = Icons.AccordionArrowIcon;

    return (
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {sizes.map((size) => (
          <IconWrapper key={size}>
            <IconComponent size={size} />
            <div style={{ fontSize: '12px', marginTop: '8px' }}>{size}px</div>
          </IconWrapper>
        ))}
      </div>
    );
  },
};

export const Colors: StoryObj = {
  render: () => {
    const colors = ['#666666', '#FF0000', '#00FF00', '#0000FF'];
    const IconComponent = Icons.AccordionArrowIcon;

    return (
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {colors.map((color) => (
          <IconWrapper key={color}>
            <IconComponent size={24} color={color} />
            <div style={{ fontSize: '12px', marginTop: '8px' }}>{color}</div>
          </IconWrapper>
        ))}
      </div>
    );
  },
};
