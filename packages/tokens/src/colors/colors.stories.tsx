import type { Meta, StoryObj } from '@storybook/react';

import { fontSize, fontWeight } from '../typography/fonts';
import { color, themeColor } from './colors';

const meta = {
  title: 'Tokens/Theme Colors',
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

function ThemeColorGroup({ themeName }: { themeName: string }) {
  const theme = themeColor[themeName as keyof typeof themeColor];

  return (
    <section
      style={{
        backgroundColor: color.white,
        border: `1px solid ${color.gray200}`,
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h3
        style={{
          fontSize: `${fontSize[16]}px`,
          fontWeight: fontWeight.semiBold,
          margin: '0 0 12px 0',
          color: color.black,
        }}
      >
        Theme {themeName}
      </h3>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '12px',
        }}
      >
        <ThemeColorCard name="primary" value={theme.primary} />
        <ThemeColorCard name="secondary" value={theme.secondary} />
        <ThemeColorCard name="background" value={theme.background} />
        <ThemeColorCard name="text" value={theme.text} />
      </div>
      <GradientCard name="gradient" gradient={theme.gradient} />
    </section>
  );
}

function ThemeColorCard({ name, value }: { name: string; value: string }) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      console.log(`Copied: ${value}`);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <button
      type="button"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        minWidth: '90px',
        border: 'none',
        background: 'transparent',
        padding: 0,
      }}
      onClick={copyToClipboard}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
      title={`${name}: ${value}`}
      aria-label={`Copy color ${name} with value ${value}`}
    >
      <div
        style={{
          backgroundColor: value,
          borderRadius: '6px',
          width: '50px',
          height: '50px',
          border: `1px solid ${color.gray200}`,
          marginBottom: '4px',
        }}
      />
      <span
        style={{
          fontSize: `${fontSize[12]}px`,
          fontWeight: fontWeight.medium,
          color: color.gray600,
          textAlign: 'center',
          lineHeight: 1.2,
          marginBottom: '2px',
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontSize: `${fontSize[12]}px`,
          color: color.gray500,
          textAlign: 'center',
          lineHeight: 1.2,
          fontFamily: 'monospace',
        }}
      >
        {value}
      </span>
    </button>
  );
}

function GradientCard({ name, gradient }: { name: string; gradient: string }) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(gradient);
      console.log(`Copied: ${gradient}`);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <button
      type="button"
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        width: '100%',
        border: 'none',
        background: 'transparent',
        padding: 0,
      }}
      onClick={copyToClipboard}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
      title={`${name}: ${gradient}`}
      aria-label={`Copy gradient ${name} with value ${gradient}`}
    >
      <div
        style={{
          background: gradient,
          borderRadius: '6px',
          width: '100%',
          height: '50px',
          border: `1px solid ${color.gray200}`,
          marginBottom: '8px',
        }}
      />
      <span
        style={{
          fontSize: `${fontSize[12]}px`,
          fontWeight: fontWeight.medium,
          color: color.gray600,
          textAlign: 'center',
          lineHeight: 1.2,
          marginBottom: '2px',
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontSize: `${fontSize[12]}px`,
          color: color.gray500,
          textAlign: 'center',
          lineHeight: 1.2,
          fontFamily: 'monospace',
          wordBreak: 'break-all',
          padding: '0 8px',
        }}
      >
        {gradient}
      </span>
    </button>
  );
}

export const Default: Story = {
  render: () => {
    return (
      <div
        style={{
          width: '100%',
          maxWidth: '100%',
          padding: '24px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ marginBottom: '32px' }}>
          <h1
            style={{
              fontSize: `${fontSize[24]}px`,
              fontWeight: fontWeight.bold,
              marginBottom: '8px',
              color: color.black,
            }}
          >
            SIPE Theme Colors
          </h1>
          <p
            style={{
              fontSize: `${fontSize[14]}px`,
              color: color.gray500,
              margin: '0 0 24px 0',
            }}
          >
            사이프 디자인 시스템에서 사용하는 테마 색상입니다.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gap: '24px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          }}
        >
          {Object.keys(themeColor).map((themeName) => (
            <ThemeColorGroup key={themeName} themeName={themeName} />
          ))}
        </div>
      </div>
    );
  },
};
