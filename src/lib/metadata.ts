import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const BASE_URL = 'https://www.rauxa.cat';

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
  overrides?: Partial<Metadata>;
};

export async function generatePageMetadata({
  locale,
  namespace,
  path,
  overrides,
}: PageMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });

  const esPath = path?.es ?? '';
  const caPath = path?.ca ?? '';

  const base: Metadata = {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${BASE_URL}/${locale}${locale === 'es' ? esPath : caPath}`,
      languages: {
        es: `${BASE_URL}/es${esPath}`,
        ca: `${BASE_URL}/ca${caPath}`,
        'x-default': `${BASE_URL}/es${esPath}`,
      },
    },
  };

  return { ...base, ...overrides };
}
