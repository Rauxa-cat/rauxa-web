import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { CONTACT } from '@/components/sections/contact/contact.constants';
import { SERVICES } from '@/lib/content/services';
import { CtaBackdrop } from './CtaBackdrop';
import { MaskReveal } from '@/components/motion/MaskReveal';

const waitlistUrl =
  SERVICES.find((s) => s.id === 'cenas-rauxa')?.formUrl ?? '#';

export async function CtaBand() {
  const t = await getTranslations('cta');

  return (
    <section className="relative overflow-hidden bg-rauxa-blue-900">
      <CtaBackdrop />

      <div className="relative mx-auto max-w-page px-6 py-16 md:py-20">
        <p className="font-accent text-[clamp(0.85rem,1.3vw,1.3rem)] tracking-[0.35em] text-white">
          {t('eyebrow')}
        </p>
        {/* Black only at display size (3.27:1 on electric); everything else stays pearl. */}
        <h2 className="font-brand mt-3 text-[clamp(3rem,15vw,12rem)] leading-[0.86] font-normal text-[var(--rauxa-black)]">
          <MaskReveal>{t('title')}</MaskReveal>
        </h2>

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[29rem] leading-relaxed text-white">
            {t('subtitle')}
          </p>

          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-accent text-[clamp(1.1rem,1.6vw,1.4rem)] tracking-[0.2em] text-white uppercase"
            >
              {CONTACT.email}
            </a>
            <Button
              asChild
              size="lg"
              className="h-14 rounded-none bg-[var(--rauxa-black)] px-8 font-semibold tracking-wide text-white hover:bg-[var(--rauxa-black)]"
            >
              <a href={waitlistUrl} target="_blank" rel="noopener noreferrer">
                {t('button')}
                <span aria-hidden className="ml-3 text-lg leading-none">
                  →
                </span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
