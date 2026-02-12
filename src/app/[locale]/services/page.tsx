import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import { ServicesOverview } from '@/components/sections/services/ServicesOverview';
// import { ServicesDetails } from '@/components/sections/services/ServicesDetails';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata, PageProps } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.services' });

  return generatePageMetadata({
    locale,
    namespace: 'metadata.services',
    path: { es: '/servicios', ca: '/serveis' },
    overrides: {
      openGraph: {
        title: t('ogTitle'),
        description: t('ogDescription'),
        type: 'website',
        images: [
          {
            url: '/images/og/og.jpg',
            width: 1200,
            height: 630,
            alt: `${t('ogTitle')} — Open Graph image`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: t('ogTitle'),
        description: t('ogDescription'),
        images: ['/images/og/og.jpg'],
      },
    },
  });
}

export default async function ServicesPage() {
  const t = await getTranslations('services');
  return (
    <>
      <HeroSection
        backgroundImage="/images/rauxa-services-hero-bg.jpg"
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        highlightedTitle={t('hero.highlightedTitle')}
        subtitle={t('hero.subtitle')}
      />
      <ServicesOverview />
      {/* Fase 2: <ServicesDetails />  //  */}
    </>
  );
}
