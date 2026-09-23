import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'ca'],
  defaultLocale: 'es',
  localePrefix: 'always',
  localeCookie: {
    name: 'NEXT_LOCALE',
    maxAge: 60 * 60 * 24 * 365,
  },
  pathnames: {
    '/': '/',
    '/services': { es: '/servicios', ca: '/serveis' },
    '/rauxa-lab': { es: '/rauxa-lab', ca: '/rauxa-lab' },
    '/about': { es: '/quienes-somos', ca: '/qui-som' },
    '/contact': { es: '/contacto', ca: '/contacte' },
    '/privacy': { es: '/privacidad', ca: '/privacitat' },
    '/cookies': { es: '/cookies', ca: '/cookies' },
    '/legal-notice': { es: '/aviso-legal', ca: '/avis-legal' },
  },
});
