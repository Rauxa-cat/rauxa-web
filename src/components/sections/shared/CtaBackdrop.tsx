'use client';

import { useRef } from 'react';
import { m, useScroll, useTransform, useMotionTemplate } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const STATIC_GRADIENT =
  'linear-gradient(112deg, var(--rauxa-blue-900) 0%, var(--rauxa-electric) 56%, var(--rauxa-blue-800) 100%)';

// The gradient rotates 112deg -> 128deg and the pearl halo rises as the band scrolls through.
export function CtaBackdrop() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const angle = useTransform(scrollYProgress, [0, 1], [112, 128]);
  const gradient = useMotionTemplate`linear-gradient(${angle}deg, var(--rauxa-blue-900) 0%, var(--rauxa-electric) 56%, var(--rauxa-blue-800) 100%)`;
  const haloY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <m.div
        className="absolute inset-0"
        style={
          reduce
            ? { backgroundImage: STATIC_GRADIENT }
            : { backgroundImage: gradient }
        }
      />
      <m.div
        className="absolute -top-40 -right-32 h-[660px] w-[660px] rounded-full bg-[radial-gradient(circle,rgba(247,244,239,0.17)_0%,rgba(247,244,239,0)_66%)]"
        style={{ y: reduce ? 0 : haloY }}
      />
    </div>
  );
}
