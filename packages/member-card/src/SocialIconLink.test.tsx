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
  test.each(ALL_TYPES)('renders the icon with correct aria-label for %s type', (type) => {
    render(<SocialIconLink type={type} />);
    expect(screen.getByRole('img', { name: EXPECTED_LABELS[type] })).toBeInTheDocument();
  });

  test('email URLs already prefixed with mailto: are not double-prefixed', () => {
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
});
