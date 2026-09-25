import { getTranslations } from 'next-intl/server';
import { MaskReveal } from '@/components/motion/MaskReveal';
import { FadeIn } from '@/components/motion/Reveal';
import { Sequence } from '@/components/motion/Sequence';
import { SectionShell } from '../shared/SectionShell';
import { DualityWords } from './DualityWords';
import { highlight, StoryHeading } from './StoryChapter';

export async function WhySection() {
  const t = await getTranslations('about.why');

  return (
    <SectionShell>
      <div className="mx-auto max-w-page px-6">
        <Sequence className="flex flex-col items-start gap-4">
          <StoryHeading
            eyebrow={t('eyebrow')}
            title={t('title')}
            intro={t('p1')}
            introClassName="mt-3 max-w-3xl"
          />
        </Sequence>

        <DualityWords />

        <FadeIn className="mx-auto mt-14 flex max-w-220 flex-col gap-4 text-center text-[clamp(1.125rem,1.5vw,1.25rem)] leading-[1.7] text-foreground/80 md:mt-16">
          <p>
            {t.rich('p2', {
              seny: (chunks) => (
                <span className="text-foreground">{chunks}</span>
              ),
            })}
          </p>
          <p>{t('p3')}</p>
        </FadeIn>

        <FadeIn className="mt-14 grid gap-8 border-t border-foreground/15 pt-11 text-base leading-[1.8] text-foreground/70 md:mt-16 md:grid-cols-2 md:gap-12">
          <p>{t('p4')}</p>
          <p>{t('p5')}</p>
        </FadeIn>

        <p className="font-brand mt-14 max-w-225 text-[clamp(1.75rem,3.2vw,2.5rem)]/[1.15] text-foreground md:mt-16">
          <MaskReveal>{t.rich('p6', highlight)}</MaskReveal>
        </p>
      </div>
    </SectionShell>
  );
}
