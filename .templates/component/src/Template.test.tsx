import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Template } from './Template';

test('renders Template', () => {
  render(<Template>Test</Template>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});
