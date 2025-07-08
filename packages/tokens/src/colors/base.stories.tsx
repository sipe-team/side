import type { Meta, StoryObj } from '@storybook/react';

import { fontSize, fontWeight } from '../typography/fonts';
import { color } from './colors';

const meta = {
  title: 'Tokens/Base Colors',
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

function ColorCardGroup({ groupName }: { groupName: string }) {
  const colors = Object.entries(color)
    .filter(([key]) => key.startsWith(groupName))
    .sort((a, b) => {
      // 숫자가 있는 경우 숫자 순으로 정렬
      const aNum = parseInt(a[0].replace(groupName, '')) || 0;
      const bNum = parseInt(b[0].replace(groupName, '')) || 0;
      return aNum - bNum;
    });

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
          textTransform: 'capitalize',
        }}
      >
        {groupName}
      </h3>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        {colors.map(([key, value]) => (
          <ColorCard key={key} name={key} value={value} />
        ))}
      </div>
    </section>
  );
}

function ColorCard({ name, value }: { name: string; value: string }) {
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
        minWidth: '70px',
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
      aria-label={`Copy base color ${name} with value ${value}`}
    >
      <div
        style={{
          backgroundColor: value,
          borderRadius: '6px',
          width: '40px',
          height: '40px',
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
        {name.replace(name.match(/[a-z]+/)?.[0] || '', '')}
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
            SIPE Base Colors
          </h1>
          <p
            style={{
              fontSize: `${fontSize[14]}px`,
              color: color.gray500,
              margin: '0 0 24px 0',
            }}
          >
            사이프 디자인 시스템에서 사용하는 기본 색상 팔레트입니다.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gap: '24px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          }}
        >
          {['gray', 'red', 'pink', 'purple', 'cyan', 'blue', 'teal', 'green', 'yellow', 'orange'].map((name) => (
            <ColorCardGroup key={name} groupName={name} />
          ))}
        </div>
      </div>
    );
  },
};
