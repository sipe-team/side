import { faker } from '@faker-js/faker';
import { Typography } from '@sipe-team/typography';
import type { Meta, StoryObj } from '@storybook/react';
import { color } from './colors';
import { fontSize, fontWeight, lineHeight } from './fonts';

const meta = {
  title: 'Tokens',
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => {
    return (
      <section>
        <Typography size={32} weight="bold">
          색상
        </Typography>
        <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[
            'gray',
            'red',
            'pink',
            'purple',
            'cyan',
            'blue',
            'teal',
            'green',
            'yellow',
            'orange',
          ].map((name) => (
            <ColorCardGroup key={name} groupName={name} />
          ))}
        </section>
      </section>
    );
  },
};

function ColorCardGroup({ groupName }: { groupName: string }) {
  return (
    <section>
      <Typography size={16}>{groupName}</Typography>
      <div
        style={{
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(6, 1fr)',
        }}
      >
        {Object.entries(color)
          .filter(([key]) => key.startsWith(groupName))
          .map(([key, value]) => (
            <ColorCard key={key} name={key} value={value} />
          ))}
      </div>
    </section>
  );
}

function ColorCard({ name, value }: { name: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: value,
          borderRadius: 8,
          height: '4rem',
        }}
      />
      <Typography asChild={true}>
        <span>{name}</span>
      </Typography>
      <Typography asChild={true}>
        <span>{value}</span>
      </Typography>
    </div>
  );
}

export const Fonts: Story = {
  render: () => {
    return (
      <section>
        <Typography size={32} weight="bold">
          글꼴 크기
        </Typography>
        <section>
          {Object.entries(fontSize).map(([key, value]) => (
            <Typography key={key} size={value}>
              {value} / 사이프 디자인 시스템
            </Typography>
          ))}
        </section>
        <Typography size={32} weight="bold">
          글꼴 두께
        </Typography>
        <section>
          {Object.entries(fontWeight).map(([key, value]) => (
            <Typography key={key} weight={key as keyof typeof fontWeight}>
              {key} / {value} / 사이프 디자인 시스템
            </Typography>
          ))}
        </section>
        <Typography size={32} weight="bold">
          줄 높이
        </Typography>
        <section>
          {Object.entries(lineHeight).map(([key, value]) => (
            <div key={key}>
              <Typography>
                {key} / {value}
              </Typography>
              <Typography lineHeight={key as keyof typeof lineHeight}>
                {faker.lorem.paragraphs(4)}
              </Typography>
            </div>
          ))}
        </section>
      </section>
    );
  },
};
