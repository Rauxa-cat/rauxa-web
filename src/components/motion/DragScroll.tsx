'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

// Keeps native horizontal scroll (touch, wheel, keyboard — accessible) and adds mouse
// click-and-drag to scroll on top, so the "drag" affordance works with a pointer too.
export function DragScroll({
  children,
  className,
  scrollRef,
}: {
  children: React.ReactNode;
  className?: string;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const fallbackRef = useRef<HTMLDivElement>(null);
  const ref = scrollRef ?? fallbackRef;
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return; // touch keeps native scrolling
    const el = ref.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
    };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!drag.current.active || !el) return;
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    ref.current?.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={cn(
        'cursor-grab touch-pan-x select-none active:cursor-grabbing',
        className,
      )}
    >
      {children}
    </div>
  );
}
