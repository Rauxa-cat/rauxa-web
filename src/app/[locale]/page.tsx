import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import { WhatIsRauxa } from '@/components/sections/home/WhatIsRauxa';
import { GallerySection } from '@/components/sections/home/GallerySection';
import { ServicesTicker } from '@/components/site/ServicesTicker';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata, type PageProps } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({ locale, namespace: 'metadata.home' });
}

export default async function HomePage() {
  const t = await getTranslations('home');
  return (
    <>
      <HeroSection
        backgroundImage="/images/rauxa-hero-bg-v2.webp"
        eyebrow={t('hero.eyebrow')}
        bands={[
          { variant: 'lead', text: t('hero.bandLead') },
          { variant: 'bridge', text: t('hero.bandBridge') },
          { variant: 'punch', text: t('hero.bandPunch') },
        ]}
        subtitle={t('hero.subtitle')}
        ctas={[
          {
            label: t('hero.ctaPrimary'),
            href: 'https://form.typeform.com/to/nMlilHvx',
            withArrow: true,
            external: true,
          },
          {
            label: t('hero.ctaSecondary'),
            href: '/services',
            variant: 'outline',
          },
        ]}
      />
      <ServicesTicker />
      <WhatIsRauxa />
      <GallerySection />
    </>
  );
}
