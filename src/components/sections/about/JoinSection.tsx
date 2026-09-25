import { getTranslations } from 'next-intl/server';
import { Sequence } from '@/components/motion/Sequence';
import { SectionShell } from '../shared/SectionShell';
import { JoinForm } from './JoinForm';
import { highlight, StoryHeading } from './StoryChapter';

export async function JoinSection() {
  const t = await getTranslations('about.join');

  return (
    <SectionShell className="pb-24 md:pb-32">
      <div className="mx-auto grid max-w-page gap-14 px-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-24">
        <Sequence className="flex flex-col items-start gap-6">
          <StoryHeading
            eyebrow={t('eyebrow')}
            title={t.rich('title', highlight)}
            titleClassName="text-[clamp(2.25rem,4.5vw,3.5rem)]/[1.02]"
            intro={t('intro')}
          />
        </Sequence>

        <JoinForm />
      </div>
    </SectionShell>
  );
}
