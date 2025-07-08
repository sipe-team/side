import type { Meta, StoryObj } from '@storybook/react';

import { ThemeProvider, useTheme } from './ThemeProvider';

const meta = {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['1st', '2nd', '3rd', '4th'],
      description: 'Select theme variant',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const ThemeDisplay = () => {
  const { theme: currentTheme } = useTheme();

  return (
    <ThemeProvider theme={currentTheme}>
      <div
        style={{
          maxWidth: '800px',
          color: 'var(--side-color-text)',
          backgroundColor: 'var(--side-color-background)',
          padding: 'var(--side-spacing-md)',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          fontFamily: 'var(--side-typography-fontFamily)',
          border: '1px solid var(--side-color-border)',
        }}
      >
        <h1 style={{ marginBottom: 'var(--side-spacing-md)' }}>Current Theme: {currentTheme}</h1>

        <div style={{ marginTop: 'var(--side-spacing-xl)' }}>
          <h2>Theme Preview</h2>
          <div
            style={{
              padding: 'var(--side-spacing-md)',
              border: '1px solid var(--side-color-border)',
              borderRadius: '8px',
              marginBottom: 'var(--side-spacing-md)',
            }}
          >
            <p
              style={{
                color: 'var(--side-color-text)',
                fontSize: 'var(--side-typography-fontSize-400)',
                marginBottom: 'var(--side-spacing-sm)',
              }}
            >
              This is regular text using the theme&apos;s text color and medium font size.
            </p>
            <p
              style={{
                color: 'var(--side-color-primary)',
                fontSize: 'var(--side-typography-fontSize-600)',
                fontWeight: 'var(--side-typography-fontWeight-bold)',
                marginBottom: 'var(--side-spacing-sm)',
              }}
            >
              This is primary-colored text with large font size and bold weight.
            </p>
            <div
              style={{
                backgroundColor: 'var(--side-color-primary)',
                color: 'var(--side-color-background)',
                padding: 'var(--side-spacing-sm)',
                borderRadius: '4px',
                marginTop: 'var(--side-spacing-sm)',
                fontWeight: 'var(--side-typography-fontWeight-medium)',
              }}
            >
              This is a primary background container
            </div>
            <div
              style={{
                backgroundColor: 'var(--side-color-secondary)',
                color: 'var(--side-color-background)',
                padding: 'var(--side-spacing-sm)',
                borderRadius: '4px',
                marginTop: 'var(--side-spacing-sm)',
                fontWeight: 'var(--side-typography-fontWeight-medium)',
              }}
            >
              This is a secondary background container
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export const Default: Story = {
  args: {
    theme: '4th',
    children: <ThemeDisplay />,
  },
};
