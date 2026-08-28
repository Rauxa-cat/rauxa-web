'use client';

import { m, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { PRESS_SPRING } from '@/lib/motion';

// Springy hover/press for buttons. Wraps the trigger; reduced motion renders a plain span.
export function Pressable({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={cn('inline-flex', className)}>{children}</span>;
  }

  return (
    <m.span
      className={cn('inline-flex', className)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={PRESS_SPRING}
    >
      {children}
    </m.span>
  );
}
