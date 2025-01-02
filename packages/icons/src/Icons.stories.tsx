import type { Meta, StoryObj } from '@storybook/react';
import * as Icons from './';

export default {
  title: 'Icons',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

const checkerboardStyle = {
  backgroundColor: '#e0e0e0',
  backgroundImage: `
    linear-gradient(45deg, #cccccc 25%, transparent 25%),
    linear-gradient(-45deg, #cccccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #cccccc 75%),
    linear-gradient(-45deg, transparent 75%, #cccccc 75%)
  `,
  backgroundSize: '20px 20px',
  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
};

export const AllIcons: StoryObj = {
  render: () => {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '20px',
        padding: '20px',
      }}>
        {Object.entries(Icons).map(([name, Icon]) => {
          if (name === 'IconProps') return null;
          return (
            <div
              key={name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '12px',
                border: '1px solid #eee',
                borderRadius: '8px',
                ...checkerboardStyle
              }}
            >
              {/* @ts-ignore */}
              <Icon size={24} />
              <span style={{ fontSize: '12px' }}>{name}</span>
            </div>
          );
        })}
      </div>
    );
  },
};

export const Sizes: StoryObj = {
  render: () => {
    const sizes = [16, 24, 32, 48];
    const IconComponent = Icons.AccordionArrowIcon;

    return (
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {sizes.map(size => (
          <div
            key={size}
            style={{
              textAlign: 'center',
              padding: '12px',
              borderRadius: '8px',
              ...checkerboardStyle
            }}
          >
            <IconComponent size={size} />
            <div style={{ fontSize: '12px', marginTop: '8px' }}>{size}px</div>
          </div>
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
        {colors.map(color => (
          <div
            key={color}
            style={{
              textAlign: 'center',
              padding: '12px',
              borderRadius: '8px',
              ...checkerboardStyle
            }}
          >
            <IconComponent size={24} color={color} />
            <div style={{ fontSize: '12px', marginTop: '8px' }}>{color}</div>
          </div>
        ))}
      </div>
    );
  },
};