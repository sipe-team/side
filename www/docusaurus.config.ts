import path from 'node:path';

import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';

import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const r = (p: string) => path.resolve(__dirname, '..', 'packages', p);

// The token value layer (`--color-*`, `--spacing-*`, …) is Style Dictionary output, not
// vanilla-extract, so it can't come from source compilation — `build:tokens` emits it and
// components that read `vars` resolve against it. Built once for the whole site, not per component.
const tokensCss = r('tokens/dist/styles.css');

const pretendardCss = require.resolve('pretendard/dist/web/static/pretendard-dynamic-subset.css');

export default {
  title: 'Side',
  tagline: 'Sipe Design System',
  favicon: 'img/favicon.ico',
  url: 'https://sipe.team',
  baseUrl: '/',
  organizationName: 'sipe-team',
  projectName: 'side',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  headTags: [
    { tagName: 'link', attributes: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/favicon-32x32.png' } },
    { tagName: 'link', attributes: { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/img/favicon-16x16.png' } },
    { tagName: 'link', attributes: { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/apple-icon.png' } },
    { tagName: 'link', attributes: { rel: 'mask-icon', href: '/img/safari-pinned-tab.svg', color: '#ffb24d' } },
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/sipe-team/side/tree/main/www/',
        },
        blog: false,
        theme: {
          customCss: [tokensCss, pretendardCss, './src/custom.css'],
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // Compile the workspace's vanilla-extract `.css.ts` on the fly, so docs pages import
    // @sipe-team/* straight from source — no prebuilt dist or per-component alias table.
    () => ({
      name: 'side-vanilla-extract',
      configureWebpack: () => ({
        plugins: [new VanillaExtractPlugin()],
        resolve: {
          alias: {
            // Alias ONLY the tokens package to its built dist. `themes.css.ts` emits the
            // `@layer theme` bridge as a side effect; compiling it from source here would emit a
            // SECOND copy on top of the one injected via customCss (tokens/dist/styles.css), and
            // Docusaurus's advanced cssnano collapses the duplicated `@layer theme` to a bare
            // declaration — stripping every `--side-*` and breaking token-driven styles in prod.
            // The pre-built dist exposes `vars`/`color` as plain values with no CSS side effect,
            // so exactly one bridge survives and full CSS minification stays on.
            '@sipe-team/tokens$': r('tokens/dist/index.js'),
          },
        },
      }),
    }),
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
    },
    navbar: {
      logo: {
        alt: 'Sipe',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          label: 'Overview',
          sidebarId: 'overview',
          position: 'left',
        },
        {
          type: 'docSidebar',
          label: 'Components',
          sidebarId: 'components',
          position: 'left',
        },
        {
          href: 'https://github.com/sipe-team/side',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        { label: 'GitHub', href: 'https://github.com/sipe-team/side' },
        { label: 'sipe.team', href: 'https://sipe.team' },
      ],
      copyright: `All rights reserved ⓒ SIPE ${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
} satisfies Config;
