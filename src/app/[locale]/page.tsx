import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import { WhatIsRauxa } from '@/components/sections/WhatIsRauxa';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'RAUXA — Experiencias gastronómicas y culturales en Barcelona',
  description:
    'Rauxa crea experiencias únicas donde gastronomía, música y arte se encuentran. Comunidad cultural en Barcelona.',
};

export default async function HomePage() {
  const t = await getTranslations('home');
  return (
    <>
      <HeroSection
        backgroundImage="/images/rauxa-hero-bg.jpg"
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        highlightedTitle={t('hero.highlightedTitle')}
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
      <WhatIsRauxa />
    </>
  );
}
