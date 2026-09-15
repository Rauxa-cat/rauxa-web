'use client';

import { m } from 'motion/react';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/utils';

export const IMPACT = 0.26;

const DRAW_START = 0.06;
const DRAW_DURATION = IMPACT - DRAW_START;
const VIEWBOX_HEIGHT = 800;

const MAIN_CHANNEL =
  'M58 0L44 58L66 104L36 172L62 226L30 300L58 352L42 428L80 494L52 566L74 626L48 700L66 752L60 800';

const FORKS = [
  { d: 'M36 172L14 214L22 244L2 290', rootY: 172 },
  { d: 'M80 494L104 526L96 556L118 600', rootY: 494 },
];

function Channel({
  d,
  delay,
  duration,
  width,
}: {
  d: string;
  delay: number;
  duration: number;
  width: number;
}) {
  const draw = {
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { delay, duration, ease: 'linear' },
  } as const;

  return (
    <>
      <m.path
        {...draw}
        d={d}
        stroke="var(--rauxa-electric)"
        strokeOpacity={0.55}
        strokeWidth={width * 4}
      />
      <m.path
        {...draw}
        d={d}
        stroke="var(--rauxa-blue-100)"
        strokeWidth={width}
      />
    </>
  );
}

// Full viewport height behind the panel, so the strike reads on any screen and
// the panel materialises on top of it.
export function LightningBolt() {
  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 [filter:drop-shadow(0_0_6px_var(--rauxa-electric))_drop-shadow(0_0_24px_var(--rauxa-electric))]"
      animate={{ opacity: [1, 0.2, 0.9, 0] }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ delay: IMPACT, duration: 0.6, times: [0, 0.25, 0.45, 1] }}
    >
      <svg
        viewBox={`0 0 120 ${VIEWBOX_HEIGHT}`}
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        className="h-svh w-[15svh]"
      >
        <Channel
          d={MAIN_CHANNEL}
          delay={DRAW_START}
          duration={DRAW_DURATION}
          width={2.2}
        />
        {FORKS.map((fork) => (
          <Channel
            key={fork.d}
            d={fork.d}
            delay={DRAW_START + (fork.rootY / VIEWBOX_HEIGHT) * DRAW_DURATION}
            duration={0.09}
            width={1.4}
          />
        ))}
      </svg>
    </m.div>
  );
}

export function ElectricFlash() {
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
      transition={{ delay: IMPACT, duration: 1.1, ease: EASE }}
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
        delay: IMPACT,
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
        delay: IMPACT + delay,
        duration,
        ease: 'linear',
        opacity: { delay: IMPACT + delay, duration: 0.05 },
      }}
    />
  ));
}
