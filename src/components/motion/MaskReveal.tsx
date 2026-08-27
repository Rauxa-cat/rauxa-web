'use client';

import { m, useReducedMotion, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';

// Same top-to-bottom mask reveal as the hero bands, for section headings below the fold.
// The OUTER span drives whileInView (it sits at its real position); the inner span carries
// the transform via variants — observing the translated inner element would misfire.
export function MaskReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const inner: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { y: '110%' },
        show: { y: 0, transition: { duration: 0.8, ease: EASE } },
      };

  return (
    <m.span
      className={cn('block overflow-hidden', className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <m.span className="block" variants={inner}>
        {children}
      </m.span>
    </m.span>
  );
}
