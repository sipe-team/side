import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { MemberCard } from './MemberCard';

test('renders name and part', () => {
  render(<MemberCard name="홍길동" part="Frontend" />);
  expect(screen.getByRole('heading', { name: '홍길동' })).toBeInTheDocument();
  expect(screen.getByText('Frontend')).toBeInTheDocument();
});

test('renders introduce text when provided', () => {
  render(<MemberCard name="홍길동" part="Frontend" introduce="반갑습니다." />);
  expect(screen.getByText('반갑습니다.')).toBeInTheDocument();
});

test('does not render introduce when omitted', () => {
  render(<MemberCard name="홍길동" part="Frontend" />);
  expect(screen.queryByText(/반갑습니다/)).not.toBeInTheDocument();
});

test('renders review section with heading when review provided', () => {
  render(<MemberCard name="홍길동" part="Frontend" review="정말 좋은 경험이었어요." />);
  expect(screen.getByRole('heading', { name: '활동후기' })).toBeInTheDocument();
  expect(screen.getByText('정말 좋은 경험이었어요.')).toBeInTheDocument();
});

test('does not render review section when omitted', () => {
  render(<MemberCard name="홍길동" part="Frontend" />);
  expect(screen.queryByRole('heading', { name: '활동후기' })).not.toBeInTheDocument();
});

test('renders Organizer badge when isOrganizer is true', () => {
  render(<MemberCard name="홍길동" part="Frontend" isOrganizer />);
  expect(screen.getByText('Organizer')).toBeInTheDocument();
});

test('does not render Organizer badge by default', () => {
  render(<MemberCard name="홍길동" part="Frontend" />);
  expect(screen.queryByText('Organizer')).not.toBeInTheDocument();
});

test('renders social links with proper hrefs and target', () => {
  render(
    <MemberCard
      name="홍길동"
      part="Frontend"
      links={[
        { type: 'github', url: 'github.com/gildong' },
        { type: 'linkedin', url: 'https://linkedin.com/in/gildong' },
      ]}
    />,
  );
  const github = screen.getByRole('link', { name: 'GitHub' });
  const linkedin = screen.getByRole('link', { name: 'LinkedIn' });
  expect(github).toHaveAttribute('href', 'https://github.com/gildong');
  expect(github).toHaveAttribute('target', '_blank');
  expect(github).toHaveAttribute('rel', 'noopener noreferrer');
  expect(linkedin).toHaveAttribute('href', 'https://linkedin.com/in/gildong');
});

test('email links use mailto: scheme', () => {
  render(<MemberCard name="홍길동" part="Frontend" links={[{ type: 'email', url: 'gildong@example.com' }]} />);
  expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute('href', 'mailto:gildong@example.com');
});

test('does not render links list when links is empty', () => {
  render(<MemberCard name="홍길동" part="Frontend" links={[]} />);
  expect(screen.queryByRole('list')).not.toBeInTheDocument();
});

test('renders avatar image when imgSrc provided', () => {
  render(<MemberCard name="홍길동" part="Frontend" imgSrc="/avatar.png" imgAlt="홍길동 아바타" />);
  const img = screen.getByRole('img', { name: '홍길동 아바타' });
  expect(img).toHaveAttribute('src', '/avatar.png');
});

test('renders as an article element', () => {
  const { container } = render(<MemberCard name="홍길동" part="Frontend" />);
  expect(container.firstChild?.nodeName).toBe('ARTICLE');
});

test('outline variant references border.strong token', () => {
  const { container } = render(<MemberCard name="홍길동" part="Frontend" variant="outline" />);
  const root = container.firstChild as HTMLElement;
  const rules = Array.from(document.styleSheets)
    .flatMap((sheet) => {
      try {
        return Array.from(sheet.cssRules);
      } catch {
        return [];
      }
    })
    .filter((rule): rule is CSSStyleRule => 'selectorText' in rule)
    .filter((rule) =>
      root.className
        .split(/\s+/)
        .filter(Boolean)
        .some((cls) => rule.selectorText.split(',').some((s) => s.trim() === `.${cls}`)),
    )
    .map((rule) => rule.cssText)
    .join('\n');
  expect(rules).toContain('var(--side-color-border-strong)');
});
