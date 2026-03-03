import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata, PageProps } from '@/lib/metadata';
import { LegalSection } from '@/components/sections/shared/LegalSection';
import { LegalHeader } from '@/components/sections/shared/LegalHeader';
import { CompanyInfo } from '@/components/sections/shared/CompanyInfo';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale,
    namespace: 'metadata.legal',
    path: { es: '/aviso-legal', ca: '/avis-legal' },
  });
}

export default async function LegalNoticePage() {
  const t = await getTranslations('legal-notice');

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <LegalHeader title={t('title')} intro={t('intro')} />

      <div className="mt-12 space-y-12">
        <LegalSection title={t('ownership.title')}>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {t('ownership.intro')}
          </p>
          <CompanyInfo />
        </LegalSection>

        <LegalSection title={t('purpose.title')}>
          <p className="text-muted-foreground leading-relaxed">
            {t('purpose.content')}
          </p>
        </LegalSection>

        <LegalSection title={t('terms.title')}>
          <p className="text-muted-foreground leading-relaxed">
            {t('terms.content')}
          </p>
        </LegalSection>

        <LegalSection title={t('intellectualProperty.title')}>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {t('intellectualProperty.content1')}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {t('intellectualProperty.content2')}
          </p>
        </LegalSection>

        <LegalSection title={t('liability.title')}>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {t('liability.content1')}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {t('liability.content2')}
          </p>
        </LegalSection>

        <LegalSection title={t('links.title')}>
          <p className="text-muted-foreground leading-relaxed">
            {t('links.content')}
          </p>
        </LegalSection>

        <LegalSection title={t('applicable.title')}>
          <p className="text-muted-foreground leading-relaxed">
            {t('applicable.content')}
          </p>
        </LegalSection>

        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground">{t('lastUpdated')}</p>
        </div>
      </div>
    </div>
  );
}
