'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// No `autoPlay`: it would start from the served HTML, before the reduced-motion
// preference can be read. Playback starts here instead, and only while the clip
// is on screen, so a reduced-motion visitor keeps the poster.
export function BackdropVideo({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduce) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
