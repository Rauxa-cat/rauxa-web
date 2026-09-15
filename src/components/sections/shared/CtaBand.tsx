import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { CONTACT } from '@/components/sections/contact/contact.constants';
import { CtaBackdrop } from './CtaBackdrop';
import { MaskReveal } from '@/components/motion/MaskReveal';
import { ArrowIcon } from '@/components/icons/ArrowIcon';

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

          {/* The address stays as the label, but it leads to the contact page:
              a mailto is a dead click for anyone without a mail client set up. */}
          <Link
            href="/contact"
            className="group font-accent inline-flex w-fit items-center gap-3 text-[clamp(1.1rem,1.6vw,1.4rem)] tracking-[0.2em] text-white uppercase"
          >
            {CONTACT.email}
            <ArrowIcon animate />
          </Link>
        </div>
      </div>
    </section>
  );
}
