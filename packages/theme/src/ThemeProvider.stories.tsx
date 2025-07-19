import { type ThemeColor, themeColor } from '@sipe-team/tokens';

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

const CustomThemeExample = () => {
  // Custom theme object
  const customTheme: ThemeColor = {
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
    background: '#f8f9fa',
    text: '#343a40',
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Custom Theme Injection Example</h2>

      {/* Custom Theme Container */}
      <ThemeProvider theme={customTheme}>
        <div
          style={{
            backgroundColor: 'var(--side-color-background)',
            color: 'var(--side-color-text)',
            padding: '24px',
            border: '3px solid var(--side-color-primary)',
            borderRadius: '12px',
            marginBottom: '20px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ color: 'var(--side-color-primary)', margin: '0 0 16px 0' }}>Custom Theme Component</h3>
          <p style={{ margin: '0 0 16px 0', lineHeight: '1.6' }}>
            This component uses a completely custom theme with custom colors:
          </p>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div
              style={{
                backgroundColor: 'var(--side-color-primary)',
                color: 'var(--side-color-background)',
                padding: '12px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Primary: #ff6b6b
            </div>
            <div
              style={{
                backgroundColor: 'var(--side-color-secondary)',
                color: 'var(--side-color-background)',
                padding: '12px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Secondary: #4ecdc4
            </div>
          </div>

          <div
            style={{
              background: 'var(--side-color-gradient)',
              color: 'var(--side-color-background)',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center',
              fontWeight: '600',
            }}
          >
            Custom Gradient Background
          </div>

          {/* Nested with predefined theme */}
          <ThemeProvider theme={themeColor['2nd']}>
            <div
              style={{
                backgroundColor: 'var(--side-color-background)',
                color: 'var(--side-color-text)',
                padding: '16px',
                border: '2px solid var(--side-color-secondary)',
                borderRadius: '8px',
                marginTop: '16px',
              }}
            >
              <h4 style={{ color: 'var(--side-color-secondary)', margin: '0 0 12px 0' }}>
                Nested Predefined Theme (2nd)
              </h4>
              <p style={{ margin: '0 0 12px 0', fontSize: '14px' }}>
                This shows how you can nest predefined themes within custom themes.
              </p>

              <div
                style={{
                  backgroundColor: 'var(--side-color-secondary)',
                  color: 'var(--side-color-background)',
                  padding: '10px',
                  borderRadius: '4px',
                  fontSize: '13px',
                }}
              >
                Predefined theme container
              </div>
            </div>
          </ThemeProvider>
        </div>
      </ThemeProvider>

      {/* Multiple Custom Themes Side by Side */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <ThemeProvider
          theme={{
            primary: '#8b5cf6',
            secondary: '#06b6d4',
            background: '#fafafa',
            text: '#1f2937',
            gradient: 'linear-gradient(45deg, #8b5cf6 0%, #06b6d4 100%)',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--side-color-background)',
              color: 'var(--side-color-text)',
              padding: '16px',
              border: '2px solid var(--side-color-primary)',
              borderRadius: '8px',
              minWidth: '200px',
              flex: '1',
            }}
          >
            <h4 style={{ color: 'var(--side-color-primary)', margin: '0 0 8px 0' }}>Purple Theme</h4>
            <div
              style={{
                backgroundColor: 'var(--side-color-primary)',
                color: 'var(--side-color-background)',
                padding: '8px',
                borderRadius: '4px',
                fontSize: '12px',
                textAlign: 'center',
              }}
            >
              Custom Purple
            </div>
          </div>
        </ThemeProvider>

        <ThemeProvider
          theme={{
            primary: '#10b981',
            secondary: '#f59e0b',
            background: '#f9fafb',
            text: '#374151',
            gradient: 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--side-color-background)',
              color: 'var(--side-color-text)',
              padding: '16px',
              border: '2px solid var(--side-color-primary)',
              borderRadius: '8px',
              minWidth: '200px',
              flex: '1',
            }}
          >
            <h4 style={{ color: 'var(--side-color-primary)', margin: '0 0 8px 0' }}>Green Theme</h4>
            <div
              style={{
                backgroundColor: 'var(--side-color-primary)',
                color: 'var(--side-color-background)',
                padding: '8px',
                borderRadius: '4px',
                fontSize: '12px',
                textAlign: 'center',
              }}
            >
              Custom Green
            </div>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export const CustomThemeInjection: Story = {
  args: {
    theme: themeColor['4th'],
    children: <CustomThemeExample />,
  },
  render: () => <CustomThemeExample />,
  parameters: {
    docs: {
      description: {
        story:
          'This example demonstrates how to inject completely custom theme objects. You can create custom themes with any color values and use them alongside predefined themes.',
      },
    },
  },
};
