import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Component } from './Component';

test('renders Component', () => {
  render(<Component>Test</Component>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});
