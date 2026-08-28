'use client';

import { ReactNode } from 'react';
import { m, useReducedMotion, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';

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
const VIEWPORT = { once: true, amount: 'some', margin: '0px 0px -15% 0px' } as const;

// The container broadcasts hidden/show through MotionContext; each part consumes
// it and staggers itself via its own delay. Degrades to a plain fade on reduce.
const fade = (reduce: boolean, delay: number): Variants =>
  reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4, delay } } }
    : {
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay } },
      };

const mask = (reduce: boolean, delay: number): Variants =>
  reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4, delay } } }
    : {
        hidden: { y: '110%' },
        show: { y: 0, transition: { duration: 0.8, ease: EASE, delay } },
      };

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
  const reduce = useReducedMotion();

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {eyebrow && (
        <m.div variants={fade(!!reduce, 0)} className="flex items-center gap-3.5">
          {hairline && <span className="h-px w-7.5 bg-primary" aria-hidden />}
          <span className="font-accent tracking-[0.35em] text-foreground/60">
            {eyebrow}
          </span>
        </m.div>
      )}

      <Heading className={cn('mt-4 font-normal tracking-tight', titleSize[size])}>
        <span className="block overflow-hidden">
          <m.span className="block" variants={mask(!!reduce, 0.08)}>
            {title}
          </m.span>
        </span>
      </Heading>

      {description && (
        <m.div
          variants={fade(!!reduce, 0.18)}
          className="mt-5 max-w-2xl space-y-3 text-foreground/70"
        >
          {description}
        </m.div>
      )}
    </m.div>
  );
}
