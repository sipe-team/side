import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

import type { StorybookConfig } from '@storybook/react-vite';

export default {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.plugins = [...(config.plugins || []), vanillaExtractPlugin()];
    return config;
  },
} satisfies StorybookConfig;
