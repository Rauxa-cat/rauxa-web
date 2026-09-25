import { getTranslations } from 'next-intl/server';
import { MaskReveal } from '@/components/motion/MaskReveal';
import { TEAM } from '@/lib/content/team';
import { highlight, StoryChapter, StoryLead } from './StoryChapter';
import { StoryPerson } from './StoryPerson';

export async function KitchenSection() {
  const t = await getTranslations('about.kitchen');
  const tPeople = await getTranslations('about.people');

  return (
    <StoryChapter
      eyebrow={t('eyebrow')}
      title={t.rich('title', highlight)}
      footer={
        <div className="flex flex-col gap-12 md:gap-20">
          {TEAM.map((person, i) => (
            <StoryPerson
              key={person.id}
              name={tPeople(`${person.id}.name`)}
              bio={tPeople(`${person.id}.bio`)}
              image={person.image}
              reversed={i % 2 === 1}
            />
          ))}

          <p className="font-brand max-w-4xl text-foreground text-[clamp(1.75rem,4vw,3rem)] leading-[1.12]">
            <MaskReveal>{t.rich('closing', highlight)}</MaskReveal>
          </p>
        </div>
      }
    >
      <StoryLead>{t('p1')}</StoryLead>
      <p>{t('p2')}</p>
    </StoryChapter>
  );
}
