'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { useConsent } from '@/components/consent/ConsentProvider';
import { NOJS } from '@/lib/motion';
import { BookingFrame } from './BookingFrame';

type BookingGateProps = {
  src: string;
  frameClassName: string;
};

// CoverManager and New Relic set cookies that are not strictly necessary, so
// the frame only mounts under Análisis. The provider is seeded from the
// cookie on the server, so a visitor who granted it gets the frame in the
// HTML.
export function BookingGate({ src, frameClassName }: BookingGateProps) {
  const t = useTranslations('lab.booking');
  const { categories } = useConsent();
  const [requested, setRequested] = useState(false);

  if (categories.analytics || requested) {
    return (
      <BookingFrame
        src={src}
        title={t('frameTitle')}
        className={frameClassName}
        focusOnMount={requested}
      />
    );
  }

  return (
    // Without scripts the button cannot load anything, and the external link
    // in the header is the way to book.
    <div
      className="mx-6 flex flex-col items-start gap-6 rounded-md border border-border p-6 md:mx-0 md:flex-row md:items-center md:justify-between md:p-8"
      {...NOJS.hide}
    >
      <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
        {t.rich('consentNotice', {
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
      <Button
        size="lg"
        className="md:shrink-0"
        onClick={() => setRequested(true)}
      >
        {t('load')}
      </Button>
    </div>
  );
}
