'use client';

import { ReactNode } from 'react';
import { m, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';
import { EASE, maskTransition, NOJS } from '@/lib/motion';
import { useUnclip } from '@/components/motion/useUnclip';

type SectionHeaderSize = 'sm' | 'md' | 'lg' | 'display';

// Fluid sizes: keep the proportion between bands, not the pixel values.
const titleSize: Record<SectionHeaderSize, string> = {
  sm: 'text-[clamp(1.5rem,3vw,2rem)] leading-tight',
  md: 'text-[clamp(2rem,4vw,3.25rem)] leading-tight',
  lg: 'text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02]',
  display: 'text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.95]',
};

// `amount: 'some'` fires as soon as the header enters, so a title taller than
// the viewport still triggers (a fractional amount can never be reached there).
const VIEWPORT = {
  once: true,
  amount: 'some',
  margin: '0px 0px -15% 0px',
} as const;

// The container broadcasts hidden/show through MotionContext; each part consumes
// it and staggers itself via its own delay.
const fade = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay } },
});

const mask = (delay: number): Variants => ({
  hidden: { opacity: 0, y: '110%' },
  show: { opacity: 1, y: 0, transition: maskTransition(delay) },
});

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  size?: SectionHeaderSize;
  hairline?: boolean;
  as?: 'h1' | 'h2';
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  size = 'md',
  hairline = false,
  as: Heading = 'h2',
  className,
}: SectionHeaderProps) {
  const [unclipped, unclip] = useUnclip();

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {eyebrow && (
        <m.div
          {...NOJS.reset}
          variants={fade(0)}
          className="flex items-center gap-3.5"
        >
          {hairline && <span className="h-px w-7.5 bg-primary" aria-hidden />}
          <span className="font-accent tracking-[0.35em] text-foreground/60">
            {eyebrow}
          </span>
        </m.div>
      )}

      <Heading
        className={cn('mt-4 font-normal tracking-tight', titleSize[size])}
      >
        <span
          className={cn(
            'block',
            unclipped ? 'overflow-visible' : 'overflow-hidden',
          )}
        >
          <m.span
            {...NOJS.reset}
            className="block"
            variants={mask(0.08)}
            onAnimationComplete={unclip}
          >
            {title}
          </m.span>
        </span>
      </Heading>

      {description && (
        <m.div
          {...NOJS.reset}
          variants={fade(0.18)}
          className="mt-5 max-w-2xl space-y-3 text-foreground/70"
        >
          {description}
        </m.div>
      )}
    </m.div>
  );
}
