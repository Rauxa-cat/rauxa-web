'use client';

import { m } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ALL_CONSENT, NO_CONSENT } from '@/lib/consent/consent';
import { EASE, NOJS } from '@/lib/motion';
import { useConsent } from './ConsentProvider';

export const BANNER_ATTR = 'data-cookie-banner';

export function CookieBanner() {
  const t = useTranslations('consent.banner');
  const { save, openSettings } = useConsent();

  return (
    <m.section
      aria-labelledby="cookie-banner-title"
      {...{ [BANNER_ATTR]: '' }}
      className="sticky bottom-0 z-40 border-t bg-background/95 text-foreground shadow-[0_-8px_30px_rgb(0_0_0/0.12)] backdrop-blur"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4, ease: EASE }}
      // Sticky rather than fixed: it closes the page, so once scrolled to the
      // end it sits below the footer instead of covering its legal links.
      // The buttons only work once hydrated; without scripts the banner would
      // ask for a choice nobody can make.
      {...NOJS.hide}
    >
      <div className="mx-auto flex max-w-page flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:gap-8">
        <div className="space-y-1 text-sm md:flex-1">
          <h2 id="cookie-banner-title" className="font-sans font-semibold">
            {t('title')}
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            {t.rich('text', {
              link: (chunks) => (
                <Link
                  href="/cookies"
                  className="text-foreground underline underline-offset-4"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:shrink-0">
          {/* Same variant and size on purpose: the AEPD requires rejecting to
              be as easy and as visible as accepting. */}
          <Button
            className="flex-1 md:flex-none"
            onClick={() => save(ALL_CONSENT)}
          >
            {t('accept')}
          </Button>
          <Button
            className="flex-1 md:flex-none"
            onClick={() => save(NO_CONSENT)}
          >
            {t('reject')}
          </Button>
          <Button
            variant="outline"
            className="w-full md:w-auto"
            onClick={openSettings}
          >
            {t('configure')}
          </Button>
        </div>
      </div>
    </m.section>
  );
}
