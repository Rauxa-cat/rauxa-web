import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import { WhatIsRauxa } from '@/components/sections/WhatIsRauxa';

export const metadata: Metadata = {
  title: 'RAUXA — Experiencias gastronómicas y culturales en Barcelona',
  description:
    'Rauxa crea experiencias únicas donde gastronomía, música y arte se encuentran. Comunidad cultural en Barcelona.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection
        backgroundImage="/images/rauxa-hero-bg.jpg"
        eyebrow="COMUNIDAD GASTRONÓMICA Y CULTURAL"
        title="Experiencias que se viven, "
        highlightedTitle=" no se explican"
        subtitle="Gastronomía, música y arte convergen en momentos diseñados para emocionar."
        ctas={[
          {
            label: 'Únete a la lista de espera',
            href: 'https://form.typeform.com/to/nMlilHvx',
            withArrow: true,
            external: true,
          },
          { label: 'SERVICIOS', href: '/servicios', variant: 'outline' },
        ]}
      />
      <WhatIsRauxa />
    </>
  );
}
