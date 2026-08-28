import { getTranslations } from 'next-intl/server';
import { SectionHeader } from '../shared/SectionHeader';
import { SectionShell } from '../shared/SectionShell';
import { GalleryStrip, type GalleryFigure } from './GalleryStrip';

type Dims = { w: number; h: number; mt: number };

// `m` and `mt` are read only by the reduced-motion strip; the pinned scene
// takes just the order and sizes itself from the viewport.
const GALLERY_STRIP: {
  id: string;
  m: Dims;
  d: Dims;
  overlay?: boolean;
}[] = [
  {
    id: '_MG_4011',
    m: { w: 175, h: 245, mt: 0 },
    d: { w: 300, h: 420, mt: 0 },
  },
  {
    id: '_MG_4015',
    m: { w: 140, h: 198, mt: 88 },
    d: { w: 240, h: 340, mt: 150 },
  },
  {
    id: '_MG_4016',
    m: { w: 198, h: 274, mt: 23 },
    d: { w: 340, h: 470, mt: 40 },
    overlay: true,
  },
  {
    id: '_MG_4501',
    m: { w: 163, h: 221, mt: 99 },
    d: { w: 280, h: 380, mt: 170 },
  },
  {
    id: '_MG_4019',
    m: { w: 128, h: 128, mt: 151 },
    d: { w: 220, h: 220, mt: 260 },
  },
  {
    id: '_MG_4022',
    m: { w: 221, h: 163, mt: 64 },
    d: { w: 380, h: 280, mt: 110 },
  },
  {
    id: '_MG_4137',
    m: { w: 175, h: 233, mt: 17 },
    d: { w: 300, h: 400, mt: 30 },
    overlay: true,
  },
  {
    id: '_MG_4065',
    m: { w: 151, h: 221, mt: 82 },
    d: { w: 260, h: 380, mt: 140 },
  },
  {
    id: '_MG_4125',
    m: { w: 175, h: 245, mt: 12 },
    d: { w: 300, h: 420, mt: 20 },
  },
];

export async function GallerySection() {
  const t = await getTranslations('home.gallery');

  const figure = (
    item: (typeof GALLERY_STRIP)[number],
    dims: Dims,
    i: number,
  ): GalleryFigure => ({
    id: item.id,
    alt: t('imageAlt', { n: i + 1 }),
    overlay: item.overlay,
    ...dims,
  });

  return (
    <SectionShell className="pb-28">
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

      <GalleryStrip
        mobile={GALLERY_STRIP.map((item, i) => figure(item, item.m, i))}
        desktop={GALLERY_STRIP.map((item, i) => figure(item, item.d, i))}
      />
    </SectionShell>
  );
}
