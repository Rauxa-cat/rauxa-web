import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { SectionHeader } from '../shared/SectionHeader';
import { DragScroll } from '@/components/motion/DragScroll';

type Dims = { w: number; h: number; mt: number };

// Single source; each item carries mobile (`m`, first four) and desktop (`d`) dimensions.
const GALLERY_STRIP: {
  id: string;
  m?: Dims;
  d: Dims;
  overlay?: boolean;
}[] = [
  {
    id: '_MG_4011',
    m: { w: 180, h: 260, mt: 0 },
    d: { w: 300, h: 420, mt: 0 },
  },
  {
    id: '_MG_4015',
    m: { w: 140, h: 200, mt: 120 },
    d: { w: 240, h: 340, mt: 200 },
  },
  {
    id: '_MG_4016',
    m: { w: 200, h: 280, mt: 60 },
    d: { w: 340, h: 470, mt: 70 },
    overlay: true,
  },
  {
    id: '_MG_4019',
    m: { w: 130, h: 130, mt: 200 },
    d: { w: 220, h: 220, mt: 330 },
  },
  { id: '_MG_4022', d: { w: 380, h: 280, mt: 140 } },
  { id: '_MG_4065', d: { w: 260, h: 380, mt: 210 } },
  { id: '_MG_4125', d: { w: 300, h: 420, mt: 30 } },
];

function GalleryFig({
  id,
  dims,
  overlay,
  alt,
}: {
  id: string;
  dims: Dims;
  overlay?: boolean;
  alt: string;
}) {
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{ width: dims.w, height: dims.h, marginTop: dims.mt }}
    >
      <Image
        src={`/images/gallery/${id}-1600.webp`}
        alt={alt}
        fill
        draggable={false}
        sizes="(max-width: 768px) 55vw, 380px"
        className="object-cover"
      />
      {overlay && (
        <div
          className="absolute inset-0 [background:linear-gradient(180deg,rgba(0,76,255,0.42)_0%,rgba(10,10,13,0.2)_100%)]"
          aria-hidden
        />
      )}
    </div>
  );
}

export async function GallerySection() {
  const t = await getTranslations('home.gallery');
  const alt = (n: number) => t('imageAlt', { n });

  return (
    <section className="bg-background pt-24 pb-28 md:pt-32">
      <SectionHeader
        className="mx-auto max-w-page px-6"
        hairline
        size="lg"
        eyebrow={t('eyebrow')}
        title={
          <>
            {t('title')}{' '}
            <span className="text-primary [text-shadow:0_0_60px_rgba(0,76,255,0.55)]">
              {t('titleHighlight')}
            </span>
          </>
        }
      />

      <DragScroll className="mt-10 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Mobile: cropped strip of four. */}
        <div className="flex h-90 w-max items-start gap-3 pr-6 md:hidden">
          {GALLERY_STRIP.filter((item) => item.m).map((item, i) => (
            <GalleryFig
              key={item.id}
              id={item.id}
              dims={item.m!}
              overlay={item.overlay}
              alt={alt(i + 1)}
            />
          ))}
        </div>

        {/* Desktop: full strip of seven. */}
        <div className="hidden h-150 w-max items-start gap-4.5 pr-6 md:flex">
          {GALLERY_STRIP.map((item, i) => (
            <GalleryFig
              key={item.id}
              id={item.id}
              dims={item.d}
              overlay={item.overlay}
              alt={alt(i + 1)}
            />
          ))}
        </div>
      </DragScroll>

      <div className="mx-auto mt-5 flex max-w-page items-center justify-end gap-4 px-6">
        <span
          className="h-px w-13.5 [background:linear-gradient(90deg,rgba(0,76,255,0),var(--rauxa-electric))]"
          aria-hidden
        />
        <span className="font-accent text-[19px] tracking-[0.3em] text-foreground/40">
          {t('drag')} →
        </span>
      </div>
    </section>
  );
}
