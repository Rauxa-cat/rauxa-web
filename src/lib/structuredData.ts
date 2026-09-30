import { CONTACT } from '@/components/sections/contact/contact.constants';
import { LAB } from '@/lib/content/lab';
import { BASE_URL, OG_IMAGE, localeUrl } from '@/lib/metadata';

// Stable ids let the per-page nodes point back at the organization and the
// site declared once in the layout, instead of repeating them.
const ORGANIZATION_ID = `${BASE_URL}/#organization`;
const WEBSITE_ID = `${BASE_URL}/#website`;

const IN_LANGUAGE = { es: 'es-ES', ca: 'ca-ES' } as Record<string, string>;

export function siteGraph(locale: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: 'RAUXA',
        url: BASE_URL,
        logo: `${BASE_URL}/images/logo-rauxa.webp`,
        image: `${BASE_URL}${OG_IMAGE.url}`,
        description,
        email: CONTACT.email,
        telephone: CONTACT.phoneE164,
        sameAs: [CONTACT.instagramUrl],
        areaServed: { '@type': 'City', name: 'Barcelona' },
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: BASE_URL,
        name: 'RAUXA',
        publisher: { '@id': ORGANIZATION_ID },
        inLanguage: IN_LANGUAGE[locale],
      },
    ],
  };
}

export function restaurant(locale: string, description: string) {
  const url = localeUrl(locale, { es: '/rauxa-lab', ca: '/rauxa-lab' });
  const [longitude, latitude] = LAB.coordinates;

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${BASE_URL}/rauxa-lab#restaurant`,
    name: 'RAUXA LAB',
    url,
    description,
    image: `${BASE_URL}${OG_IMAGE.url}`,
    servesCuisine: 'Tapas',
    address: {
      '@type': 'PostalAddress',
      streetAddress: LAB.address.street,
      postalCode: LAB.address.postalCode,
      addressLocality: LAB.address.locality,
      addressRegion: LAB.address.region,
      addressCountry: 'ES',
    },
    geo: { '@type': 'GeoCoordinates', latitude, longitude },
    telephone: LAB.phoneE164,
    openingHoursSpecification: LAB.openingHours.map(
      ({ days, opens, closes }) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: days.map((day) => `https://schema.org/${day}`),
        opens,
        closes,
      }),
    ),
    hasMap: LAB.googleMapsUrl,
    acceptsReservations: LAB.bookingUrl(locale),
    parentOrganization: { '@id': ORGANIZATION_ID },
  };
}

export function serviceList(
  locale: string,
  services: { name: string; description: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        provider: { '@id': ORGANIZATION_ID },
        areaServed: { '@type': 'City', name: 'Barcelona' },
        url: localeUrl(locale, { es: '/servicios', ca: '/serveis' }),
      },
    })),
  };
}
