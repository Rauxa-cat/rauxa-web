'use client';

import { m } from 'motion/react';
import { cn } from '@/lib/utils';
import { maskTransition } from '@/lib/motion';
import type { HeroBand, HeroBandVariant } from './types';

// Mobile needs a bigger floor (~60/46/50 at 390px); the desktop scale kicks in at lg.
const bandVariant: Record<HeroBandVariant, string> = {
  lead: 'text-white text-[clamp(2.75rem,15vw,4.5rem)] lg:text-[clamp(1.7rem,8.7vw,8.5rem)]',
  bridge:
    'text-white/50 leading-[0.92] text-[clamp(2rem,11.8vw,3.4rem)] lg:text-[clamp(0.9rem,3.95vw,3.87rem)]',
  punch:
    'text-[var(--rauxa-electric)] [text-shadow:0_0_90px_rgba(0,76,255,0.6)] text-[clamp(2.4rem,12.8vw,3.6rem)] lg:text-[clamp(1.42rem,7.1vw,6.7rem)]',
};

export function HeroBands({ bands }: { bands: HeroBand[] }) {
  return (
    <h1 className="font-brand mt-6 font-normal tracking-[-0.012em]">
      {bands.map((band, i) => (
        <span key={i} className="block overflow-hidden">
          <m.span
            className={cn(
              'block leading-[0.82] whitespace-pre-line',
              bandVariant[band.variant],
            )}
            initial={{ opacity: 0, y: '110%' }}
            animate={{ opacity: 1, y: 0 }}
            transition={maskTransition(i * 0.12)}
          >
            {band.text}
          </m.span>
        </span>
      ))}
    </h1>
  );
}
