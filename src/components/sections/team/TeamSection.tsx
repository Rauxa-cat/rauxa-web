import { TEAM } from '@/lib/content/team';
import { TeamMemberCard } from './TeamMemberCard';
import { getTranslations } from 'next-intl/server';

export async function TeamSection() {
  const t = await getTranslations('team.section');
  const tMembers = await getTranslations('team.members');
  return (
    <section className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="font-accent text-xs tracking-[0.35em] text-foreground/60 md:text-sm">
            {t('eyebrow')}
          </p>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-4xl">
            {t('title')}
          </h2>

          <p className="mt-5 text-foreground/70">{t('description')}</p>
        </div>

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
      </div>
    </section>
  );
}
