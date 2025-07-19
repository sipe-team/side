import { themeColor } from '@sipe-team/tokens';

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
      mapping: {
        '1st': themeColor['1st'],
        '2nd': themeColor['2nd'],
        '3rd': themeColor['3rd'],
        '4th': themeColor['4th'],
      },
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
        <h1 style={{ marginBottom: 'var(--side-spacing-md)' }}>Current Theme: {currentTheme.primary}</h1>

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
            <div
              style={{
                background: 'var(--side-color-gradient)',
                color: 'var(--side-color-background)',
                padding: 'var(--side-spacing-sm)',
                borderRadius: '4px',
                marginTop: 'var(--side-spacing-sm)',
                fontWeight: 'var(--side-typography-fontWeight-medium)',
              }}
            >
              This is a gradient background container
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export const Default: Story = {
  args: {
    theme: themeColor['4th'],
    children: <ThemeDisplay />,
  },
  render: (args) => {
    return (
      <ThemeProvider theme={args.theme || themeColor['4th']}>
        <ThemeDisplay />
      </ThemeProvider>
    );
  },
};

const NestedThemeExample = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Nested Theme Override Example</h2>

      {/* Parent Theme Container */}
      <ThemeProvider theme={themeColor['1st']}>
        <div
          style={{
            backgroundColor: 'var(--side-color-background)',
            color: 'var(--side-color-text)',
            padding: '20px',
            border: '2px solid var(--side-color-primary)',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          <h3 style={{ color: 'var(--side-color-primary)', margin: '0 0 16px 0' }}>Parent Component (Theme 1st)</h3>
          <p style={{ margin: '0 0 16px 0' }}>This is the parent component using the 1st theme.</p>

          <div
            style={{
              backgroundColor: 'var(--side-color-primary)',
              color: 'var(--side-color-background)',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '20px',
            }}
          >
            Parent theme primary color container
          </div>

          {/* Nested Child Theme Container */}
          <ThemeProvider theme={themeColor['3rd']}>
            <div
              style={{
                backgroundColor: 'var(--side-color-background)',
                color: 'var(--side-color-text)',
                padding: '20px',
                border: '2px solid var(--side-color-secondary)',
                borderRadius: '8px',
                marginTop: '16px',
              }}
            >
              <h4 style={{ color: 'var(--side-color-secondary)', margin: '0 0 12px 0' }}>
                Child Component (Theme 3rd - Overridden)
              </h4>
              <p style={{ margin: '0 0 12px 0' }}>
                This child component overrides the parent theme with the 3rd theme.
              </p>

              <div
                style={{
                  backgroundColor: 'var(--side-color-secondary)',
                  color: 'var(--side-color-background)',
                  padding: '12px',
                  borderRadius: '4px',
                  marginBottom: '16px',
                }}
              >
                Child theme secondary color container
              </div>

              {/* Deeply Nested Component */}
              <ThemeProvider theme={themeColor['4th']}>
                <div
                  style={{
                    backgroundColor: 'var(--side-color-background)',
                    color: 'var(--side-color-text)',
                    padding: '16px',
                    border: '2px dashed var(--side-color-primary)',
                    borderRadius: '6px',
                  }}
                >
                  <h5 style={{ color: 'var(--side-color-primary)', margin: '0 0 8px 0' }}>
                    Grandchild Component (Theme 4th)
                  </h5>
                  <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                    This deeply nested component uses the 4th theme.
                  </p>

                  <div
                    style={{
                      backgroundColor: 'var(--side-color-primary)',
                      color: 'var(--side-color-background)',
                      padding: '8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                    }}
                  >
                    Grandchild primary container
                  </div>
                </div>
              </ThemeProvider>
            </div>
          </ThemeProvider>
        </div>
      </ThemeProvider>
    </div>
  );
};

export const NestedThemeOverride: Story = {
  args: {
    theme: themeColor['4th'],
    children: <NestedThemeExample />,
  },
  render: () => <NestedThemeExample />,
  parameters: {
    docs: {
      description: {
        story:
          'This example demonstrates how themes can be overridden in nested components. Each ThemeProvider creates a new theme context that overrides its parent.',
      },
    },
  },
};
