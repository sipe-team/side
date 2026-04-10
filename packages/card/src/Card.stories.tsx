import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    ratio: {
      control: 'select',
      options: ['rectangle', 'square', 'wide', 'portrait', 'auto'],
    },
    variant: {
      control: 'select',
      options: ['filled', 'outline'],
    },
  },
} satisfies Meta<typeof Card>;
export default meta;

type Story = StoryObj<typeof meta>;

const RatioVisualizer = ({ label, ratio }: { label: string; ratio: string }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 140, 255, 0.1)',
      borderRadius: '8px',
      padding: '10px',
    }}
  >
    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{label}</div>
    <div style={{ fontSize: '14px', marginTop: '4px' }}>{ratio}</div>
  </div>
);

// Default example
export const Default: Story = {
  args: {
    children: <span style={{ fontSize: '20px' }}>Card</span>,
    variant: 'filled',
    ratio: 'rectangle',
    style: { width: '300px' },
  },
};

// Filled variant with all ratios in a row
export const FilledVariant: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '1000px' }}>
      <h3>Filled Variant - All Ratios</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Card variant="filled" ratio="rectangle" style={{ width: '250px' }}>
            <RatioVisualizer label="Rectangle" ratio="16:9" />
          </Card>
          <div>Rectangle (16:9)</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Card variant="filled" ratio="square" style={{ width: '250px' }}>
            <RatioVisualizer label="Square" ratio="1:1" />
          </Card>
          <div>Square (1:1)</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Card variant="filled" ratio="wide" style={{ width: '250px' }}>
            <RatioVisualizer label="Wide" ratio="21:9" />
          </Card>
          <div>Wide (21:9)</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Card variant="filled" ratio="portrait" style={{ width: '200px' }}>
            <RatioVisualizer label="Portrait" ratio="3:4" />
          </Card>
          <div>Portrait (3:4)</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Card variant="filled" ratio="auto" style={{ width: '250px', height: '150px' }}>
            <RatioVisualizer label="Auto" ratio="Custom" />
          </Card>
          <div>Auto (Custom Size)</div>
        </div>
      </div>
    </div>
  ),
};

// Outline variant with all ratios in a row
export const OutlineVariant: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '1000px' }}>
      <h3>Outline Variant - All Ratios</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Card variant="outline" ratio="rectangle" style={{ width: '250px' }}>
            <RatioVisualizer label="Rectangle" ratio="16:9" />
          </Card>
          <div>Rectangle (16:9)</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Card variant="outline" ratio="square" style={{ width: '250px' }}>
            <RatioVisualizer label="Square" ratio="1:1" />
          </Card>
          <div>Square (1:1)</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Card variant="outline" ratio="wide" style={{ width: '250px' }}>
            <RatioVisualizer label="Wide" ratio="21:9" />
          </Card>
          <div>Wide (21:9)</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Card variant="outline" ratio="portrait" style={{ width: '200px' }}>
            <RatioVisualizer label="Portrait" ratio="3:4" />
          </Card>
          <div>Portrait (3:4)</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Card variant="outline" ratio="auto" style={{ width: '250px', height: '150px' }}>
            <RatioVisualizer label="Auto" ratio="Custom" />
          </Card>
          <div>Auto (Custom Size)</div>
        </div>
      </div>
    </div>
  ),
};
