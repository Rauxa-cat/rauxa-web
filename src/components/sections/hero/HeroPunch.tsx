'use client';

import { useEffect } from 'react';
import { animate, m, useMotionValue, type MotionStyle } from 'motion/react';
import { EASE, IGNITION } from '@/lib/motion';

// The halo is a blurred copy of the glyphs, drawn as a pseudo-element rather
// than a second span so the phrase appears once in the document, not twice.
export function HeroPunch({
  text,
  ignited,
}: {
  text: string;
  ignited: boolean;
}) {
  const wipe = useMotionValue('100%');
  const halo = useMotionValue(0);

  useEffect(() => {
    if (!ignited) return;

    // Neither a background position nor a blur is a transform, so
    // `reducedMotion: 'user'` cannot reach them: the preference is read here.
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const transition = reduce ? { duration: 0 } : { ...IGNITION, ease: EASE };

    const sweep = animate(wipe, '0%', transition);
    const bloom = animate(halo, 0.85, transition);

    return () => {
      sweep.stop();
      bloom.stop();
    };
  }, [ignited, wipe, halo]);

  return (
    <m.span
      data-text={text}
      style={{ backgroundPositionX: wipe, '--hero-halo': halo } as MotionStyle}
      className="relative block bg-[linear-gradient(96deg,var(--rauxa-electric)_0_46%,var(--rauxa-pearl)_54%_100%)] [background-size:240%_100%] [-webkit-background-clip:text] [background-clip:text] text-transparent before:absolute before:inset-0 before:-z-10 before:text-[var(--rauxa-electric)] before:opacity-[var(--hero-halo)] before:blur-[34px] before:content-[attr(data-text)]"
    >
      {text}
    </m.span>
  );
}
