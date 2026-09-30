import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import { ServicesOverview } from '@/components/sections/services/ServicesOverview';
import { CtaBand } from '@/components/sections/shared/CtaBand';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata, PageProps } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceList } from '@/lib/structuredData';
import { SERVICE_IDS } from '@/lib/content/services';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale,
    namespace: 'metadata.services',
    path: { es: '/servicios', ca: '/serveis' },
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('services');
  return (
    <>
      <JsonLd
        data={serviceList(
          locale,
          SERVICE_IDS.map((id) => ({
            name: t(`items.${id}.title`),
            description: t(`items.${id}.desc`),
          })),
        )}
      />
      <HeroSection
        backgroundImage="/images/rauxa-services-hero-bg-v2.webp"
        eyebrow={t('hero.eyebrow')}
        bands={[
          { variant: 'lead', text: t('hero.bandLead') },
          { variant: 'bridge', text: t('hero.bandBridge') },
          { variant: 'punch', text: t('hero.bandPunch') },
        ]}
        subtitle={t('hero.subtitle')}
      />
      <ServicesOverview />
      <CtaBand />
    </>
  );
}
