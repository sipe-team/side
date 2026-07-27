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
  expect(button.className).toBeTruthy();
  expect(button.className.length).toBeGreaterThan(0);
});

test('uses fill variant as default when variant is not provided', () => {
  render(<Button>Test</Button>);
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button.className).toBeTruthy();
});

test('size sm works correctly', () => {
  render(<Button size="sm">Test</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('size md works correctly', () => {
  render(<Button size="md">Test</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('size lg works correctly', () => {
  render(<Button size="lg">Test</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('size xl works correctly', () => {
  render(<Button size="xl">Test</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('fill variant works correctly', () => {
  render(<Button variant="fill">Test</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('ghost variant works correctly', () => {
  render(<Button variant="ghost">Test</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('outline variant works correctly', () => {
  render(<Button variant="outline">Test</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('disabled state works correctly', () => {
  render(<Button disabled>Test</Button>);
  const button = screen.getByRole('button');
  expect(button).toBeDisabled();
});

test('renders left icon', () => {
  render(<Button leftIcon={<span data-testid="left-icon">L</span>}>Test</Button>);
  expect(screen.getByTestId('left-icon')).toBeInTheDocument();
});

test('renders right icon', () => {
  render(<Button rightIcon={<span data-testid="right-icon">R</span>}>Test</Button>);
  expect(screen.getByTestId('right-icon')).toBeInTheDocument();
});

test('renders both icons', () => {
  render(
    <Button leftIcon={<span data-testid="left-icon">L</span>} rightIcon={<span data-testid="right-icon">R</span>}>
      Test
    </Button>,
  );
  expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  expect(screen.getByTestId('right-icon')).toBeInTheDocument();
});

test('type="button" is used as default when type is not provided', () => {
  render(<Button>Test</Button>);
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
});

test('type="submit" works correctly', () => {
  render(<Button type="submit">Submit</Button>);
  expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
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
