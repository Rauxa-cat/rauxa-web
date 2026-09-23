'use client';

import { m } from 'motion/react';
import { cn } from '@/lib/utils';
import { maskIn, NOJS } from '@/lib/motion';
import { useUnclip } from './useUnclip';

// Same top-to-bottom mask reveal as the hero bands, for section headings below the fold.
// The OUTER span drives whileInView (it sits at its real position); the inner span carries
// the transform via variants; observing the translated inner element would misfire.
export function MaskReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
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
        variants={maskIn(delay)}
        onAnimationComplete={unclip}
      >
        {children}
      </m.span>
    </m.span>
  );
}
