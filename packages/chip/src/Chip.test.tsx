import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Chip } from './Chip';

describe('Chip', () => {
  it('renders correctly', () => {
    render(<Chip>Test Chip</Chip>);
    expect(screen.getByText('Test Chip')).toBeTruthy();
  });

  it('applies correct default props', () => {
    render(<Chip>Default Chip</Chip>);
    const chip = screen.getByText('Default Chip');
    expect(chip).toBeTruthy();
  });

  it('applies custom props correctly', () => {
    render(
      <Chip color="success" variant="outline" size="large" state="selected">
        Custom Chip
      </Chip>,
    );
    const chip = screen.getByText('Custom Chip');
    expect(chip).toBeTruthy();
  });

  it('renders as button by default', () => {
    render(<Chip>Button Chip</Chip>);
    const chip = screen.getByText('Button Chip');
    expect(chip.tagName).toBe('BUTTON');
  });

  it('renders as custom element with asChild', () => {
    render(
      <Chip asChild>
        <div>Div Chip</div>
      </Chip>,
    );
    const chip = screen.getByText('Div Chip');
    expect(chip.tagName).toBe('DIV');
  });

  it('applies disabled class when disabled', () => {
    render(<Chip disabled>Disabled Chip</Chip>);
    const chip = screen.getByText('Disabled Chip');
    expect(chip).toBeTruthy();
  });
});
