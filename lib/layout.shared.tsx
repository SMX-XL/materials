import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'SMX',
    },
    links: [
      {
        text: 'Documentació',
        url: '/docs',
      },
      {
        text: 'GitHub',
        url: 'https://github.com/hauchdev/smx-docs',
        external: true,
      },
    ],
  };
}
