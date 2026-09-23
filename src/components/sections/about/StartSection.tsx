import { getTranslations } from 'next-intl/server';
import { highlight, StoryChapter, StoryLead } from './StoryChapter';

export async function StartSection() {
  const t = await getTranslations('about.start');

  return (
    <StoryChapter
      eyebrow={t('eyebrow')}
      marker={t('marker')}
      title={t.rich('title', highlight)}
    >
      <StoryLead>{t('p1')}</StoryLead>
      <p>{t('p2')}</p>
    </StoryChapter>
  );
}
