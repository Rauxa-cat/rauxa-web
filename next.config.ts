import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
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
  async redirects() {
    return [
      {
        source: '/',
        destination: '/es',
        permanent: true,
      },
      {
        source: '/servicios',
        destination: '/es/servicios',
        permanent: true,
      },
      {
        source: '/contacto',
        destination: '/es/contacto',
        permanent: true,
      },
      {
        source: '/equipo',
        destination: '/es/equipo',
        permanent: true,
      },
    ];
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
