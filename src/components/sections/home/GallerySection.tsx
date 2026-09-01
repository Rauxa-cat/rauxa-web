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
}[] = [
  {
    id: '_MG_4199',
    m: { w: 175, h: 262, mt: 0 },
    d: { w: 300, h: 450, mt: 0 },
  },
  {
    id: '_MG_4011',
    m: { w: 140, h: 210, mt: 88 },
    d: { w: 240, h: 360, mt: 150 },
  },
  {
    id: '_MG_4016',
    m: { w: 198, h: 297, mt: 23 },
    d: { w: 340, h: 510, mt: 40 },
  },
  {
    id: '_MG_4125',
    m: { w: 128, h: 192, mt: 151 },
    d: { w: 220, h: 330, mt: 260 },
  },
  {
    id: '_MG_4280',
    m: { w: 163, h: 244, mt: 64 },
    d: { w: 280, h: 420, mt: 110 },
  },
  {
    id: '_MG_4268',
    m: { w: 151, h: 226, mt: 17 },
    d: { w: 260, h: 390, mt: 30 },
  },
  {
    id: '_MG_4555',
    m: { w: 175, h: 262, mt: 99 },
    d: { w: 300, h: 450, mt: 170 },
  },
  {
    id: '_MG_4129',
    m: { w: 140, h: 210, mt: 35 },
    d: { w: 240, h: 360, mt: 60 },
  },
  {
    id: '_MG_4137',
    m: { w: 186, h: 279, mt: 82 },
    d: { w: 320, h: 480, mt: 140 },
  },
  {
    id: '_MG_4501',
    m: { w: 151, h: 226, mt: 12 },
    d: { w: 260, h: 390, mt: 20 },
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
            <span className="text-primary [text-shadow:0_0_60px_--alpha(var(--color-primary)/55%)]">
              {t('titleHighlight')}
            </span>
          </>
        }
      />

      <GalleryStrip
        label={t('stripLabel')}
        mobile={GALLERY_STRIP.map((item, i) => figure(item, item.m, i))}
        desktop={GALLERY_STRIP.map((item, i) => figure(item, item.d, i))}
      />
    </SectionShell>
  );
}
