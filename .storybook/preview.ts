import 'sanitize.css';
import 'sanitize.css/typography.css';

import type { Preview } from '@storybook/react';

export default {
  tags: ['autodocs'],
  parameters: {
    options: {
      storySort: {
        order: ['Tokens', 'Components'],
      },
    },
  },
} satisfies Preview;
