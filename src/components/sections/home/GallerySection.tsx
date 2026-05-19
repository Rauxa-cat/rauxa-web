import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { SectionShell } from '../shared/SectionShell';
import { SectionHeader } from '../shared/SectionHeader';

const GALLERY_IDS = [
  '_MG_4011',
  '_MG_4015',
  '_MG_4016',
  '_MG_4019',
  '_MG_4022',
  '_MG_4065',
  '_MG_4125',
  '_MG_4129',
  '_MG_4137',
  '_MG_4199',
  '_MG_4238',
  '_MG_4268',
  '_MG_4280',
  '_MG_4501',
  '_MG_4555',
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
        {GALLERY_IDS.map((id, i) => (
          <div key={id} className="gallery-item rounded-sm">
            <Image
              src={`/images/gallery/${id}-1600.webp`}
              alt={t('imageAlt', { n: i + 1 })}
              width={1600}
              height={1067}
              sizes="(max-width: 768px) 50vw, 33vw"
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
