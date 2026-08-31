'use client';

import { useState } from 'react';
import { m } from 'motion/react';
import { cn } from '@/lib/utils';
import { maskTransition } from '@/lib/motion';
import { HeroPunch } from './HeroPunch';
import type { HeroBand, HeroBandVariant } from './types';

// Mobile needs a bigger floor (~60/46/50 at 390px); the desktop scale kicks in at lg.
const bandVariant: Record<HeroBandVariant, string> = {
  lead: 'text-white text-[clamp(2.75rem,15vw,4.5rem)] lg:text-[clamp(1.7rem,8.7vw,8.5rem)]',
  bridge:
    'text-white/60 leading-[0.92] text-[clamp(2rem,11.8vw,3.4rem)] lg:text-[clamp(0.9rem,3.95vw,3.87rem)]',
  punch:
    'text-[clamp(2.4rem,12.8vw,3.6rem)] lg:text-[clamp(1.42rem,7.1vw,6.7rem)]',
};

export function HeroBands({ bands }: { bands: HeroBand[] }) {
  const [ignited, setIgnited] = useState(false);

  return (
    <h1 className="font-brand mt-6 font-normal tracking-[-0.012em]">
      {bands.map((band, i) => (
        <span
          key={i}
          className={cn(
            'block',
            // The halo has to bloom past the reveal mask, so the clip is only
            // held while the band is still rising.
            band.variant === 'punch' && ignited
              ? 'overflow-visible'
              : 'overflow-hidden',
          )}
        >
          <m.span
            className={cn(
              'block leading-[0.82] whitespace-pre-line',
              bandVariant[band.variant],
            )}
            initial={{ opacity: 0, y: '110%' }}
            animate={{ opacity: 1, y: 0 }}
            transition={maskTransition(i * 0.12)}
            onAnimationComplete={
              band.variant === 'punch' ? () => setIgnited(true) : undefined
            }
          >
            {band.variant === 'punch' ? (
              <HeroPunch text={band.text} ignited={ignited} />
            ) : (
              band.text
            )}
          </m.span>
        </span>
      ))}
    </h1>
  );
}
