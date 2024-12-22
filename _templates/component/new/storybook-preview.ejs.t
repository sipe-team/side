---
to: <%= path %>/.storybook/preview.ts
---
import type { Preview } from '@storybook/react';

export default {
  tags: ['autodocs'],
} satisfies Preview;
