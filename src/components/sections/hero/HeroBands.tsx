'use client';

import { useEffect, useState } from 'react';
import { m } from 'motion/react';
import { cn } from '@/lib/utils';
import { MASK_DURATION, STAGGER_GAP, maskTransition, NOJS } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { HeroPunch } from './HeroPunch';
import { useHeroHeld } from './HeroHold';
import type { HeroBand, HeroBandVariant } from './types';

const bandVariant: Record<HeroBandVariant, string> = {
  // The leading is what centres the bridge between the two bands, and it stops
  // at 1.3: accented caps fall back to a serif the reveal mask cuts below ~1.15.
  lead: 'text-white text-[clamp(2.75rem,15vw,4.5rem)] lg:text-[clamp(1.7rem,8.7vw,8.5rem)] leading-[1.3]',
  bridge:
    'text-white/60 text-[clamp(1.25rem,6.81vw,2.04rem)] lg:text-[clamp(0.9rem,3.95vw,3.87rem)] leading-[0.92]',
  punch:
    'text-[clamp(2.24rem,12.24vw,3.67rem)] lg:text-[clamp(1.42rem,7.1vw,6.7rem)]',
};

export function HeroBands({ bands }: { bands: HeroBand[] }) {
  const held = useHeroHeld();
  const reduce = useReducedMotion();
  const [unclipped, setUnclipped] = useState(false);

  // Timed off the reveal, never fired from the band's `onAnimationComplete`:
  // Motion re-binds that listener on every prop update, so the no-op animation
  // of a still-held band settles into the handler bound after the release and
  // lights the punch at t=0.
  const ignitionDelay =
    bands.findIndex((band) => band.variant === 'punch') * STAGGER_GAP +
    MASK_DURATION;

  useEffect(() => {
    if (held) return;
    const lift = setTimeout(
      () => setUnclipped(true),
      reduce ? 0 : ignitionDelay * 1000,
    );
    return () => clearTimeout(lift);
  }, [held, reduce, ignitionDelay]);

  return (
    <h1 className="font-brand mt-6 font-normal tracking-[-0.012em]">
      {bands.map((band, i) => (
        <span
          key={i}
          className={cn(
            'block',
            // The halo has to bloom past the reveal mask, so the clip is only
            // held while the band is still rising.
            band.variant === 'punch' && unclipped
              ? 'overflow-visible'
              : 'overflow-hidden',
          )}
        >
          <m.span
            {...NOJS.reset}
            className={cn(
              'block whitespace-pre-line',
              bandVariant[band.variant],
            )}
            initial={{ opacity: 0, y: '110%' }}
            animate={held ? { opacity: 0, y: '110%' } : { opacity: 1, y: 0 }}
            transition={maskTransition(i * STAGGER_GAP)}
          >
            {band.variant === 'punch' ? (
              <HeroPunch
                text={band.text}
                ignited={!held}
                delay={ignitionDelay}
              />
            ) : (
              band.text
            )}
          </m.span>
        </span>
      ))}
    </h1>
  );
}
