'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { NOJS } from '@/lib/motion';

const MapCanvas = dynamic(
  () => import('./MapCanvas').then((mod) => mod.MapCanvas),
  { ssr: false },
);

// maplibre-gl is by far the heaviest chunk on the site, so it is only fetched
// once the map is about to scroll into view.
export function LabMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        observer.disconnect();
      },
      { rootMargin: '400px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      {...NOJS.hide}
      className={cn(
        'relative isolate overflow-hidden rounded-lg border bg-muted',
        className,
      )}
    >
      {near && <MapCanvas />}
    </div>
  );
}
