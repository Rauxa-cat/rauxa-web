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
  // The place id routes to the Google listing, not just the street number;
  // Google still requires `destination` alongside it, as a fallback.
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `Rauxa Lab, ${ADDRESS.street}, ${ADDRESS.postalCode} ${ADDRESS.locality}`,
  )}&destination_place_id=ChIJhd8wPQCXpBIRC6hbzdjyf40`,
  phoneE164: '+34647250728',
  googleMapsUrl: 'https://maps.app.goo.gl/2h1L8gqj5xnxW64d6',
  // Must match the Google Maps listing; change both together.
  openingHours: [
    {
      days: ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '12:00',
      closes: '23:00',
    },
    { days: ['Sunday'], opens: '12:00', closes: '18:00' },
  ],
  anchors: { booking: 'reservar', location: 'ubicacion' },
  bookingUrl: (locale: string) =>
    `https://www.covermanager.com/reserve/module_restaurant/restaurante-rauxa-lab/${
      BOOKING_LANGUAGE[
        hasLocale(routing.locales, locale) ? locale : routing.defaultLocale
      ]
    }`,
};
