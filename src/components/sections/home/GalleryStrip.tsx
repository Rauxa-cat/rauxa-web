'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  m,
  transform,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';
import { GalleryPhoto, galleryImage, type GalleryFigure } from './GalleryPhoto';
import { GalleryStaticStrip } from './GalleryStaticStrip';

export type { GalleryFigure };

type Progress = MotionValue<number>;
type Viewport = { w: number; h: number };

const STEP_SVH = 62;

// The first and last slice of the progress move nothing, so the pin can catch
// and release without a jerk at either end.
const DEAD = 0.08;

// One shared frame rather than each photo's own proportions, so the spacing
// stays even down the strip; the pictures are cropped to it.
const CARD = { ratio: 0.8, max: 480, ofWidth: 0.78, ofHeight: 0.66 };
const STEP_RATIO = 520 / 480;

const FALLBACK: Viewport = { w: 1440, h: 900 };

// Five stops, not three: a three-stop ramp clamps everything past the
// neighbour at its end value, leaving seven ghosts parked across the stage.
const CARD_OPACITY = [0, 0.32, 1, 0.32, 0];
const CARD_SCALE = [0.76, 0.76, 1, 0.76, 0.76];
const BACKDROP_OPACITY = [0, 0, 0.34, 0, 0];

const STAGE_VEIL =
  '[background:linear-gradient(180deg,rgba(10,10,13,0.94)_0%,rgba(10,10,13,0.72)_34%,rgba(10,10,13,0.86)_100%)]';
const STAGE_GLOW =
  '[background:radial-gradient(ellipse_900px_520px_at_50%_58%,rgba(0,76,255,0.16)_0%,rgba(0,76,255,0)_70%)]';

const CARD_SIZES = '(max-width: 768px) 78vw, 480px';

// Every layer reads this, so they hold still together at the ends instead of
// each easing on its own.
const active = (p: number) =>
  Math.min(Math.max((p - DEAD) / (1 - DEAD * 2), 0), 1);

// A transformer function, never an input range: given a range Motion delegates
// to a native scroll timeline, which does not resolve inside a sticky container
// and leaves the animation parked on its last frame.
const ramp = (stops: number[], outputs: number[]) => {
  const at = transform(stops, outputs);
  return (p: number) => at(active(p));
};

const slotsFor = (index: number, count: number) => {
  const slot = 1 / Math.max(count - 1, 1);
  return [-2, -1, 0, 1, 2].map((d) => (index + d) * slot);
};

const sizeOf = ({ w, h }: Viewport) => {
  const width = Math.min(
    w * CARD.ofWidth,
    h * CARD.ofHeight * CARD.ratio,
    CARD.max,
  );
  return { width, height: width / CARD.ratio, step: width * STEP_RATIO };
};

// The 800px variant is deliberate: blurring the 1600px one costs on every
// frame for detail the blur throws away.
function BackdropLayer({
  item,
  index,
  count,
  progress,
}: {
  item: GalleryFigure;
  index: number;
  count: number;
  progress: Progress;
}) {
  const opacity = useTransform(
    progress,
    ramp(slotsFor(index, count), BACKDROP_OPACITY),
  );

  return (
    <m.div className="absolute -inset-16" style={{ opacity }}>
      <Image
        src={galleryImage(item.id, 800)}
        alt=""
        fill
        sizes="100vw"
        className="object-cover blur-[26px] saturate-[0.7]"
      />
    </m.div>
  );
}

function GalleryCard({
  item,
  index,
  count,
  progress,
  size,
}: {
  item: GalleryFigure;
  index: number;
  count: number;
  progress: Progress;
  size: ReturnType<typeof sizeOf>;
}) {
  const slots = slotsFor(index, count);
  const opacity = useTransform(progress, ramp(slots, CARD_OPACITY));
  const scale = useTransform(progress, ramp(slots, CARD_SCALE));
  // So the centre photo covers the ones reaching across it from either side.
  const zIndex = useTransform(progress, (p) =>
    Math.round(10 - Math.abs(active(p) * (count - 1) - index)),
  );

  // The slot offset rides on the margins rather than on `x`, leaving the
  // transform free for `scale` alone; both writing to it would fight.
  return (
    <m.div
      className="absolute top-1/2 left-1/2 overflow-hidden"
      style={{
        width: size.width,
        height: size.height,
        marginLeft: index * size.step - size.width / 2,
        marginTop: -size.height / 2,
        opacity,
        scale,
        zIndex,
      }}
    >
      <GalleryPhoto item={item} sizes={CARD_SIZES} />
    </m.div>
  );
}

export function GalleryStrip({
  mobile,
  desktop,
}: {
  mobile: GalleryFigure[];
  desktop: GalleryFigure[];
}) {
  const reduce = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState<Viewport | null>(null);

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ['start start', 'end end'],
  });

  useLayoutEffect(() => {
    const measure = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // `reduce` is false on the server, so the swap has to wait for mount or the
  // hydrated tree disagrees with the served one. A measured viewport doubles as
  // that mount signal.
  const still = viewport !== null && reduce;
  const size = sizeOf(viewport ?? FALLBACK);

  const rowX = useTransform(
    scrollYProgress,
    ramp([0, 1], [0, -(desktop.length - 1) * size.step]),
  );

  // The track element stays mounted either way: useScroll holds a ref to it, and
  // swapping it out mid-life leaves that ref pointing at nothing.
  return (
    <div
      ref={track}
      className={cn('relative', still && 'overflow-x-auto')}
      style={
        still
          ? undefined
          : { height: `calc(100svh + ${desktop.length * STEP_SVH}svh)` }
      }
    >
      {still ? (
        <div className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <GalleryStaticStrip
            items={mobile}
            gap={12}
            className="flex md:hidden"
          />
          <GalleryStaticStrip
            items={desktop}
            gap={18}
            className="hidden md:flex"
          />
        </div>
      ) : (
        <div className="sticky top-0 h-svh overflow-hidden">
          <div className="absolute inset-0 overflow-hidden" aria-hidden>
            {desktop.map((item, i) => (
              <BackdropLayer
                key={item.id}
                item={item}
                index={i}
                count={desktop.length}
                progress={scrollYProgress}
              />
            ))}
            <div className={cn('absolute inset-0', STAGE_VEIL)} />
            <div className={cn('absolute inset-0', STAGE_GLOW)} />
          </div>

          <m.div className="absolute inset-0" style={{ x: rowX }}>
            {desktop.map((item, i) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={i}
                count={desktop.length}
                progress={scrollYProgress}
                size={size}
              />
            ))}
          </m.div>
        </div>
      )}
    </div>
  );
}
