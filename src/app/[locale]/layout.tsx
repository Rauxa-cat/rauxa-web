import { Metadata } from 'next';
import { BASE_URL } from '@/lib/metadata';
import { NextIntlClientProvider } from 'next-intl';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SiteHeader } from '@/components/site/Header';
import { Footer } from '@/components/site/footer/Footer';
import { Toaster } from 'sonner';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t('title'),
      template: `%s — ${t('siteName')}`,
    },
    description: t('description'),
    openGraph: {
      type: 'website',
      siteName: t('siteName'),
      title: t('title'),
      description: t('description'),
      locale: locale,
      alternateLocale: routing.locales.filter((l) => l !== locale),
      images: [
        {
          url: '/images/og/og.jpg',
          width: 1200,
          height: 630,
          alt: `${t('siteName')} — Open Graph image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/images/og/og.jpg'],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        es: `${BASE_URL}/es`,
        ca: `${BASE_URL}/ca`,
        'x-default': `${BASE_URL}/es`,
      },
    },
  };
}

export default async function localeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <>
      <NextIntlClientProvider locale={locale}>
        <SiteHeader />
        <main> {children} </main>
        <Footer />
        <Toaster position="top-right" richColors />
      </NextIntlClientProvider>
    </>
  );
}
