import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { codeTheme } from './src/code-theme';

const config: Config = {
  title: 'Shinzo Developer Portal',
  tagline: 'The Home of Shinzo Developers',
  url: 'https://docs.shinzo.network',
  baseUrl: '/',
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true,
  },

  organizationName: 'shinzonetwork',
  projectName: 'shinzo-docs',

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

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
          sidebarCollapsible: true,
          sidebarCollapsed: true,
          editUrl:
            'https://github.com/shinzonetwork/web/tree/main/apps/docs/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    colorMode: {
      respectPrefersColorScheme: false,
      defaultMode: 'light',
    },
    navbar: {
      title: null,
      hideOnScroll: false,
      logo: {
        alt: 'Shinzo Network Documentation',
        src: 'img/shinzo-logo.svg',
      },

      items: [
        {
          type: 'docSidebar',
          sidebarId: 'shinzoSidebar',
          position: 'left',
          label: 'Shinzo',
          className: 'header-docs-link-shinzo',
        },
        {
          href: 'https://github.com/shinzonetwork/',
          'aria-label': 'GitHub repository',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      logo: {
        alt: 'Shinzo Logo',
        src: 'img/shinzo-logo.svg',
        href: 'https://shinzo.network',
      },
      links: [
        {
          title: 'Developers',
          items: [
            {
              label: 'Getting Started',
              to: '/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/sourcenetwork',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://source.network/discord',
            },
            {
              label: 'Twitter',
              href: 'https://x.com/edgeofsource',
            },
          ],
        },
        {
          title: 'About',
          items: [
            {
              label: 'About Us',
              href: "https://shinzo.network/",
            },
            {
              label: 'Privacy Policy',
              href: 'https://source.network/privacy',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Source, Inc & Democratized Data Foundation.`,
    },
    prism: {
      theme: codeTheme,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
