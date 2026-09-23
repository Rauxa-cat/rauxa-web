import { getTranslations } from 'next-intl/server';
import { PROJECTS } from '@/lib/content/projects';
import { Sequence, SequenceFade } from '@/components/motion/Sequence';
import { SectionShell } from '../shared/SectionShell';
import { ProjectRow } from './ProjectRow';
import { highlight, StoryHeading } from './StoryChapter';

export async function ProjectsSection() {
  const t = await getTranslations('about.projects');

  return (
    <SectionShell>
      <Sequence className="mx-auto flex max-w-page flex-col gap-6 px-6 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="flex flex-col items-start gap-4">
          <StoryHeading
            eyebrow={t('eyebrow')}
            title={t.rich('title', highlight)}
          />
        </div>
        <SequenceFade
          delay={0.18}
          className="font-accent text-xl tracking-[0.2em] text-foreground/60 uppercase md:pb-2.5"
        >
          {t('count', { count: PROJECTS.length })}
        </SequenceFade>
      </Sequence>

      <div className="mx-auto mt-12 max-w-page px-6">
        <ol className="border-t border-foreground/15">
          {PROJECTS.map((project, i) => (
            <ProjectRow
              key={project.id}
              position={i}
              name={t(`items.${project.id}.name`)}
              meta={t(`items.${project.id}.meta`)}
              summary={t(`items.${project.id}.summary`)}
              detail={t(`items.${project.id}.detail`)}
              lessLabel={t('less')}
            />
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
