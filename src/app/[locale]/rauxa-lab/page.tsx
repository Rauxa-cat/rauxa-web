import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import { LabIntro } from '@/components/sections/lab/LabIntro';
import { LabLocation } from '@/components/sections/lab/LabLocation';
import { CtaBand } from '@/components/sections/shared/CtaBand';
import { generatePageMetadata, type PageProps } from '@/lib/metadata';

// Stands in for the photo until the space has one; once there is a
// `backgroundImage`, drop it.
const PHOTO_STAND_IN =
  '[background-image:radial-gradient(ellipse_65%_55%_at_18%_58%,--alpha(var(--color-primary)/30%),transparent_70%),radial-gradient(ellipse_40%_35%_at_92%_8%,--alpha(var(--color-primary)/14%),transparent_70%),linear-gradient(to_right,rgb(247_244_239/0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(247_244_239/0.045)_1px,transparent_1px)] [background-size:100%_100%,100%_100%,56px_56px,56px_56px]';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.lab' });

  return generatePageMetadata({
    locale,
    namespace: 'metadata.lab',
    path: { es: '/rauxa-lab', ca: '/rauxa-lab' },
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
            alt: t('ogTitle'),
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

export default async function RauxaLabPage() {
  const t = await getTranslations('lab.hero');

  return (
    <>
      <HeroSection
        className={PHOTO_STAND_IN}
        eyebrow={t('eyebrow')}
        bands={[
          { variant: 'lead', text: t('bandLead') },
          { variant: 'bridge', text: t('bandBridge') },
          { variant: 'punch', text: t('bandPunch'), size: 'lg' },
        ]}
        subtitle={t('subtitle')}
      />
      <LabIntro />
      <LabLocation />
      <CtaBand />
    </>
  );
}
