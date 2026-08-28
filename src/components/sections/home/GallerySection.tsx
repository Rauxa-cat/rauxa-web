import { getTranslations } from 'next-intl/server';
import { SectionHeader } from '../shared/SectionHeader';
import { SectionShell } from '../shared/SectionShell';
import { GalleryStrip, type GalleryFigure } from './GalleryStrip';

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

export async function GallerySection() {
  const t = await getTranslations('home.gallery');
  const alt = (n: number) => t('imageAlt', { n });

  const figure = (
    item: (typeof GALLERY_STRIP)[number],
    dims: Dims,
    i: number,
  ): GalleryFigure => ({
    id: item.id,
    alt: alt(i + 1),
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
        mobile={GALLERY_STRIP.filter((item) => item.m).map((item, i) =>
          figure(item, item.m!, i),
        )}
        desktop={GALLERY_STRIP.map((item, i) => figure(item, item.d, i))}
      />

      <div className="mx-auto mt-5 flex max-w-page items-center justify-end gap-4 px-6">
        <span
          className="h-px w-13.5 [background:linear-gradient(90deg,rgba(0,76,255,0),var(--rauxa-electric))]"
          aria-hidden
        />
        <span className="font-accent text-[19px] tracking-[0.3em] text-foreground/40">
          {t('drag')} →
        </span>
      </div>
    </SectionShell>
  );
}
