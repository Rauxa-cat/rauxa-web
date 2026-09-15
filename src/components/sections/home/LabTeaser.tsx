import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { MaskReveal } from '@/components/motion/MaskReveal';
import { ArrowIcon } from '@/components/icons/ArrowIcon';

// The same lab grid and electric bloom as the RAUXA LAB hero, so the band reads
// as the way into that page.
const LAB_BACKDROP =
  '[background-image:radial-gradient(ellipse_60%_75%_at_12%_45%,--alpha(var(--color-primary)/28%),transparent_70%),linear-gradient(to_right,rgb(247_244_239/0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(247_244_239/0.045)_1px,transparent_1px)] [background-size:100%_100%,56px_56px,56px_56px]';

export async function LabTeaser() {
  const t = await getTranslations('home.lab');

  return (
    <section
      className={`relative mt-24 overflow-hidden bg-[var(--rauxa-black)] md:mt-32 dark:border-y dark:border-white/10 ${LAB_BACKDROP}`}
    >
      <div className="relative mx-auto max-w-page px-6 py-20 md:py-28">
        <p className="flex items-center gap-3.5">
          <span className="h-px w-7.5 bg-primary" aria-hidden />
          <span className="font-accent text-[clamp(0.85rem,1.3vw,1.3rem)] tracking-[0.35em] text-white/60">
            {t('eyebrow')}
          </span>
        </p>
        <h2 className="font-brand mt-4 text-[clamp(3rem,15vw,12rem)] leading-[0.86] font-normal">
          <MaskReveal>
            <span className="text-primary [text-shadow:0_0_80px_--alpha(var(--color-primary)/55%)]">
              {t('title')}
            </span>
          </MaskReveal>
        </h2>

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[29rem] leading-relaxed text-white/80">
            {t('subtitle')}
          </p>
          <Link
            href="/rauxa-lab"
            className="group font-accent inline-flex w-fit items-center gap-3 text-[clamp(1.1rem,1.6vw,1.4rem)] tracking-[0.2em] text-white uppercase"
          >
            {t('cta')}
            <ArrowIcon animate />
          </Link>
        </div>
      </div>
    </section>
  );
}
