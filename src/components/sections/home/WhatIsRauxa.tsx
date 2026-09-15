import { getTranslations } from 'next-intl/server';
import { SERVICE_IDS } from '@/lib/content/services';
import { SectionHeader } from '../shared/SectionHeader';
import { SectionShell } from '../shared/SectionShell';
import { ServiceRow } from '../shared/ServiceRow';
import { RevealList, FadeIn } from '@/components/motion/Reveal';
import { ArrowIcon } from '@/components/icons/ArrowIcon';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export async function WhatIsRauxa() {
  const t = await getTranslations('home.whatIsRauxa');

  return (
    <SectionShell>
      <SectionHeader
        className="mx-auto max-w-page px-6"
        hairline
        size="lg"
        eyebrow={t('eyebrow')}
        title={
          <>
            {t('title')}{' '}
            <span className="text-primary">{t('titleHighlight')}</span>
          </>
        }
        description={
          <>
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
          </>
        }
      />

      <RevealList className="mt-16 border-t border-foreground/15 md:mt-20">
        {SERVICE_IDS.map((service, i) => (
          <ServiceRow key={service} service={service} position={i} />
        ))}
      </RevealList>

      {/* The only route from the home page into /services: every row above
          opens the request dialog instead. */}
      <FadeIn className="mx-auto mt-14 max-w-page px-6">
        <Button
          asChild
          size="lg"
          variant="outline"
          className="group h-13 rounded-none px-7 tracking-wider"
        >
          <Link href="/services">
            {t('cta')}
            <ArrowIcon animate className="ml-1" />
          </Link>
        </Button>
      </FadeIn>
    </SectionShell>
  );
}
