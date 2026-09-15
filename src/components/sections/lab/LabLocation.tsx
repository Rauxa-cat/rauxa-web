import { getTranslations } from 'next-intl/server';
import { LAB } from '@/lib/content/lab';
import { SectionHeader } from '../shared/SectionHeader';
import { SectionShell } from '../shared/SectionShell';
import { ArrowIcon } from '@/components/icons/ArrowIcon';
import { LabMap } from './LabMap';

export async function LabLocation() {
  const t = await getTranslations('lab.location');
  const { street, postalCode, locality, region } = LAB.address;

  return (
    <SectionShell id={LAB.anchors.location} className="pb-24 md:pb-32">
      {/* No column gap: the gutter is what the text leaves free in its half,
          45px beside "Nos vemos en" at the title's 88px cap. A 5/7 split would
          drop "en" onto a line of its own. */}
      <div className="mx-auto grid max-w-page gap-y-12 px-6 md:grid-cols-2 md:items-end">
        <div>
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
          />

          <address className="mt-10 text-lg leading-relaxed text-foreground/80 not-italic">
            {street}
            <br />
            {postalCode} {locality}
            <br />
            {region}
          </address>

          <a
            href={LAB.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group font-accent mt-8 inline-flex w-fit items-center gap-3 text-[clamp(1.1rem,1.6vw,1.4rem)] tracking-[0.2em] text-blue-ink uppercase"
          >
            {t('directions')}
            <ArrowIcon animate />
          </a>
        </div>

        <LabMap className="aspect-square md:aspect-5/4" />
      </div>
    </SectionShell>
  );
}
