'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type BookingFrameProps = {
  src: string;
  title: string;
  className?: string;
};

// CoverManager ships iframe-resizer's child script (v3) in its booking page,
// so the host half is all it takes for the frame to follow each booking step
// instead of scrolling inside itself. v5 no longer talks to that child.
export function BookingFrame({ src, title, className }: BookingFrameProps) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;

    let cancelled = false;
    let detach: (() => void) | undefined;

    let height = iframe.offsetHeight;

    // Picking a time in the slot list, which runs past 2000px on a phone, swaps
    // it for a form a fraction of that height. The page keeps its scroll, so
    // the form would sit above the viewport and the visitor would be left
    // looking at the section below.
    const followShrink = () => {
      const shrank = iframe.offsetHeight < height;
      height = iframe.offsetHeight;
      const { top, bottom } = iframe.getBoundingClientRect();
      if (!shrank || top >= 0 || bottom >= window.innerHeight) return;

      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      iframe.scrollIntoView({
        block: 'start',
        behavior: reduce ? 'auto' : 'smooth',
      });
    };

    import('iframe-resizer').then(({ iframeResize }) => {
      if (cancelled) return;
      const [frame] = iframeResize({ onResized: followShrink }, iframe);
      detach = () => frame.iFrameResizer.removeListeners();
    });

    return () => {
      cancelled = true;
      detach?.();
    };
  }, [src]);

  return (
    // The scheme has to follow the theme: Firefox derives the booking page's
    // prefers-color-scheme from it, which is what drives the dark half of the
    // CSS we host in CoverManager. Chrome reads the visitor's OS instead.
    <iframe
      ref={ref}
      src={src}
      title={title}
      loading="lazy"
      className={cn(
        'block w-full scroll-mt-20 border-0 scheme-light dark:scheme-dark',
        className,
      )}
    />
  );
}
