import type { StorybookConfig } from '@storybook/react-vite';

export default {
  stories: ['../docs/*.mdx', '../packages/**/*.mdx', '../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-links'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  managerHead: (head) =>
    `${head}
<link rel="shortcut icon" href="./favicon.ico" type="image/ico">`,
} satisfies StorybookConfig;
