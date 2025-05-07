import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, useTheme, theme } from './ThemeProvider';

const meta = {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    layout: 'centered',
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

const CustomButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      padding: '8px 16px',
      backgroundColor: theme.color.primary,
      color: theme.color.black,
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: theme.typography.fontWeight.medium,
    }}
  >
    {children}
  </button>
);

const ThemeToggler = () => {
  const { mode, toggleMode } = useTheme();

  return <CustomButton onClick={toggleMode}>Toggle Theme ({mode})</CustomButton>;
};

const ThemeDisplay = () => {
  const { mode } = useTheme();

  const themeVars = [
    {
      category: 'Colors',
      vars: ['color-primary', 'color-background', 'color-text', 'color-border', 'color-black', 'color-white'],
    },
  ];

  return (
    <div
      style={{
        maxWidth: '800px',
        color: theme.color.text,
        backgroundColor: theme.color.background,
        padding: theme.spacing.md,
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <h1 style={{ marginBottom: theme.spacing.md }}>Current Theme: {mode}</h1>

      <ThemeToggler />

      <div style={{ marginTop: theme.spacing.xl }}>
        <h2>Theme Preview</h2>
        <div
          style={{
            padding: theme.spacing.md,
            border: `1px solid ${theme.color.border}`,
            borderRadius: '8px',
          }}
        >
          <p style={{ color: theme.color.text, fontSize: theme.typography.fontSize.medium }}>
            This is regular text using the theme&apos;s text color and medium font size.
          </p>
          <p
            style={{
              color: theme.color.primary,
              fontSize: theme.typography.fontSize.large,
              fontWeight: theme.typography.fontWeight.bold,
            }}
          >
            This is primary-colored text with large font size and bold weight.
          </p>
          <div
            style={{
              backgroundColor: theme.color.primary,
              color: mode === 'dark' ? theme.color.black : theme.color.white,
              padding: theme.spacing.sm,
              borderRadius: '4px',
              marginTop: theme.spacing.sm,
              fontWeight: theme.typography.fontWeight.medium,
            }}
          >
            This is a primary background container
          </div>
        </div>
      </div>

      <div style={{ marginTop: theme.spacing.md }}>
        {themeVars.map(({ category, vars }) => (
          <div key={category} style={{ marginBottom: theme.spacing.md }}>
            <h2>{category}</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: theme.spacing.sm,
              }}
            >
              {vars.map((varName) => {
                const fullVarName = `--side-${varName}`;
                const value = getComputedStyle(document.documentElement).getPropertyValue(fullVarName);

                return (
                  <div
                    key={varName}
                    style={{
                      padding: theme.spacing.sm,
                      border: `1px solid ${theme.color.border}`,
                      borderRadius: '4px',
                      marginBottom: theme.spacing.xs,
                    }}
                  >
                    <div style={{ fontWeight: theme.typography.fontWeight.bold }}>{fullVarName}</div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: theme.spacing.xs,
                      }}
                    >
                      {varName.includes('color') && !varName.includes('typography') && (
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: value,
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                          }}
                        />
                      )}
                      <code>{value}</code>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Default: Story = {
  args: {
    defaultMode: 'light',
    children: <ThemeDisplay />,
  },
};

const ThemeComponent = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <div
      style={{
        maxWidth: '500px',
        padding: '24px',
        backgroundColor: 'var(--side-color-background)',
        color: 'var(--side-color-text)',
        borderRadius: '8px',
        border: '1px solid var(--side-color-border)',
        fontFamily: 'var(--side-typography-font-family)',
      }}
    >
      <h2
        style={{
          fontSize: 'var(--side-typography-font-size-large)',
          fontWeight: 'var(--side-typography-font-weight-bold)',
          marginBottom: 'var(--side-spacing-md)',
        }}
      >
        Theme Component Using CSS Variables
      </h2>

      <p
        style={{
          fontSize: 'var(--side-typography-font-size-medium)',
          lineHeight: 'var(--side-typography-line-height-default)',
          marginBottom: 'var(--side-spacing-md)',
        }}
      >
        This component directly accesses CSS variables from the theme. Current theme mode: <strong>{mode}</strong>
      </p>

      <div
        style={{
          display: 'flex',
          gap: 'var(--side-spacing-md)',
        }}
      >
        <button
          type="button"
          onClick={toggleMode}
          style={{
            padding: 'var(--side-spacing-xs) var(--side-spacing-sm)',
            backgroundColor: 'var(--side-color-primary)',
            color: mode === 'dark' ? 'var(--side-color-black)' : 'var(--side-color-white)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'var(--side-typography-font-weight-medium)',
            transition: 'all 0.2s ease',
          }}
        >
          Toggle Theme
        </button>

        <button
          type="button"
          style={{
            padding: 'var(--side-spacing-xs) var(--side-spacing-sm)',
            backgroundColor: 'transparent',
            color: 'var(--side-color-text)',
            border: '1px solid var(--side-color-border)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'var(--side-typography-font-weight-medium)',
            transition: 'all 0.2s ease',
          }}
        >
          Secondary Button
        </button>
      </div>

      <div
        style={{
          marginTop: 'var(--side-spacing-lg)',
          padding: 'var(--side-spacing-sm)',
          backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
          borderRadius: '4px',
          fontSize: 'var(--side-typography-font-size-small)',
        }}
      >
        <p>Direct CSS variable usage example:</p>
        <code>backgroundColor: &apos;var(--side-color-background)&apos;</code>
      </div>
    </div>
  );
};
