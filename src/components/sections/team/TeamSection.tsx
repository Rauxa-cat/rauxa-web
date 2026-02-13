import { TEAM } from '@/lib/content/team';
import { TeamMemberCard } from './TeamMemberCard';
import { getTranslations } from 'next-intl/server';
import { SectionShell } from '@/components/sections/shared/SectionShell';
import { SectionHeader } from '@/components/sections/shared/SectionHeader';

export async function TeamSection() {
  const t = await getTranslations('team.section');
  const tMembers = await getTranslations('team.members');
  return (
    <SectionShell>
      <SectionHeader
        eyebrow={t('eyebrow')}
        title={
          <>
            {t('title')}{' '}
            <span className="text-primary">{t('titleHighlight')}</span>
          </>
        }
        description={<p>{t('description')}</p>}
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((m) => (
          <TeamMemberCard
            key={m.id}
            name={tMembers(`${m.id}.name`)}
            role={tMembers(`${m.id}.role`)}
            bio={tMembers(`${m.id}.bio`)}
            image={m.image}
          />
        ))}
      </div>
    </SectionShell>
  );
}
