import { getTranslations } from 'next-intl/server';
import { LAB } from '@/lib/content/lab';
import { SectionShell } from '../shared/SectionShell';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { InkParagraph } from './InkParagraph';

const [lng, lat] = LAB.coordinates;
const COORDINATES = `${lat.toFixed(4)}° N · ${lng.toFixed(4)}° E`;

export async function LabIntro() {
  const t = await getTranslations('lab.intro');

  return (
    <SectionShell>
      <div className="mx-auto max-w-page px-6">
        <Stagger className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-foreground/15 pb-5">
          <StaggerItem className="flex items-center gap-3.5">
            <span className="h-px w-7.5 bg-primary" aria-hidden />
            <span className="font-accent tracking-[0.35em] text-foreground/60">
              {t('eyebrow')}
            </span>
          </StaggerItem>
          <StaggerItem>
            <p className="font-accent tracking-[0.2em] text-blue-ink">
              {COORDINATES}
            </p>
          </StaggerItem>
        </Stagger>

        <InkParagraph
          text={t.raw('text')}
          className="mt-10 text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.16] font-medium tracking-[-0.02em] text-pretty md:mt-14 md:ml-[25%]"
        />
      </div>
    </SectionShell>
  );
}
