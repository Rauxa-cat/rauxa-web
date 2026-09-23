import { getTranslations } from 'next-intl/server';
import { highlight, StoryChapter, StoryLead } from './StoryChapter';

export async function BeginningSection() {
  const t = await getTranslations('about.beginning');

  return (
    <StoryChapter
      eyebrow={t('eyebrow')}
      marker={t('marker')}
      title={t.rich('title', highlight)}
    >
      <StoryLead>{t('p1')}</StoryLead>
      <p>{t('p2')}</p>
      <p>{t('p3')}</p>
    </StoryChapter>
  );
}
