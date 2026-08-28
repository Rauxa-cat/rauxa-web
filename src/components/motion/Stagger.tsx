'use client';

import { m, type Variants } from 'motion/react';
import { EASE } from '@/lib/motion';

// `amount: 'some'` fires as soon as any part enters, so a group taller than the
// viewport still triggers. Above-the-fold groups run on mount, since whileInView
// resolves immediately when the element already sits in view.
const VIEWPORT = {
  once: true,
  amount: 'some',
  margin: '0px 0px -10% 0px',
} as const;

// Only the timing lives on the container; the children carry the visual change,
// so a `Stagger` never paints anything of its own.
export const staggerContainer = (delay: number, gap: number): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: gap } },
});

// Broadcasts hidden/show to every `StaggerItem` below it, one after the other.
// Use `staggerContainer` directly when the container has to be another element.
export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.07,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
}) {
  return (
    <m.div
      className={className}
      variants={staggerContainer(delay, gap)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </m.div>
  );
}

const item = (distance: number): Variants => ({
  hidden: { opacity: 0, y: distance },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
});

export function StaggerItem({
  children,
  className,
  distance = 18,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  return (
    <m.div className={className} variants={item(distance)}>
      {children}
    </m.div>
  );
}
