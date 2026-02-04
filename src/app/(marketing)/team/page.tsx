import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import { TeamSection } from '@/components/sections/team/TeamSection';

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

export default function TeamPage() {
  return (
    <>
      <HeroSection
        // backgroundImage="/images/rauxa-team-hero.jpg"
        eyebrow="EQUIPO"
        title="Las personas detrás de"
        highlightedTitle="la experiencia."
        subtitle="Gastronomía, música y arte se cruzan gracias a personas con mirada creativa y sensibilidad por el detalle."
        ctas={[]}
      />

      <TeamSection />
    </>
  );
}
