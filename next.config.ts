import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // An old link shared without a prefix reaches the proxy first, which prefixes it
  // with the visitor's locale, so /equipo can arrive under /ca and /equip under /es.
  async redirects() {
    return [
      {
        source: '/es/:slug(equipo|equip)',
        destination: '/es/quienes-somos',
        permanent: true,
      },
      {
        source: '/ca/:slug(equipo|equip)',
        destination: '/ca/qui-som',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
