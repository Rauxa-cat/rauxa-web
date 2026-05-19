'use client';

import { TEAM } from '@/lib/content/team';
import { TeamMemberCard } from './TeamMemberCard';
import { useTranslations } from 'next-intl';
import { SectionShell } from '@/components/sections/shared/SectionShell';
import { SectionHeader } from '@/components/sections/shared/SectionHeader';

export function TeamSection() {
  const t = useTranslations('team.section');
  const tMembers = useTranslations('team.members');
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

      <div className="stagger-grid mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((m) => (
          <div key={m.id} className="view-animate">
            <TeamMemberCard
              name={tMembers(`${m.id}.name`)}
              role={tMembers(`${m.id}.role`)}
              bio={tMembers(`${m.id}.bio`)}
              image={m.image}
            />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
