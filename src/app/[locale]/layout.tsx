import { Metadata } from 'next';
import { BASE_URL, OG_IMAGE } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteGraph } from '@/lib/structuredData';
import { NextIntlClientProvider } from 'next-intl';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SiteHeader } from '@/components/site/Header';
import { Footer } from '@/components/site/footer/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { ServiceRequestProvider } from '@/components/service-request/ServiceRequestProvider';
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
      images: [{ ...OG_IMAGE, alt: t('title') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [OG_IMAGE.url],
    },
  };
}

export default async function Layout({
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
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return (
    <>
      <JsonLd data={siteGraph(locale, t('description'))} />
      <NextIntlClientProvider locale={locale}>
        <MotionProvider>
          <ServiceRequestProvider>
            <SiteHeader />
            <main> {children} </main>
            <Footer />
          </ServiceRequestProvider>
          <Toaster position="top-right" richColors />
        </MotionProvider>
      </NextIntlClientProvider>
    </>
  );
}
