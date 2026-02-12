export const routing = {
  locales: ['es', 'ca'],
  defaultLocale: 'es',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/services': { es: '/servicios', ca: '/serveis' },
    '/team': { es: '/equipo', ca: '/equip' },
    '/contact': { es: '/contacto', ca: '/contacte' },
  },
} as const;
