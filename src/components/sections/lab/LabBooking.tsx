import { getLocale, getTranslations } from 'next-intl/server';
import { LAB } from '@/lib/content/lab';
import { SectionHeader } from '../shared/SectionHeader';
import { SectionShell } from '../shared/SectionShell';
import { ArrowIcon } from '@/components/icons/ArrowIcon';
import { BookingFrame } from './BookingFrame';

export async function LabBooking() {
  const [t, locale] = await Promise.all([
    getTranslations('lab.booking'),
    getLocale(),
  ]);
  const bookingUrl = LAB.bookingUrl(locale);

  return (
    <SectionShell id={LAB.anchors.booking}>
      <div className="mx-auto max-w-page px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            hairline
            size="lg"
            eyebrow={t('eyebrow')}
            title={
              <>
                <span className="block">{t('title')}</span>
                <span className="block text-primary">
                  {t('titleHighlight')}
                </span>
              </>
            }
            description={<p>{t('description')}</p>}
          />

          {/* Also the way in when the frame cannot book: CoverManager runs on
              its own scripts and cookies, which the visitor's browser may block
              inside a third-party frame. */}
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group font-accent inline-flex w-fit items-center gap-3 text-[clamp(1.1rem,1.6vw,1.4rem)] tracking-[0.2em] text-blue-ink uppercase"
          >
            {t('openExternal')}
            <ArrowIcon animate />
          </a>
        </div>

        {/* No frame of our own: when embedded, the booking page draws its own
            white rounded panel on a transparent body. From an iframe 768px wide
            that panel is 740px and centers itself, so the frame takes the full
            row: narrowing it below 768px flips the page to its phone layout. */}
        <div className="-mx-6 mt-12 md:mx-0 md:mt-16">
          {/* Heights of the first step at each width, so the section does
              not jump when the resizer takes over. */}
          <BookingFrame
            src={bookingUrl}
            title={t('frameTitle')}
            className="h-[740px] md:h-[566px]"
          />
        </div>
      </div>
    </SectionShell>
  );
}
