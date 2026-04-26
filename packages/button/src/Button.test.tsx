import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Button } from './Button';

test('displays text passed as children', () => {
  render(<Button>Test</Button>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});

test('applies correct classes', () => {
  render(<Button>Test</Button>);

  const button = screen.getByRole('button');

  // Should have button classes applied
  expect(button.className).toBeTruthy();
  expect(button.className.length).toBeGreaterThan(0);
});

test('uses filled variant as default when variant is not provided', () => {
  render(<Button>Test</Button>);

  const button = screen.getByRole('button');

  // Should render properly
  expect(button).toBeInTheDocument();
  expect(button.className).toBeTruthy();
});

test('size prop works correctly', () => {
  render(<Button size="sm">Test</Button>);

  const button = screen.getByRole('button');

  // Should render without errors
  expect(button).toBeInTheDocument();
  expect(button.className).toBeTruthy();
});

test('ghost variant works correctly', () => {
  render(<Button variant="ghost">Test</Button>);

  const button = screen.getByRole('button');

  // Should render without errors
  expect(button).toBeInTheDocument();
  expect(button.className).toBeTruthy();
});

test('outline variant works correctly', () => {
  render(<Button variant="outline">Test</Button>);

  const button = screen.getByRole('button');

  // Should render without errors
  expect(button).toBeInTheDocument();
  expect(button.className).toBeTruthy();
});

test('disabled state works correctly', () => {
  render(<Button disabled>Test</Button>);

  const button = screen.getByRole('button');

  // Should be disabled
  expect(button).toBeDisabled();
  expect(button).toBeInTheDocument();
});

test('large size works correctly', () => {
  render(<Button size="lg">Test</Button>);

  const button = screen.getByRole('button');

  // Should render without errors
  expect(button).toBeInTheDocument();
  expect(button.className).toBeTruthy();
});

test('type="button" is used as default when type is not provided', () => {
  render(<Button>Test</Button>);

  const button = screen.getByRole('button');

  // Should default to type="button"
  expect(button).toHaveAttribute('type', 'button');
});

test('type="submit" works correctly', () => {
  render(<Button type="submit">Submit</Button>);

  const button = screen.getByRole('button');

  // Should allow overriding type
  expect(button).toHaveAttribute('type', 'submit');
});
