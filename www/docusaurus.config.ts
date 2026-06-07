import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import tailwindcssPostcss from '@tailwindcss/postcss';
import { themes as prismThemes } from 'prism-react-renderer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buttonDist = path.resolve(__dirname, '../packages/button/dist/index.js');
const tokensCss = path.resolve(__dirname, 'src/.generated/tokens.css');
const buttonCss = path.resolve(__dirname, '../packages/button/dist/index.css');

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
          customCss: ['./src/custom.css', tokensCss, buttonCss],
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    () => ({
      name: 'playground-workspace-dist-aliases',
      configureWebpack() {
        return {
          resolve: {
            alias: {
              '@sipe-team/button': buttonDist,
            },
          },
        };
      },
    }),
    () => ({
      name: 'playground-tailwind',
      configurePostCss(postcssOptions) {
        postcssOptions.plugins.push(tailwindcssPostcss());
        return postcssOptions;
      },
    }),
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Side',
      logo: {
        alt: 'My Site Logo',
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
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Sipe Team, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
} satisfies Config;
