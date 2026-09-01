'use client';

import { m } from 'motion/react';
import { cn } from '@/lib/utils';
import { EASE, NOJS } from '@/lib/motion';
import { useUnclip } from './useUnclip';

// `amount: 'some'` fires as soon as any part enters, so rows taller than the
// viewport still trigger (a fractional amount can never be reached there). The
// bottom margin holds the reveal until the element has risen into view.
const VIEWPORT = {
  once: true,
  amount: 'some',
  margin: '0px 0px -20% 0px',
} as const;

export function RevealList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <ul className={className}>{children}</ul>;
}

// Editorial "written from the left" wipe. Each item observes its own viewport
// entry, so rows reveal one by one as they scroll in rather than all at once.
// `clip-path` is not a transform, so `reducedMotion: 'user'` cannot snap it: the
// media query drops the wipe instead, leaving the opacity leg as a plain fade.
export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [unclipped, unclip] = useUnclip();

  return (
    <m.li
      {...NOJS.reset}
      // `!` because the settled `inset(0 0 0 0)` Motion leaves behind is an
      // inline style, and it would keep slicing the row's parallax travel and
      // the hover glows at the row edge.
      className={cn(
        'motion-reduce:[clip-path:none]!',
        unclipped && '[clip-path:none]!',
        className,
      )}
      initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
      viewport={VIEWPORT}
      transition={{ duration: 0.55, ease: EASE }}
      onAnimationComplete={unclip}
    >
      {children}
    </m.li>
  );
}

// Subtle block entrance for team members / standalone sections.
export function FadeIn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <m.div
      {...NOJS.reset}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
