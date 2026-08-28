'use client';

import { m, useScroll, useSpring, useReducedMotion } from 'motion/react';

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  if (reduce) return null;

  return (
    <m.div
      aria-hidden
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[linear-gradient(90deg,var(--rauxa-electric),var(--rauxa-blue-300))]"
    />
  );
}
