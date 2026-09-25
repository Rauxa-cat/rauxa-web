'use client';

import { m, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';
import { EASE, maskIn, NOJS } from '@/lib/motion';
import { useUnclip } from './useUnclip';

// `amount: 'some'` so a block taller than the viewport still triggers, which a
// fractional amount can never reach there.
const VIEWPORT = {
  once: true,
  amount: 'some',
  margin: '0px 0px -15% 0px',
} as const;

const fade = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay } },
});

// One viewport trigger for a group of parts that sit apart in the layout (a rail
// and a column, a header and its count), so they land as one entrance instead of
// each firing on its own position. The parts pick their beat through `delay`.
export function Sequence({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </m.div>
  );
}

export function SequenceFade({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.div {...NOJS.reset} className={className} variants={fade(delay)}>
      {children}
    </m.div>
  );
}

// The `MaskReveal` wipe, driven by the enclosing `Sequence` instead of its own
// viewport entry.
export function SequenceMask({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [unclipped, unclip] = useUnclip();

  return (
    <span
      className={cn(
        'block',
        unclipped ? 'overflow-visible' : 'overflow-hidden',
        className,
      )}
    >
      <m.span
        {...NOJS.reset}
        className="block"
        variants={maskIn(delay)}
        onAnimationComplete={unclip}
      >
        {children}
      </m.span>
    </span>
  );
}
