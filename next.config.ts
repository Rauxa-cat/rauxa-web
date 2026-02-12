import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
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
