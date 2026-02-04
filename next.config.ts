import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/servicios',
        destination: '/services',
      },
      {
        source: '/equipo',
        destination: '/team',
      },
      {
        source: '/contacto',
        destination: '/contact',
      },
    ];
  },
};

export default nextConfig;
