'use client';

import { m, useReducedMotion } from 'motion/react';
import { EASE } from '@/lib/motion';

// On-load fade-up for the hero's supporting text (eyebrow, subtitle, CTAs),
// staggered via `delay` to follow the band reveal. The hero sits above the
// fold, so this is a mount entrance rather than a scroll trigger.
export function HeroFade({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.4 : 0.7, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
