import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

const meta = {
  title: 'Components/Flex',
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
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
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

const Box = ({ style, children }: { style?: React.CSSProperties; children?: React.ReactNode }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      minHeight: '5rem',
      backgroundClip: 'padding-box',
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      borderWidth: '1px',
      backgroundColor: '#e4e4e7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}
  >
    {children}
  </div>
);

export const Basic: Story = {
  args: {
    gap: '1rem',
    children: [<Box key="1" />, <Box key="2" />, <Box key="3" />],
  },
};

export const Direction: Story = {
  args: {
    direction: 'column',
    gap: '1rem',
    style: { width: '100%' },
    children: [<Box key="1" />, <Box key="2" />, <Box key="3" />],
  },
};

export const Align: Story = {
  args: {
    align: 'center',
    gap: '1rem',
    style: { width: '100%' },
    children: [
      <Box key="1" style={{ height: '5rem' }} />,
      <Box key="2" style={{ height: '7rem' }} />,
      <Box key="3" style={{ height: '9rem' }} />,
    ],
  },
};

export const Justify: Story = {
  render: () => (
    <Flex direction="column" gap="2rem">
      <Flex justify="flex-start" gap="1rem">
        <Box style={{ width: '150px' }} />
        <Box style={{ width: '150px' }}>flex-start</Box>
        <Box style={{ width: '150px' }} />
      </Flex>
      <Flex justify="center" gap="1rem">
        <Box style={{ width: '150px' }} />
        <Box style={{ width: '150px' }}>center</Box>
        <Box style={{ width: '150px' }} />
      </Flex>
      <Flex justify="flex-end" gap="1rem">
        <Box style={{ width: '150px' }} />
        <Box style={{ width: '150px' }}>flex-end</Box>
        <Box style={{ width: '150px' }} />
      </Flex>
      <Flex justify="space-between" gap="1rem">
        <Box style={{ width: '150px' }} />
        <Box style={{ width: '150px' }}>space-between</Box>
        <Box style={{ width: '150px' }} />
      </Flex>
      <Flex justify="space-around" gap="1rem">
        <Box style={{ width: '150px' }} />
        <Box style={{ width: '150px' }}>space-around</Box>
        <Box style={{ width: '150px' }} />
      </Flex>
      <Flex justify="space-evenly" gap="1rem">
        <Box style={{ width: '150px' }} />
        <Box style={{ width: '150px' }}>space-evenly</Box>
        <Box style={{ width: '150px' }} />
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
      <Box key="1" style={{ width: '150px' }} />,
      <Box key="2" style={{ width: '150px' }} />,
      <Box key="3" style={{ width: '150px' }} />,
    ],
  },
};
