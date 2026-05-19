import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/metadata';
import { routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];
type PathKey = keyof typeof routing.pathnames;

const pageConfig: Record<
  PathKey,
  {
    lastModified: string;
    changeFrequency: 'weekly' | 'monthly' | 'yearly';
    priority: number;
  }
> = {
  '/': { lastModified: '2026-05-19', changeFrequency: 'weekly', priority: 1 },
  '/services': {
    lastModified: '2026-03-03',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  '/team': {
    lastModified: '2026-03-03',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  '/contact': {
    lastModified: '2026-03-03',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  '/privacy': {
    lastModified: '2026-03-03',
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  '/cookies': {
    lastModified: '2026-03-03',
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  '/legal-notice': {
    lastModified: '2026-03-03',
    changeFrequency: 'yearly',
    priority: 0.3,
  },
};

function getLocalizedPath(key: PathKey, locale: Locale): string {
  const pathname = routing.pathnames[key];
  if (typeof pathname === 'string') return pathname;
  return pathname[locale];
}

function buildUrl(locale: Locale, page: PathKey): string {
  const path = getLocalizedPath(page, locale);
  return `${BASE_URL}/${locale}${path === '/' ? '' : path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(pageConfig) as PathKey[]).flatMap((page) =>
    routing.locales.map((locale) => ({
      url: buildUrl(locale, page),
      lastModified: new Date(pageConfig[page].lastModified),
      changeFrequency: pageConfig[page].changeFrequency,
      priority: pageConfig[page].priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((l) => [l, buildUrl(l, page)]),
          ),
          'x-default': buildUrl('es', page),
        },
      },
    })),
  );
}
