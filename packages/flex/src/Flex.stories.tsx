import { Card } from '@sipe-team/card';
import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

const meta = {
  title: 'Flex',
  component: Flex,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
      description: 'Flex direction',
    },
    align: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
      description: 'Align items',
    },
    justify: {
      control: 'select',
      options: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      description: 'Justify content',
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'Flex wrap',
    },
    gap: {
      control: 'text',
      description: 'Gap between items',
    },
    inline: {
      control: 'boolean',
      description: 'Display as inline-flex',
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    gap: '1rem',
    children: [
      <Card key="1" style={{ height: '20px', width: '100%' }} />,
      <Card key="2" style={{ height: '20px', width: '100%' }} />,
      <Card key="3" style={{ height: '20px', width: '100%' }} />,
    ],
  },
};

export const Direction: Story = {
  args: {
    direction: 'column',
    gap: '1rem',
    style: { width: '100%' },
    children: [
      <Card
        key="1"
        style={{
          padding: '0px',
          height: '60px',
          width: '100%',
        }}
      >
        1
      </Card>,
      <Card
        key="2"
        style={{
          padding: '0px',
          height: '60px',
          width: '100%',
        }}
      >
        2
      </Card>,
      <Card
        key="3"
        style={{
          padding: '0px',
          height: '60px',
          width: '100%',
        }}
      >
        3
      </Card>,
    ],
  },
};

export const Align: Story = {
  args: {
    align: 'center',
    gap: '1rem',
    style: { width: '100%' },
    children: [
      <Card
        key="1"
        style={{ padding: '0px', height: '36px', width: '100%' }}
      />,
      <Card
        key="2"
        style={{ padding: '0px', height: '48px', width: '100%' }}
      />,
      <Card
        key="3"
        style={{ padding: '0px', height: '60px', width: '100%' }}
      />,
    ],
  },
};

export const Justify: Story = {
  render: () => (
    <Flex direction="column" gap="2rem">
      <Flex justify="flex-start" gap="1rem">
        <Card style={{ minWidth: '150px', height: '30px' }} />
        <Card style={{ minWidth: '150px', height: '30px' }}>flex-start</Card>
        <Card style={{ minWidth: '150px', height: '30px' }} />
      </Flex>
      <Flex justify="center" gap="1rem">
        <Card style={{ width: '150px', height: '30px' }} />
        <Card style={{ width: '150px', height: '30px' }}>center</Card>
        <Card style={{ width: '150px', height: '30px' }} />
      </Flex>
      <Flex justify="flex-end" gap="1rem">
        <Card style={{ width: '150px', height: '30px' }} />
        <Card style={{ width: '150px', height: '30px' }}>flex-end</Card>
        <Card style={{ width: '150px', height: '30px' }} />
      </Flex>
      <Flex justify="space-between" gap="1rem">
        <Card style={{ width: '150px', height: '30px' }} />
        <Card style={{ width: '150px', height: '30px' }}>space-between</Card>
        <Card style={{ width: '150px', height: '30px' }} />
      </Flex>
      <Flex justify="space-around" gap="1rem">
        <Card style={{ width: '150px', height: '30px' }} />
        <Card style={{ width: '150px', height: '30px' }}>space-around</Card>
        <Card style={{ width: '150px', height: '30px' }} />
      </Flex>
      <Flex justify="space-evenly" gap="1rem">
        <Card style={{ width: '150px', height: '30px' }} />
        <Card style={{ width: '150px', height: '30px' }}>space-evenly</Card>
        <Card style={{ width: '150px', height: '30px' }} />
      </Flex>
    </Flex>
  ),
};

export const Wrap: Story = {
  args: {
    wrap: 'wrap',
    gap: '1rem',
    style: { maxWidth: '400px' },
    children: [
      <Card key="1" style={{ width: '150px' }} />,
      <Card key="2" style={{ width: '150px' }} />,
      <Card key="3" style={{ width: '150px' }} />,
    ],
  },
};
