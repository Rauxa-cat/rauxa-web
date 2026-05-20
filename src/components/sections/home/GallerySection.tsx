import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { SectionShell } from '../shared/SectionShell';
import { SectionHeader } from '../shared/SectionHeader';

const GALLERY_ITEMS = [
  { id: '_MG_4011', aspect: 'aspect-[3/4]' },
  { id: '_MG_4015', aspect: 'aspect-square' },
  { id: '_MG_4016', aspect: 'aspect-[3/4]' },
  { id: '_MG_4019', aspect: 'aspect-[4/5]' },
  { id: '_MG_4022', aspect: 'aspect-[4/3]' },
  { id: '_MG_4065', aspect: 'aspect-[2/3]' },
  { id: '_MG_4125', aspect: 'aspect-[3/4]' },
  { id: '_MG_4129', aspect: 'aspect-[4/3]' },
  { id: '_MG_4137', aspect: 'aspect-[3/4]' },
  { id: '_MG_4199', aspect: 'aspect-square' },
  { id: '_MG_4238', aspect: 'aspect-[4/5]' },
  { id: '_MG_4268', aspect: 'aspect-[3/4]' },
  { id: '_MG_4280', aspect: 'aspect-[4/3]' },
  { id: '_MG_4501', aspect: 'aspect-[3/4]' },
  { id: '_MG_4555', aspect: 'aspect-square' },
];

export async function GallerySection() {
  const t = await getTranslations('home.gallery');

  return (
    <SectionShell>
      <SectionHeader
        eyebrow={t('eyebrow')}
        title={
          <>
            {t('title')}{' '}
            <span className="text-primary">{t('titleHighlight')}</span>
          </>
        }
        className="mb-10"
      />

      <div className="gallery-masonry">
        {GALLERY_ITEMS.map(({ id, aspect }, i) => (
          <div
            key={id}
            className={`gallery-item rounded-sm relative ${aspect}`}
          >
            <Image
              src={`/images/gallery/${id}-1600.webp`}
              alt={t('imageAlt', { n: i + 1 })}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
