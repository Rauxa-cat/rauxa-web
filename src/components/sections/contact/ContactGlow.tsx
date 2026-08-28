'use client';

import { m } from 'motion/react';
import { ParallaxLayer } from '@/components/motion/Parallax';
import { EASE } from '@/lib/motion';

// Two passes on the same halo: it blooms open on load, then the outer layer
// sinks and dims as the page scrolls, on the section's own progress.
export function ContactGlow() {
  return (
    <ParallaxLayer
      className="pointer-events-none absolute top-16 left-0 h-105 w-225 max-w-full"
      offset={['start start', 'end start']}
      y={['0%', '35%']}
      scale={[1, 1.25]}
      opacity={[1, 0.15]}
    >
      <m.div
        aria-hidden
        className="h-full w-full [background:radial-gradient(ellipse_at_center,rgba(0,76,255,0.28)_0%,rgba(0,76,255,0.06)_46%,transparent_72%)]"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
      />
    </ParallaxLayer>
  );
}
