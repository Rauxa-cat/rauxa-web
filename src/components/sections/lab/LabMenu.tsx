import { getLocale, getTranslations } from 'next-intl/server';
import { LAB } from '@/lib/content/lab';
import { formatPrice } from '@/lib/utils';
import { FadeIn, RevealItem, RevealList } from '@/components/motion/Reveal';
import { RowIndex } from '../shared/RowIndex';
import { SectionHeader } from '../shared/SectionHeader';
import { SectionShell } from '../shared/SectionShell';
import type { Menu } from './loadMenu';

// An empty flex child aligned on the baseline puts its bottom border on the
// baseline itself, which is where a dot leader belongs.
const LEADER = 'min-w-4 flex-1 border-b border-dotted border-foreground/25';

export async function LabMenu({ menu }: { menu: Menu }) {
  const [t, locale] = await Promise.all([
    getTranslations('lab.menu'),
    getLocale(),
  ]);

  return (
    <SectionShell id={LAB.anchors.menu}>
      <div className="mx-auto max-w-page px-6">
        <SectionHeader
          hairline
          size="lg"
          eyebrow={t('eyebrow')}
          title={
            <>
              <span className="block">{t('title')}</span>
              <span className="block text-primary">{t('titleHighlight')}</span>
            </>
          }
          description={<p>{t('description')}</p>}
        />

        <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
          {menu.kitchen.map((section, i) => (
            <div
              key={section.id}
              className="grid gap-6 md:grid-cols-[1fr_3fr] md:gap-10"
            >
              <FadeIn className="flex items-baseline gap-4 self-start md:sticky md:top-24 md:flex-col md:gap-2">
                <RowIndex className="text-xl">
                  {String(i + 1).padStart(2, '0')}
                </RowIndex>
                <h3 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.1] font-normal">
                  {section.name}
                </h3>
              </FadeIn>

              <RevealList className="grid gap-x-12 border-t border-foreground/15 lg:grid-cols-2">
                {section.dishes.map((dish) => (
                  <RevealItem
                    key={dish.id}
                    className="border-b border-foreground/12 py-5"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-brand text-[clamp(1.25rem,1.8vw,1.5rem)] leading-tight">
                        {dish.name}
                      </span>
                      <span className={LEADER} aria-hidden />
                      <span className="font-accent text-xl tracking-[0.06em] whitespace-nowrap text-blue-ink">
                        {dish.perUnit
                          ? t('perUnit', {
                              price: formatPrice(locale, dish.price),
                            })
                          : formatPrice(locale, dish.price)}
                      </span>
                    </div>
                    {dish.description && (
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground/60">
                        {dish.description}
                      </p>
                    )}
                  </RevealItem>
                ))}
              </RevealList>
            </div>
          ))}
        </div>

        <FadeIn className="mt-24 border-t border-foreground/15 pt-12 md:mt-32">
          <h3 className="text-[clamp(2rem,4vw,3.25rem)] leading-tight font-normal">
            {t('wines')}
          </h3>
          <div className="mt-10 gap-x-12 md:columns-2 lg:columns-3">
            {menu.wines.map((group) => (
              <div key={group.id} className="mb-10 break-inside-avoid">
                <h4 className="font-accent text-lg tracking-[0.3em] text-foreground/60 uppercase">
                  {group.name}
                </h4>
                <ul className="mt-3">
                  {group.wines.map((wine) => (
                    <li
                      key={wine.name}
                      className="flex items-baseline gap-3 border-b border-foreground/12 py-2.5"
                    >
                      <span className="text-sm leading-snug font-medium tracking-wide uppercase">
                        {wine.name}
                        {'vintage' in wine && (
                          <span className="font-accent ml-2 text-base tracking-[0.06em] text-foreground/50">
                            {wine.vintage}
                          </span>
                        )}
                      </span>
                      <span className={LEADER} aria-hidden />
                      <span className="font-accent text-lg tracking-[0.06em] whitespace-nowrap text-blue-ink">
                        {formatPrice(locale, wine.price)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>

        <p className="mt-6 max-w-xl text-sm leading-relaxed text-foreground/60">
          {t('allergens')}
        </p>
      </div>
    </SectionShell>
  );
}
