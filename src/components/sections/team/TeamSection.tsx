import { getTranslations } from 'next-intl/server';
import { TEAM } from '@/lib/content/team';
import { SectionHeader } from '../shared/SectionHeader';
import { TeamMember } from './TeamMember';

export async function TeamSection() {
  const t = await getTranslations('team.section');
  const tMembers = await getTranslations('team.members');

  return (
    <section className="bg-background">
      <SectionHeader
        className="mx-auto max-w-page px-6 pt-24 pb-20 md:pt-32"
        hairline
        size="lg"
        eyebrow={t('eyebrow')}
        title={
          <>
            <span className="block">{t('title')}</span>
            <span className="block text-primary">{t('titleHighlight')}</span>
          </>
        }
        description={<p>{t('description')}</p>}
      />

      <ul className="border-t border-foreground/15">
        {TEAM.map((member, i) => (
          <TeamMember
            key={member.id}
            index={String(i + 1).padStart(2, '0')}
            name={tMembers(`${member.id}.name`)}
            bio={tMembers(`${member.id}.bio`)}
            image={member.image}
            reversed={i % 2 === 1}
          />
        ))}
      </ul>
    </section>
  );
}
