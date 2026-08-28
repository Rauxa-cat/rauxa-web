'use client';

import { LazyMotion, domAnimation } from 'motion/react';

// domAnimation keeps the bundle small (~17kb); `strict` forbids `motion.*` so we only use `m.*`.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
