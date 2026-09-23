import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { LAB } from '@/lib/content/lab';
import { MaskReveal } from '@/components/motion/MaskReveal';
import { ArrowIcon } from '@/components/icons/ArrowIcon';

// The same lab grid and electric bloom as the RAUXA LAB hero, so the band reads
// as the way into that page.
const LAB_BACKDROP =
  '[background-image:radial-gradient(ellipse_60%_75%_at_12%_45%,--alpha(var(--color-primary)/28%),transparent_70%),linear-gradient(to_right,rgb(247_244_239/0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(247_244_239/0.045)_1px,transparent_1px)] [background-size:100%_100%,56px_56px,56px_56px]';

// The padding stretches the hit area to 44px and the negative margin gives the
// height back, so the layout stays the one the bare text sets.
const LINK_CLASS =
  'group font-accent -my-2.5 inline-flex w-fit items-center gap-3 py-2.5 text-[clamp(1.1rem,1.6vw,1.4rem)] tracking-[0.2em] text-white uppercase';

type LabTeaserProps = {
  // The home leaves the booking link out: its hero already leads with one.
  bookingLabel?: string;
  // For a page whose copy has just introduced the restaurant.
  hideEyebrow?: boolean;
};

export async function LabTeaser({ bookingLabel, hideEyebrow }: LabTeaserProps) {
  const t = await getTranslations('home.lab');

  return (
    <section
      className={`relative mt-24 overflow-hidden bg-[var(--rauxa-black)] md:mt-32 dark:border-y dark:border-white/10 ${LAB_BACKDROP}`}
    >
      <div className="relative mx-auto max-w-page px-6 py-20 md:py-28">
        {!hideEyebrow && (
          <p className="mb-4 flex items-center gap-3.5">
            <span className="h-px w-7.5 bg-primary" aria-hidden />
            <span className="font-accent text-[clamp(0.85rem,1.3vw,1.3rem)] tracking-[0.35em] text-white/60">
              {t('eyebrow')}
            </span>
          </p>
        )}
        <h2 className="font-brand text-[clamp(3rem,15vw,12rem)] leading-[0.86] font-normal">
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
          <div className="flex flex-col gap-5 md:items-end lg:flex-row lg:gap-12">
            <Link href="/rauxa-lab" className={LINK_CLASS}>
              {t('cta')}
              <ArrowIcon animate />
            </Link>
            {bookingLabel && (
              <Link
                href={{ pathname: '/rauxa-lab', hash: LAB.anchors.booking }}
                className={LINK_CLASS}
              >
                {bookingLabel}
                <ArrowIcon animate />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
