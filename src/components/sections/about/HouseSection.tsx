import { getTranslations } from 'next-intl/server';
import { LabTeaser } from '../shared/LabTeaser';
import { highlight, StoryChapter, StoryLead } from './StoryChapter';

export async function HouseSection() {
  const t = await getTranslations('about.home');

  return (
    <>
      <StoryChapter
        eyebrow={t('eyebrow')}
        marker={t('marker')}
        title={t.rich('title', highlight)}
      >
        <StoryLead>
          {t('p1')}{' '}
          {t.rich('p2', {
            lab: (chunks) => <span className="text-blue-ink">{chunks}</span>,
          })}
        </StoryLead>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <p>{t('p3')}</p>
          <p>{t('p4')}</p>
        </div>
      </StoryChapter>
      <LabTeaser bookingLabel={t('book')} hideEyebrow />
    </>
  );
}
