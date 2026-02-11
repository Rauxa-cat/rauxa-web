import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import { ServicesOverview } from '@/components/sections/services/ServicesOverview';
// import { ServicesDetails } from '@/components/sections/services/ServicesDetails';

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

export default function ServicesPage() {
  return (
    <>
      <HeroSection
        backgroundImage="/images/rauxa-services-hero-bg.jpg"
        eyebrow="SERVICIOS · EXPERIENCIAS · EVENTOS"
        title="Cada proyecto es una oportunidad de"
        highlightedTitle=" crear algo memorable."
        subtitle="Desde cenas íntimas hasta eventos a gran escala."
      />
      <ServicesOverview />
      {/* Fase 2: <ServicesDetails />  //  */}
    </>
  );
}
