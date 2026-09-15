import { cn } from '@/lib/utils';
import { GalleryPhoto, type GalleryFigure } from './GalleryPhoto';

const SIZES = '(max-width: 768px) 60vw, 380px';

// Reduced-motion fallback: pinning the section would hijack six screens of
// vertical scroll, which is the opposite of what that preference asks for.
export function GalleryStaticStrip({
  items,
  gap,
  className,
}: {
  items: GalleryFigure[];
  gap: number;
  className: string;
}) {
  return (
    <div className={cn('w-max items-start px-6', className)} style={{ gap }}>
      {items.map((item) => (
        <div
          key={item.id}
          className="relative shrink-0 overflow-hidden"
          style={{ width: item.w, height: item.h, marginTop: item.mt }}
        >
          <GalleryPhoto item={item} sizes={SIZES} />
        </div>
      ))}
    </div>
  );
}
