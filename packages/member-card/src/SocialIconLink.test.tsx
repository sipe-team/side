import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { SocialIconLink, SocialType } from './SocialIconLink';

const ALL_TYPES = Object.values(SocialType);
const EXPECTED_LABELS: Record<SocialType, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  youtube: 'YouTube',
  kakao: 'KakaoTalk',
  email: 'Email',
  link: 'Link',
};

describe('SocialIconLink', () => {
  test.each(ALL_TYPES)('renders the icon SVG for %s type', (type) => {
    const { container } = render(<SocialIconLink type={type} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: EXPECTED_LABELS[type] })).toBeInTheDocument();
  });

  test.each(ALL_TYPES)('renders as a link with proper aria-label for %s type', (type) => {
    const url = type === 'email' ? 'foo@example.com' : 'example.com';
    render(<SocialIconLink type={type} url={url} />);
    expect(screen.getByRole('link', { name: EXPECTED_LABELS[type] })).toBeInTheDocument();
  });

  test('email links use mailto: scheme even when scheme already provided', () => {
    render(<SocialIconLink type="email" url="mailto:foo@example.com" />);
    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute('href', 'mailto:foo@example.com');
  });

  test('http URLs are preserved without adding https:// prefix', () => {
    render(<SocialIconLink type="github" url="http://example.com/user" />);
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'http://example.com/user');
  });

  test('bare URLs get an https:// prefix', () => {
    render(<SocialIconLink type="link" url="example.com" />);
    expect(screen.getByRole('link', { name: 'Link' })).toHaveAttribute('href', 'https://example.com');
  });

  test('md size renders larger icon than sm', () => {
    const { container: smContainer } = render(<SocialIconLink type="github" size="sm" />);
    const { container: mdContainer } = render(<SocialIconLink type="github" size="md" />);
    const smSvg = smContainer.querySelector('svg');
    const mdSvg = mdContainer.querySelector('svg');
    expect(smSvg?.getAttribute('class')).not.toEqual(mdSvg?.getAttribute('class'));
  });

  test('link has target=_blank and rel=noopener noreferrer', () => {
    render(<SocialIconLink type="github" url="github.com/x" />);
    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
