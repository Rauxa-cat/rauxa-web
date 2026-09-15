import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';

const BOOKING_LANGUAGE = {
  es: 'spanish',
  ca: 'catalan',
} satisfies Record<(typeof routing.locales)[number], string>;

// Spanish in both locales: CoverManager publishes no Catalan version.
export const COVERMANAGER = {
  privacyUrl: 'https://www.covermanager.com/es/politica-de-privacidad',
  cookiesUrl: 'https://www.covermanager.com/es/politica-de-cookies',
};

const ADDRESS = {
  street: 'Avinguda de Cerdanyola, 52',
  postalCode: '08172',
  locality: 'Sant Cugat del Vallès',
  region: 'Barcelona',
};

export const LAB = {
  address: ADDRESS,
  // Portal 52 as CartoCiudad and the ICGC geocode it; OpenStreetMap only knows
  // the street, and its centroid lands a block away.
  coordinates: [2.09115, 41.47382] as [number, number],
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${ADDRESS.street}, ${ADDRESS.postalCode} ${ADDRESS.locality}`,
  )}`,
  anchors: { booking: 'reservar', location: 'ubicacion' },
  bookingUrl: (locale: string) =>
    `https://www.covermanager.com/reserve/module_restaurant/restaurante-rauxa-lab/${
      BOOKING_LANGUAGE[
        hasLocale(routing.locales, locale) ? locale : routing.defaultLocale
      ]
    }`,
};
