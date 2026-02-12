import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import { TeamSection } from '@/components/sections/team/TeamSection';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Equipo — RAUXA',
  description:
    'El equipo detrás de Rauxa: personas unidas por la gastronomía, la cultura y la creación de experiencias únicas.',

  openGraph: {
    title: 'Equipo — RAUXA',
    description:
      'Conoce al equipo detrás de RAUXA, una comunidad donde gastronomía, cultura y creatividad se unen para crear experiencias únicas.',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Equipo — RAUXA',
    description:
      'El equipo detrás de RAUXA: personas unidas por la gastronomía, la cultura y la creatividad.',
  },
};

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
