import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import { BeginningSection } from '@/components/sections/about/BeginningSection';
import { HouseSection } from '@/components/sections/about/HouseSection';
import { JoinSection } from '@/components/sections/about/JoinSection';
import { KitchenSection } from '@/components/sections/about/KitchenSection';
import { ProjectsSection } from '@/components/sections/about/ProjectsSection';
import { StartSection } from '@/components/sections/about/StartSection';
import { StoryClosing } from '@/components/sections/about/StoryClosing';
import { WhySection } from '@/components/sections/about/WhySection';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata, type PageProps } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale,
    namespace: 'metadata.about',
    path: { es: '/quienes-somos', ca: '/qui-som' },
  });
}

export default async function AboutPage() {
  const t = await getTranslations('about');
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

      <BeginningSection />
      <KitchenSection />
      <StartSection />
      <ProjectsSection />
      <HouseSection />
      <WhySection />
      <StoryClosing />
      <JoinSection />
    </>
  );
}
