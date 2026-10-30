'use client';

import { m } from 'motion/react';
import { MaskReveal } from '@/components/motion/MaskReveal';
import { IsotypeIcon } from '@/components/icons/IsotypeIcon';
import { EASE, NOJS } from '@/lib/motion';

const BURST_DELAY = 0.3;

// The isotype stands in for the zero: the "rauxa" that took the page with it.
export function NotFoundMark() {
  return (
    <div
      aria-hidden
      className="font-brand isolate flex items-center text-[clamp(6.5rem,24vw,15rem)] leading-none text-foreground"
    >
      <MaskReveal>4</MaskReveal>
      <span className="relative mx-[0.04em] inline-flex w-[0.92em] items-center justify-center">
        <span className="absolute inset-[-35%] -z-10 bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--rauxa-electric)_32%,transparent)_0%,transparent_100%)]" />
        <m.span
          {...NOJS.reset}
          className="relative block w-full text-primary"
          initial={{ opacity: 0, scale: 0.25, rotate: -140 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          whileHover={{ rotate: 24, scale: 1.08 }}
          transition={{
            duration: 1.1,
            ease: EASE,
            delay: BURST_DELAY,
            opacity: { duration: 0.3, delay: BURST_DELAY },
          }}
        >
          <IsotypeIcon className="h-auto w-full" />
        </m.span>
      </span>
      <MaskReveal delay={0.12}>4</MaskReveal>
    </div>
  );
}
