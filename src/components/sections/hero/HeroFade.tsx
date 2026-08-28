'use client';

import { m } from 'motion/react';
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
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
