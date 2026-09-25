import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import {
  Sequence,
  SequenceFade,
  SequenceMask,
} from '@/components/motion/Sequence';
import { SectionShell } from '../shared/SectionShell';

type StoryChapterProps = {
  eyebrow: string;
  title: ReactNode;
  marker?: string;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
};

// The line height rides inside the `text-[]` value: as a separate `leading-*` class,
// `cn` drops it as a conflict with the arbitrary font size, and the heading silently
// falls back to the 1.5 body leading.
export const TITLE_TYPE = 'text-[clamp(2.5rem,6vw,4.25rem)]/[1.02]';

const EYEBROW =
  'font-accent text-base tracking-[0.3em] text-foreground/60 uppercase';

// Electric blue only holds contrast on black at display sizes, so `<hl>` is kept to
// headings and display lines; body copy uses `text-blue-ink`.
export const highlight = {
  hl: (chunks: ReactNode) => <span className="text-primary">{chunks}</span>,
};

export function StoryChapter({
  eyebrow,
  title,
  marker,
  footer,
  children,
  className,
  id,
}: StoryChapterProps) {
  return (
    <SectionShell id={id} className={className}>
      <Sequence className="mx-auto grid max-w-page gap-8 px-6 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-16">
        <div
          className={cn(
            'flex flex-col items-start gap-4',
            // The rail runs on the heading's own type scale, so its first line box
            // matches the heading's and both sit on the same line.
            TITLE_TYPE,
            marker ? 'md:pt-[0.12em]' : 'md:pt-[0.15em]',
          )}
        >
          {marker && (
            <SequenceMask className="font-brand text-[0.76em] leading-none text-primary">
              {marker}
            </SequenceMask>
          )}
          <SequenceFade delay={0.1} className={EYEBROW}>
            {eyebrow}
          </SequenceFade>
        </div>

        <div className="flex flex-col gap-7">
          <h2 className={cn('font-normal', TITLE_TYPE)}>
            <SequenceMask delay={0.08}>{title}</SequenceMask>
          </h2>

          <SequenceFade
            delay={0.18}
            className="flex max-w-3xl flex-col gap-6 text-[1.0625rem] leading-[1.8] text-foreground/70"
          >
            {children}
          </SequenceFade>
        </div>
      </Sequence>

      {/* The footer clears the date rail, which is what gives an alternating row
          its full swing from one margin to the other. */}
      {footer && (
        <div className="mx-auto mt-16 max-w-page px-6 md:mt-24">{footer}</div>
      )}
    </SectionShell>
  );
}

export function StoryLead({ children }: { children: ReactNode }) {
  return (
    <p className="text-[clamp(1.125rem,1.7vw,1.375rem)] leading-[1.7] text-foreground">
      {children}
    </p>
  );
}

// The caller's `Sequence` sets the layout and the trigger.
export function StoryHeading({
  eyebrow,
  title,
  titleClassName = TITLE_TYPE,
  intro,
  introClassName,
}: {
  eyebrow: string;
  title: ReactNode;
  titleClassName?: string;
  intro?: ReactNode;
  introClassName?: string;
}) {
  return (
    <>
      <SequenceFade className={EYEBROW}>{eyebrow}</SequenceFade>
      <h2 className={cn('w-full font-normal', titleClassName)}>
        <SequenceMask delay={0.08}>{title}</SequenceMask>
      </h2>
      {intro && (
        <SequenceFade
          delay={0.18}
          className={cn(
            'text-[1.0625rem] leading-[1.8] text-foreground/70',
            introClassName,
          )}
        >
          <p>{intro}</p>
        </SequenceFade>
      )}
    </>
  );
}
