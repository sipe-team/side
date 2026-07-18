import 'sanitize.css';
import 'sanitize.css/typography.css';

// Defines the `--side-*` custom properties that components reference. Without this the
// vanilla-extract bridge resolves to undefined vars and spacing/radius/typography collapse.
import '@sipe-team/tokens/styles.css';

import type { Preview } from '@storybook/react';

export default {
  tags: ['autodocs'],
  parameters: {
    options: {
      storySort: {
        order: ['INTRO', 'Components'],
      },
    },
  },
} satisfies Preview;
