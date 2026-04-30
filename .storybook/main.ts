import type { StorybookConfig } from '@storybook/react-vite';

export default {
  stories: ['../docs/*.mdx', '../packages/**/*.mdx', '../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            providerImportSource: '@storybook/addon-docs/mdx-react-shim',
          },
        },
      },
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../public'],
  managerHead: (head) =>
    `${head}
<link rel="shortcut icon" href="./favicon.ico" type="image/ico">`,
} satisfies StorybookConfig;
