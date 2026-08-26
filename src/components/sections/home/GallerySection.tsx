import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { SectionHeader } from '../shared/SectionHeader';

const GALLERY_STRIP = [
  { id: '_MG_4011', w: 300, h: 420, mt: 0 },
  { id: '_MG_4015', w: 240, h: 340, mt: 200 },
  { id: '_MG_4016', w: 340, h: 470, mt: 70, overlay: true },
  { id: '_MG_4019', w: 220, h: 220, mt: 330 },
  { id: '_MG_4022', w: 380, h: 280, mt: 140 },
  { id: '_MG_4065', w: 260, h: 380, mt: 210 },
  { id: '_MG_4125', w: 300, h: 420, mt: 30 },
];

export async function GallerySection() {
  const t = await getTranslations('home.gallery');

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

      <div className="mt-10 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex h-150 w-max items-start gap-4.5 pr-6">
          {GALLERY_STRIP.map(({ id, w, h, mt, overlay }, i) => (
            <div
              key={id}
              className="relative shrink-0 overflow-hidden"
              style={{ width: w, height: h, marginTop: mt }}
            >
              <Image
                src={`/images/gallery/${id}-1600.webp`}
                alt={t('imageAlt', { n: i + 1 })}
                fill
                sizes="(max-width: 768px) 60vw, 380px"
                className="object-cover"
              />
              {overlay && (
                <div
                  className="absolute inset-0 [background:linear-gradient(180deg,rgba(0,76,255,0.42)_0%,rgba(10,10,13,0.2)_100%)]"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>
      </div>

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
