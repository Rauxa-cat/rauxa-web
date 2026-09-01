'use client';

import { m } from 'motion/react';
import { EASE, NOJS } from '@/lib/motion';
import { useHeroHeld } from './HeroHold';

// Waits on the hold rather than on mount, so the copy never arrives over a
// frame the photo has not reached.
export function HeroFade({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const held = useHeroHeld();

  return (
    <m.div
      {...NOJS.reset}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={held ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
