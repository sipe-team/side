---
to: <%= path %>/src/<%= componentName %>.test.tsx
---
import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
import { <%= componentName %> } from './<%= componentName %>';

describe('<%= componentName %>', () => {
  test('테스트 코드를 작성하세요', () => {
    render(<<%= componentName %> />);
  });
});