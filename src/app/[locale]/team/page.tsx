import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import { TeamSection } from '@/components/sections/team/TeamSection';
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
      },
      twitter: {
        card: 'summary',
        title: t('ogTitle'),
        description: t('ogDescription'),
      },
    },
  });
}

export default async function TeamPage() {
  const t = await getTranslations('team');
  return (
    <>
      <HeroSection
        // backgroundImage="/images/rauxa-team-hero.jpg"
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        highlightedTitle={t('hero.highlightedTitle')}
        subtitle={t('hero.subtitle')}
        ctas={[]}
      />

      <TeamSection />
    </>
  );
}
