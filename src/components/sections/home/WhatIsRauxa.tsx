import { getTranslations } from 'next-intl/server';
import { SERVICES } from '@/lib/content/services';
import { SectionHeader } from '../shared/SectionHeader';
import { SectionShell } from '../shared/SectionShell';
import { ActiveBar } from '../shared/ActiveBar';
import { RowIndex } from '../shared/RowIndex';
import { RevealList, RevealItem } from '@/components/motion/Reveal';
import { ArrowIcon } from '@/components/icons/ArrowIcon';

export async function WhatIsRauxa() {
  const t = await getTranslations('home.whatIsRauxa');
  const tItems = await getTranslations('services.items');

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
        {SERVICES.map((service, i) => (
          <RevealItem key={service.id}>
            <a
              href={service.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block border-b border-foreground/15"
            >
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [background:linear-gradient(90deg,rgba(0,76,255,0.16)_0%,rgba(0,76,255,0.02)_62%,transparent_100%)]"
                aria-hidden
              />
              <div className="relative mx-auto flex max-w-page items-center gap-4 px-6 py-6 transition-[min-height] duration-300 md:min-h-30 md:gap-8 md:py-0 md:group-hover:min-h-40">
                <ActiveBar />
                <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row md:items-center md:gap-8">
                  <div className="flex items-baseline gap-4 md:contents">
                    <RowIndex className="text-lg md:w-14 md:text-[22px]">
                      {String(i + 1).padStart(2, '0')}
                    </RowIndex>
                    <h3 className="min-w-0 flex-1 font-normal leading-none text-foreground text-[clamp(1.75rem,4.5vw,3.25rem)] transition-colors duration-300 group-hover:text-primary group-hover:[text-shadow:0_0_60px_rgba(0,76,255,0.5)]">
                      {tItems(`${service.id}.title`)}
                    </h3>
                  </div>
                  <p className="text-sm leading-[1.72] text-foreground/60 transition-colors duration-300 group-hover:text-foreground/80 md:w-90 md:shrink-0">
                    {tItems(`${service.id}.desc`)}
                  </p>
                </div>
                <ArrowIcon
                  animate
                  className="shrink-0 text-right text-2xl text-foreground/45 transition-all duration-300 group-hover:text-blue-ink md:w-12"
                />
              </div>
            </a>
          </RevealItem>
        ))}
      </RevealList>
    </SectionShell>
  );
}
