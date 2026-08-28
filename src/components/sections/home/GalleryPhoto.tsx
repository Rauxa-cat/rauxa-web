import Image from 'next/image';
import { cn } from '@/lib/utils';

export type GalleryFigure = {
  id: string;
  alt: string;
  w: number;
  h: number;
  mt: number;
  overlay?: boolean;
};

export const galleryImage = (id: string, width: 800 | 1600) =>
  `/images/gallery/${id}-${width}.webp`;

export function GalleryPhoto({
  item,
  sizes,
  className,
}: {
  item: GalleryFigure;
  sizes: string;
  className?: string;
}) {
  return (
    <>
      <Image
        src={galleryImage(item.id, 1600)}
        alt={item.alt}
        fill
        draggable={false}
        sizes={sizes}
        className={cn('object-cover', className)}
      />
      {item.overlay && (
        <div
          className="absolute inset-0 [background:linear-gradient(180deg,rgba(0,76,255,0.42)_0%,rgba(10,10,13,0.2)_100%)]"
          aria-hidden
        />
      )}
    </>
  );
}
