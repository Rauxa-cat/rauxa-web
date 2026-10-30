import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { NAV_ITEMS } from '@/lib/content/nav';
import { MaskReveal } from '@/components/motion/MaskReveal';
import { FadeIn } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { IsotypeIcon } from '@/components/icons/IsotypeIcon';
import { ArrowIcon } from '@/components/icons/ArrowIcon';
import { RowIndex } from '@/components/sections/shared/RowIndex';
import { NotFoundMark } from './NotFoundMark';

export async function NotFoundSection() {
  const t = await getTranslations('notFound');
  const tNav = await getTranslations('nav');

  return (
    <section className="relative overflow-hidden bg-background">
      <IsotypeIcon
        outline
        className="pointer-events-none absolute top-12 -right-40 w-[56rem] max-w-none rotate-12 text-foreground/[0.06]"
      />

      <div className="relative mx-auto grid max-w-page gap-16 px-6 pt-16 pb-24 md:pt-24 md:pb-32 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
        <div>
          <NotFoundMark />

          <p className="font-accent mt-6 text-[clamp(0.95rem,1.3vw,1.3rem)] tracking-[0.35em] text-blue-ink uppercase">
            {t('eyebrow')}
          </p>
          <h1 className="font-brand mt-2 text-[clamp(2.75rem,7vw,5.25rem)] leading-[1.05] font-normal">
            <MaskReveal delay={0.2}>{t('title')}</MaskReveal>
          </h1>

          <FadeIn>
            <p className="mt-6 max-w-[30rem] leading-relaxed text-muted-foreground">
              {t('body')}
            </p>
          </FadeIn>
        </div>

        <nav aria-labelledby="not-found-menu">
          <p
            id="not-found-menu"
            className="font-accent text-[clamp(0.95rem,1.3vw,1.3rem)] tracking-[0.35em] text-blue-ink uppercase"
          >
            {t('menuTitle')}
          </p>

          <Stagger className="mt-5 border-t border-border" delay={0.35}>
            {NAV_ITEMS.map(({ href }, index) => (
              <StaggerItem key={href} className="border-b border-border">
                <Link
                  href={href}
                  className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 py-5"
                >
                  <RowIndex>{String(index + 1).padStart(2, '0')}</RowIndex>
                  <span className="flex min-w-0 items-baseline gap-3">
                    <span className="font-brand text-2xl transition-colors group-hover:text-blue-ink md:text-3xl">
                      {tNav(href)}
                    </span>
                    {/* The dotted leader of a printed menu, running to the "price". */}
                    <span
                      aria-hidden
                      className="min-w-6 flex-1 -translate-y-[0.3em] border-b-2 border-dotted border-border transition-colors group-hover:border-blue-ink"
                    />
                    <ArrowIcon animate className="text-blue-ink" />
                  </span>
                  <span className="col-start-2 mt-1 text-sm text-muted-foreground">
                    {t(`links.${href}`)}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </nav>
      </div>
    </section>
  );
}
