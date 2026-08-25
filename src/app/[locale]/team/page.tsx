import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import { TeamSection } from '@/components/sections/team/TeamSection';
import { CtaBand } from '@/components/sections/shared/CtaBand';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata, type PageProps } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.team' });

  return generatePageMetadata({
    locale,
    namespace: 'metadata.team',
    path: { es: '/equipo', ca: '/equip' },
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

export default async function TeamPage() {
  const t = await getTranslations('team');
  return (
    <>
      <HeroSection
        backgroundImage="/images/team/rauxa-team-hero.webp"
        eyebrow={t('hero.eyebrow')}
        bands={[
          { variant: 'lead', text: t('hero.bandLead') },
          { variant: 'bridge', text: t('hero.bandBridge') },
          { variant: 'punch', text: t('hero.bandPunch') },
        ]}
        subtitle={t('hero.subtitle')}
      />

      <TeamSection />
      <CtaBand />
    </>
  );
}
