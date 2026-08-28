'use client';

import { m, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';
import { maskTransition } from '@/lib/motion';

const inner: Variants = {
  hidden: { opacity: 0, y: '110%' },
  show: { opacity: 1, y: 0, transition: maskTransition() },
};

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
