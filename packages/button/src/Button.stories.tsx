import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      description: 'The visual style of the button',
      options: ['fill', 'outline', 'ghost'],
      control: { type: 'radio' },
    },
    size: {
      description: 'The size of the button',
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'radio' },
    },
    disabled: {
      description: 'Whether the button is disabled',
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'Button',
    variant: 'fill',
    size: 'lg',
  },
};

export const Variants: Story = {
  args: {
    children: 'Button',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button {...args} variant="fill">
        Fill
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    children: 'Button',
    variant: 'fill',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
      <Button {...args} size="xl">
        Extra Large
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Button',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button {...args} variant="fill" disabled>
        Fill Disabled
      </Button>
      <Button {...args} variant="outline" disabled>
        Outline Disabled
      </Button>
      <Button {...args} variant="ghost" disabled>
        Ghost Disabled
      </Button>
    </div>
  ),
};

export const WithLeftIcon: Story = {
  args: {
    children: 'Search',
    variant: 'fill',
    size: 'xl',
    leftIcon: <SearchIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Next',
    variant: 'fill',
    size: 'xl',
    rightIcon: <ArrowRightIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    children: 'Download',
    variant: 'fill',
    size: 'xl',
    leftIcon: <DownloadIcon />,
    rightIcon: <ChevronRightIcon />,
  },
};

export const AllVariantsAndSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {(['fill', 'outline', 'ghost'] as const).map((variant) => (
        <div key={variant}>
          <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{variant}</div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <Button key={size} variant={variant} size={size}>
                {size.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
