'use client';

import { m } from 'motion/react';
import { EASE, IGNITION } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const GRADIENT =
  'bg-[linear-gradient(96deg,var(--rauxa-electric)_0_46%,var(--rauxa-pearl)_54%_100%)] [background-size:240%_100%] [-webkit-background-clip:text] [background-clip:text] text-transparent';

// Clipped to the glyphs, the text has no colour of its own, so it disappears
// wherever the background layer does. Forced colours is the case that reaches
// real users.
const FORCED_COLORS =
  'forced-colors:bg-none forced-colors:[-webkit-background-clip:border-box] forced-colors:[background-clip:border-box] forced-colors:text-[CanvasText]';

// The halo is a real element and not a `::before` because generated content
// still reaches the accessibility tree, and `aria-hidden` is the only thing that
// stops the phrase being announced twice.
export function HeroPunch({
  text,
  ignited,
  delay = 0,
}: {
  text: string;
  ignited: boolean;
  delay?: number;
}) {
  // Neither a background position nor a blur is a transform, so
  // `reducedMotion: 'user'` cannot reach them: the preference is read here.
  // The delay goes too, since it waits out a reveal that snaps for that visitor.
  const reduce = useReducedMotion();
  const transition = reduce
    ? { duration: 0 }
    : { ...IGNITION, ease: EASE, delay };

  return (
    <span className="relative block">
      <m.span
        aria-hidden
        className="absolute inset-0 -z-10 block text-[var(--rauxa-electric)] blur-[34px] forced-colors:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: ignited ? 0.85 : 0 }}
        transition={transition}
      >
        {text}
      </m.span>
      <m.span
        className={`relative block ${GRADIENT} ${FORCED_COLORS}`}
        initial={{ backgroundPositionX: '100%' }}
        animate={{ backgroundPositionX: ignited ? '0%' : '100%' }}
        transition={transition}
      >
        {text}
      </m.span>
    </span>
  );
}
