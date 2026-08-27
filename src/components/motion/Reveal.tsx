'use client';

import { m, useReducedMotion } from 'motion/react';
import { EASE } from '@/lib/motion';

// `amount: 'some'` fires as soon as any part enters, so rows taller than the
// viewport still trigger (a fractional amount can never be reached there). The
// bottom margin holds the reveal until the element has risen into view.
const VIEWPORT = { once: true, amount: 'some', margin: '0px 0px -20% 0px' } as const;

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
// Degrades to a plain fade when reduced motion is on.
export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.li
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0 0 0 0)' }}
      viewport={VIEWPORT}
      transition={{ duration: reduce ? 0.4 : 0.55, ease: EASE }}
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
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
