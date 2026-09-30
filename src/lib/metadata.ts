import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export const BASE_URL = 'https://www.rauxa.cat';

export const OG_IMAGE = {
  url: '/images/og/og.jpg',
  width: 1200,
  height: 630,
};

const OG_LOCALE = {
  es: 'es_ES',
  ca: 'ca_ES',
} satisfies Record<(typeof routing.locales)[number], string>;

export type PageProps = {
  params: Promise<{ locale: string }>;
};

type PageMetadataOptions = {
  locale: string;
  namespace: string;
  path?: {
    es: string;
    ca: string;
  };
  // For titles that already carry the brand, which the layout's
  // `%s — RAUXA` template would otherwise repeat.
  absoluteTitle?: boolean;
};

export function localeUrl(locale: string, path: { es: string; ca: string }) {
  return `${BASE_URL}/${locale}${locale === 'ca' ? path.ca : path.es}`;
}

export async function generatePageMetadata({
  locale,
  namespace,
  path = { es: '', ca: '' },
  absoluteTitle = false,
}: PageMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const tSite = await getTranslations({ locale, namespace: 'metadata' });

  const title = t('title');
  const description = t('description');
  const ogTitle = t.has('ogTitle')
    ? t('ogTitle')
    : absoluteTitle
      ? title
      : `${title} — ${tSite('siteName')}`;
  const ogDescription = t.has('ogDescription')
    ? t('ogDescription')
    : description;
  const url = localeUrl(locale, path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        es: localeUrl('es', path),
        ca: localeUrl('ca', path),
        'x-default': localeUrl('es', path),
      },
    },
    openGraph: {
      type: 'website',
      siteName: tSite('siteName'),
      url,
      title: ogTitle,
      description: ogDescription,
      locale: OG_LOCALE[locale as keyof typeof OG_LOCALE],
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l]),
      images: [{ ...OG_IMAGE, alt: ogTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [OG_IMAGE.url],
    },
  };
}
