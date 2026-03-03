'use client';

import { motion } from 'framer-motion';
import { TEAM } from '@/lib/content/team';
import { TeamMemberCard } from './TeamMemberCard';
import { useTranslations } from 'next-intl';
import { SectionShell } from '@/components/sections/shared/SectionShell';
import { SectionHeader } from '@/components/sections/shared/SectionHeader';
import { staggerContainerSlow, staggerItemSlow } from '@/lib/animations';

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

      <motion.div
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-200px' }}
      >
        {TEAM.map((m) => (
          <motion.div key={m.id} variants={staggerItemSlow}>
            <TeamMemberCard
              name={tMembers(`${m.id}.name`)}
              role={tMembers(`${m.id}.role`)}
              bio={tMembers(`${m.id}.bio`)}
              image={m.image}
            />
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  );
}
