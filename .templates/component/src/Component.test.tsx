import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Component } from './Component';

test('should render component.', async () => {
  const screen = render(<Component>children</Component>);

  await expect.element(screen.getByText('children')).toBeInTheDocument();
});
