'use client';

import { createContext, use, useRef } from 'react';
import { m, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type ScrollOptions = NonNullable<Parameters<typeof useScroll>[0]>;

// Keyframes are spread evenly over the tracked progress, so `[a, b]` is a plain
// start/end ramp and `[a, b, c]` peaks at mid-viewport (the "passing by" shape).
type Keyframes<T> = readonly [T, T, ...T[]];

const SceneProgress = createContext<MotionValue<number> | null>(null);

const stops = (count: number) =>
  Array.from({ length: count }, (_, i) => i / (count - 1));

// Publishes one scroll progress for every layer underneath, so sibling layers
// (photo, halo, copy) stay locked to the same timeline instead of each measuring
// its own box and drifting apart.
export function ParallaxScene({
  children,
  className,
  offset = ['start start', 'end start'],
}: {
  children: React.ReactNode;
  className?: string;
  offset?: ScrollOptions['offset'];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });

  return (
    <div ref={ref} className={className}>
      <SceneProgress value={scrollYProgress}>{children}</SceneProgress>
    </div>
  );
}

// Scroll-linked transform layer. Inside a `ParallaxScene` it follows the scene's
// progress; standalone it tracks its own trip across the viewport — or across a
// horizontally scrollable `container` when `axis` is `x`.
export function ParallaxLayer({
  children,
  className,
  y,
  scale,
  opacity,
  offset = ['start end', 'end start'],
  container,
  axis,
}: {
  children: React.ReactNode;
  className?: string;
  y?: Keyframes<string | number>;
  scale?: Keyframes<number>;
  opacity?: Keyframes<number>;
  offset?: ScrollOptions['offset'];
  container?: ScrollOptions['container'];
  axis?: ScrollOptions['axis'];
}) {
  const reduce = useReducedMotion();
  const scene = use(SceneProgress);
  const ref = useRef<HTMLDivElement>(null);
  const self = useScroll({ target: ref, offset, container, axis });
  const progress =
    scene ?? (axis === 'x' ? self.scrollXProgress : self.scrollYProgress);

  const yValue = useTransform(progress, stops(y?.length ?? 2), [
    ...(y ?? [0, 0]),
  ]);
  const scaleValue = useTransform(progress, stops(scale?.length ?? 2), [
    ...(scale ?? [1, 1]),
  ]);
  const opacityValue = useTransform(progress, stops(opacity?.length ?? 2), [
    ...(opacity ?? [1, 1]),
  ]);

  // The preference is only known after hydration, so the layer always renders
  // the scroll-linked values first and then pins them to identity. Dropping the
  // `style` entries instead leaves the last transform stuck on the element:
  // Motion stops writing the value but never clears what it already wrote.
  return (
    <m.div
      ref={ref}
      className={className}
      style={{
        ...(y && { y: reduce ? 0 : yValue }),
        ...(scale && { scale: reduce ? 1 : scaleValue }),
        ...(opacity && { opacity: reduce ? 1 : opacityValue }),
      }}
    >
      {children}
    </m.div>
  );
}
