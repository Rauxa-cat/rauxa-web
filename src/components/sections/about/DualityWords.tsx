'use client';

import { m, type Variants } from 'motion/react';
import { EASE, NOJS } from '@/lib/motion';

const VIEWPORT = { once: true, amount: 0.5 } as const;

// The two words close in from opposite sides and meet at the rule, which is the
// opposition the paragraph below names.
const word = (from: string): Variants => ({
  hidden: { opacity: 0, x: from },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
});

const rule: Variants = {
  hidden: { opacity: 0, scaleY: 0 },
  show: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.6, ease: EASE, delay: 0.25 },
  },
};

export function DualityWords() {
  return (
    // Both words are named and explained in the paragraph below.
    <m.div
      aria-hidden="true"
      className="font-brand mt-16 flex items-center justify-center gap-[clamp(1rem,3.5vw,3rem)] text-[clamp(3.25rem,12vw,10.625rem)] leading-[0.9] md:mt-20"
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <m.span
        {...NOJS.reset}
        variants={word('-12%')}
        className="text-primary [text-shadow:0_0_80px_--alpha(var(--color-primary)/50%)]"
      >
        RAUXA
      </m.span>
      <m.span
        {...NOJS.reset}
        variants={rule}
        className="h-[0.88em] w-px bg-foreground/25"
      />
      <m.span
        {...NOJS.reset}
        variants={word('12%')}
        className="text-transparent [-webkit-text-stroke:1px_--alpha(var(--color-foreground)/50%)]"
      >
        SENY
      </m.span>
    </m.div>
  );
}
