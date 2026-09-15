'use client';

import { m, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';
import { maskTransition, NOJS } from '@/lib/motion';
import { useUnclip } from './useUnclip';

const inner: Variants = {
  hidden: { opacity: 0, y: '110%' },
  show: { opacity: 1, y: 0, transition: maskTransition() },
};

// Same top-to-bottom mask reveal as the hero bands, for section headings below the fold.
// The OUTER span drives whileInView (it sits at its real position); the inner span carries
// the transform via variants; observing the translated inner element would misfire.
export function MaskReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [unclipped, unclip] = useUnclip();

  return (
    <m.span
      className={cn(
        'block',
        unclipped ? 'overflow-visible' : 'overflow-hidden',
        className,
      )}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <m.span
        {...NOJS.reset}
        className="block"
        variants={inner}
        onAnimationComplete={unclip}
      >
        {children}
      </m.span>
    </m.span>
  );
}
