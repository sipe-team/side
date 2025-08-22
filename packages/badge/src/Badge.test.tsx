import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from './Badge';
import { BadgeColor, BadgeSize, BadgeVariant } from './Badge.constants';

describe('Badge', () => {
  it('renders with default props', () => {
    render(<Badge>Default Badge</Badge>);
    expect(screen.getByText('Default Badge')).toBeInTheDocument();
  });

  it('renders with all size variants', () => {
    const { rerender } = render(<Badge>Test</Badge>);

    Object.values(BadgeSize).forEach((size) => {
      rerender(<Badge size={size}>Test</Badge>);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  it('renders with all variant types', () => {
    const { rerender } = render(<Badge>Test</Badge>);

    Object.values(BadgeVariant).forEach((variant) => {
      rerender(<Badge variant={variant}>Test</Badge>);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  it('renders with all color options', () => {
    const { rerender } = render(<Badge>Test</Badge>);

    Object.values(BadgeColor).forEach((color) => {
      rerender(<Badge color={color}>Test</Badge>);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  it('renders with icons', () => {
    render(
      <Badge leftIcon="👈" rightIcon="👉">
        Test
      </Badge>,
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    expect(screen.getByText('Custom Badge')).toHaveClass('custom-class');
  });

  it('spreads additional props', () => {
    render(<Badge data-testid="badge-test">Test Badge</Badge>);
    expect(screen.getByTestId('badge-test')).toBeInTheDocument();
  });

  it('combines all props correctly', () => {
    render(
      <Badge
        size={BadgeSize.large}
        variant={BadgeVariant.solid}
        color={BadgeColor.danger}
        className="custom-class"
        data-testid="badge-test"
      >
        Combined Badge
      </Badge>,
    );

    const badge = screen.getByTestId('badge-test');
    expect(badge).toHaveClass('custom-class');
    expect(badge).toHaveTextContent('Combined Badge');
  });
});
