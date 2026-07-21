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

// The tokens declare `Pretendard` as the base family but ship no font, so every
// page was falling back to the system sans. The dynamic subset splits by
// `unicode-range`, so a page only pulls the glyph blocks it actually renders.
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
  // `favicon` above only emits the .ico. The rest of the set mirrors what
  // sipe.team serves, so the two sites resolve to the same icon everywhere.
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
    // The tokens only define a dark set — `themes.css.ts` gives `:root` and
    // `[data-theme=dark]` the same values — so a light toggle would put dark-only
    // components on a white page. Pinning dark matches what the tokens can
    // actually express, and matches sipe.team, which is dark-only.
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
    },
    navbar: {
      // The Sipe wordmark, carried over from sipe.team. Its gradient runs
      // #FF4500 → #FFB24D, which lands on the same amber as the accent token.
      // It stands alone — no title beside it.
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
    // No `style: 'dark'` — that class hardcodes a blue-grey background (#303846)
    // on the footer element itself, where the token overrides can't reach it.
    footer: {
      links: [
        {
          title: 'Side',
          items: [
            { label: 'Overview', to: '/docs/overview/Installation' },
            { label: 'Components', to: '/docs/components/accordion' },
          ],
        },
        {
          title: 'Sipe',
          items: [
            { label: 'GitHub', href: 'https://github.com/sipe-team/side' },
            { label: 'sipe.team', href: 'https://sipe.team' },
          ],
        },
      ],
      copyright: `All rights reserved ⓒ SIPE ${new Date().getFullYear()}`,
    },
    // Dracula's purple/pink keywords read as a second accent next to the amber,
    // and its background carries a purple tint the neutral surfaces don't. vsDark
    // is grey-based, so the code blocks sit in the page instead of on it. Both
    // slots point at it because a stored-light session would otherwise surface
    // the light theme.
    prism: {
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
} satisfies Config;
