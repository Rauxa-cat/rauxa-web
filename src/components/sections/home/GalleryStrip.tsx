'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'motion/react';
import { DragScroll } from '@/components/motion/DragScroll';
import { ParallaxLayer } from '@/components/motion/Parallax';
import { cn } from '@/lib/utils';

export type GalleryFigure = {
  id: string;
  alt: string;
  w: number;
  h: number;
  mt: number;
  overlay?: boolean;
};

// Per-figure speed. Neighbours sit deliberately far apart so the strip reads as
// several lanes travelling at different rates instead of one block sliding.
const LANE_SPEED = [1, 0.45, 0.85, 0.6, 0.95, 0.5, 0.75];

// The photo is oversized inside its frame and drifts within it, so the frame
// itself never moves and nothing is ever clipped by the scroller. `ZOOM` sets the
// slack: at 1.35 the photo can travel ±13% of the frame before an edge shows.
const ZOOM = 'scale-135';
const PAGE_DRIFT = 8.5;
const STRIP_DRIFT = 4;

function GalleryFig({
  item,
  index,
  damp,
  container,
}: {
  item: GalleryFigure;
  index: number;
  damp: number;
  container: React.RefObject<HTMLDivElement | null>;
}) {
  const reduce = useReducedMotion();
  const speed = LANE_SPEED[index % LANE_SPEED.length] * damp;
  const page = `${PAGE_DRIFT * speed}%`;
  const pageBack = `${-PAGE_DRIFT * speed}%`;
  // Alternating sign: adjacent lanes pull apart as the strip is dragged.
  const strip = STRIP_DRIFT * speed * (index % 2 === 0 ? 1 : -1);

  return (
    <div
      className="relative shrink-0"
      style={{ width: item.w, height: item.h, marginTop: item.mt }}
    >
      {/* Frame: recedes and dims away from mid-viewport, so the strip reads as
          cards at different depths rather than one flat row. */}
      <ParallaxLayer
        className="absolute inset-0 overflow-hidden"
        scale={[1 - 0.18 * speed, 1, 1 - 0.1 * speed]}
        opacity={[1 - 0.6 * speed, 1, 1 - 0.35 * speed]}
      >
        <div className={cn('absolute inset-0', !reduce && ZOOM)}>
          <ParallaxLayer
            className="absolute inset-0"
            y={[page, '0%', pageBack]}
          >
            <ParallaxLayer
              className="absolute inset-0"
              container={container}
              axis="x"
              y={[`${strip}%`, `${-strip}%`]}
            >
              <Image
                src={`/images/gallery/${item.id}-1600.webp`}
                alt={item.alt}
                fill
                draggable={false}
                sizes="(max-width: 768px) 55vw, 380px"
                className="object-cover"
              />
            </ParallaxLayer>
          </ParallaxLayer>
        </div>
        {item.overlay && (
          <div
            className="absolute inset-0 [background:linear-gradient(180deg,rgba(0,76,255,0.42)_0%,rgba(10,10,13,0.2)_100%)]"
            aria-hidden
          />
        )}
      </ParallaxLayer>
    </div>
  );
}

function GalleryRow({
  items,
  className,
  container,
  damp = 1,
}: {
  items: GalleryFigure[];
  className: string;
  container: React.RefObject<HTMLDivElement | null>;
  damp?: number;
}) {
  return (
    <div className={className}>
      {items.map((item, i) => (
        <GalleryFig
          key={item.id}
          item={item}
          index={i}
          damp={damp}
          container={container}
        />
      ))}
    </div>
  );
}

export function GalleryStrip({
  mobile,
  desktop,
}: {
  mobile: GalleryFigure[];
  desktop: GalleryFigure[];
}) {
  const container = useRef<HTMLDivElement>(null);

  return (
    <DragScroll
      scrollRef={container}
      className="mt-10 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {/* Mobile: cropped strip of four. */}
      <GalleryRow
        items={mobile}
        container={container}
        damp={0.8}
        className="flex h-90 w-max items-start gap-3 pr-6 md:hidden"
      />

      {/* Desktop: full strip of seven. */}
      <GalleryRow
        items={desktop}
        container={container}
        className="hidden h-150 w-max items-start gap-4.5 pr-6 md:flex"
      />
    </DragScroll>
  );
}
