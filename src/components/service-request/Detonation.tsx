'use client';

import { useState } from 'react';
import { m, useMotionValue, useTransform } from 'motion/react';
import { IsotypeIcon } from '@/components/icons/IsotypeIcon';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/utils';

export const IMPACT = 0.34;
// The panel lands a beat after the blast, so the two heaviest frames of the
// entrance do not fall on the same one.
export const PANEL = IMPACT + 0.08;

const BLAST = 0.45;
const TOTAL = IMPACT + BLAST;
const at = (seconds: number) => seconds / TOTAL;

// Hand-scattered rather than random so the burst reads the same on every open,
// and so render stays pure.
const SPARKS = [
  { angle: 4, reach: 340 },
  { angle: 31, reach: 260 },
  { angle: 55, reach: 380 },
  { angle: 83, reach: 220 },
  { angle: 108, reach: 320 },
  { angle: 134, reach: 280 },
  { angle: 160, reach: 400 },
  { angle: 187, reach: 250 },
  { angle: 211, reach: 360 },
  { angle: 238, reach: 230 },
  { angle: 262, reach: 330 },
  { angle: 289, reach: 270 },
  { angle: 313, reach: 390 },
  { angle: 338, reach: 240 },
];
// Every other spark, still spread evenly around the burst.
const PHONE_SPARKS = SPARKS.filter((_, i) => i % 2 === 0);

const CORE = 160;
const WAVE_FROM = 0.5;
const WAVE_TO = 6;

// Each growing layer is laid out at its largest size and scaled *down*, with
// `will-change`, so it is rasterised once. Scaled up from its resting size,
// Chrome repaints the SVG and the gradient at every new scale, and on a phone
// that repaint is what stalled the frame of the impact.
const centred =
  'absolute top-1/2 left-1/2 -translate-1/2 will-change-transform';

// Centred on the viewport, which is where the panel lands.
export function Blast() {
  // Motion drives each element from the main thread, which is what a low-end
  // phone runs short of. The blast only mounts on a tap, never on the server, so
  // reading the viewport at mount cannot mismatch a hydrated tree.
  const [phone] = useState(() => !matchMedia('(min-width: 640px)').matches);
  const sparks = phone ? PHONE_SPARKS : SPARKS;
  const waves = phone ? [0] : [0, 0.08];
  // A phone screen is covered well before 8x, and every step past that is fill.
  const peak = phone ? 4.5 : 8;
  const s = (visual: number) => visual / peak;

  const scale = useMotionValue(0);
  // Read off the scale rather than timed on its own: Motion hands opacity to the
  // compositor and runs scale on the main thread, and the two drift apart far
  // enough that the core used to fade out before it had grown.
  const opacity = useTransform(
    scale,
    [0, s(0.3), s(0.6), s(3), 1],
    [0, 1, 1, 0.8, 0],
  );

  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
    >
      {/* Never a `drop-shadow` here: a filter is recomputed every frame at the scaled size. */}
      <m.div
        className={cn(centred, 'text-primary')}
        style={{ scale, opacity, width: CORE * peak }}
        initial={{ rotate: -30 }}
        animate={{
          scale: [0, s(0.5), s(0.44), s(0.6), 1],
          rotate: [-30, 0, -9, 7, -4, 30],
        }}
        transition={{
          duration: TOTAL,
          scale: {
            duration: TOTAL,
            times: [0, at(0.12), at(0.2), at(IMPACT), 1],
            ease: ['backOut', 'easeInOut', 'easeIn', 'easeOut'],
          },
          rotate: {
            duration: TOTAL,
            times: [0, at(0.12), at(0.18), at(0.25), at(IMPACT), 1],
          },
        }}
      >
        <span className="absolute -inset-1/2 bg-[radial-gradient(closest-side,--alpha(var(--color-primary)/60%),transparent)]" />
        <IsotypeIcon className="relative w-full" />
      </m.div>

      {waves.map((lag) => (
        <m.div
          key={lag}
          className={cn(centred, 'text-rauxa-blue-100')}
          style={{ width: CORE * WAVE_TO }}
          initial={{ scale: WAVE_FROM / WAVE_TO, opacity: 0 }}
          animate={{ scale: 1, opacity: [0, 1, 0] }}
          transition={{ delay: IMPACT + lag, duration: 0.8, ease: EASE }}
        >
          <IsotypeIcon outline className="w-full" />
        </m.div>
      ))}

      {sparks.map(({ angle, reach }) => (
        <span
          key={angle}
          className="absolute top-1/2 left-1/2 size-0"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <m.span
            className="block h-0.5 w-20 origin-left rounded-full bg-rauxa-blue-100 shadow-[0_0_8px_var(--rauxa-electric)]"
            initial={{ x: 20, scaleX: 0.2, opacity: 0 }}
            animate={{ x: reach, scaleX: [0.2, 1, 0.3], opacity: [0, 1, 0] }}
            transition={{ delay: IMPACT, duration: 0.6, ease: EASE }}
          />
        </span>
      ))}
    </m.div>
  );
}

export function BlastFlash() {
  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,--alpha(var(--color-primary)/55%),transparent_70%)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{
        delay: IMPACT - 0.04,
        duration: 0.9,
        times: [0, 0.12, 1],
        ease: 'easeOut',
      }}
    />
  );
}

export function PanelGlow() {
  return (
    <m.div
      aria-hidden
      className="pointer-events-none absolute -inset-x-16 -inset-y-16 bg-[radial-gradient(closest-side,--alpha(var(--color-primary)/45%),transparent)]"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ delay: PANEL, duration: 1.1, ease: EASE }}
    />
  );
}

export function PanelFlicker() {
  return (
    <m.div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-rauxa-blue-300/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.1, 0.6, 0] }}
      transition={{
        delay: PANEL,
        duration: 0.55,
        times: [0, 0.12, 0.3, 0.45, 1],
      }}
    />
  );
}

const EDGES = [
  {
    className: 'top-0 right-1/2 h-px w-1/2 origin-right',
    axis: 'scaleX',
    delay: 0,
    duration: 0.14,
  },
  {
    className: 'top-0 left-1/2 h-px w-1/2 origin-left',
    axis: 'scaleX',
    delay: 0,
    duration: 0.14,
  },
  {
    className: 'top-0 left-0 h-full w-px origin-top',
    axis: 'scaleY',
    delay: 0.12,
    duration: 0.3,
  },
  {
    className: 'top-0 right-0 h-full w-px origin-top',
    axis: 'scaleY',
    delay: 0.12,
    duration: 0.3,
  },
  {
    className: 'bottom-0 left-0 h-px w-1/2 origin-left',
    axis: 'scaleX',
    delay: 0.4,
    duration: 0.16,
  },
  {
    className: 'bottom-0 right-0 h-px w-1/2 origin-right',
    axis: 'scaleX',
    delay: 0.4,
    duration: 0.16,
  },
] as const;

export function ChargedFrame() {
  return EDGES.map(({ className, axis, delay, duration }) => (
    <m.span
      key={className}
      aria-hidden
      className={cn(
        'pointer-events-none absolute bg-blue-ink shadow-[0_0_12px_var(--color-primary)]',
        className,
      )}
      initial={{ [axis]: 0, opacity: 0 }}
      animate={{ [axis]: 1, opacity: 1 }}
      transition={{
        delay: PANEL + delay,
        duration,
        ease: 'linear',
        opacity: { delay: PANEL + delay, duration: 0.05 },
      }}
    />
  ));
}
