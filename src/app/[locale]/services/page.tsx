import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import { ServicesOverview } from '@/components/sections/services/ServicesOverview';
// import { ServicesDetails } from '@/components/sections/services/ServicesDetails';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Servicios — RAUXA',
  description:
    'RAUXA crea cenas privadas, experiencias gastronómicas, catering, eventos culturales, servicios de DJ y colaboraciones con marcas. Propuestas únicas donde gastronomía, música y arte se encuentran.',

  openGraph: {
    title: 'Servicios — RAUXA',
    description:
      'Cenas privadas, experiencias gastronómicas, catering, eventos culturales, DJs y colaboraciones con marcas',
    type: 'website',
  },

  twitter: {
    card: 'summary',
    title: 'Servicios — RAUXA',
    description:
      'Cenas privadas, experiencias gastronómicas, catering, eventos culturales, DJs y colaboraciones con marcas.',
  },
};

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
