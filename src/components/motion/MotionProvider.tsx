'use client';

import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';

// domAnimation keeps the bundle small (~17kb); `strict` forbids `motion.*` so we only use `m.*`.
// `reducedMotion: 'user'` makes Motion snap transform and layout values instantly
// for visitors who ask for less motion, so primitives can keep one set of
// keyframes instead of picking them in render, where the server cannot know the
// preference and would disagree with the client and break hydration.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
