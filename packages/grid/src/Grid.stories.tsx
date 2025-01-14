import { Card } from '@sipe-team/card';
import type { Meta, StoryObj } from '@storybook/react';
import * as Grid from './Grid';
import '@sipe-team/card/styles.css';

const meta = {
  title: 'Grid',
  component: Grid.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '20px',
          maxWidth: '100%',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    templateColumns: {
      control: 'text',
      description: 'Grid template columns',
    },
    templateRows: {
      control: 'text',
      description: 'Grid template rows',
    },
    gap: {
      control: 'text',
      description: 'Gap between grid items',
    },
    alignItems: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch'],
      description: 'Align grid items',
    },
    justifyItems: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch'],
      description: 'Justify grid items',
    },
    alignContent: {
      control: 'select',
      options: ['start', 'end', 'center', 'space-between', 'space-around'],
      description: 'Align grid content',
    },
    justifyContent: {
      control: 'select',
      options: ['start', 'end', 'center', 'space-between', 'space-around'],
      description: 'Justify grid content',
    },
  },
} satisfies Meta<typeof Grid.Root>;

export default meta;
type Story = StoryObj<typeof Grid.Root>;

export const Basic: Story = {
  args: {
    templateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    children: [<Card key="1" />, <Card key="2" />, <Card key="3" />],
  },
};
