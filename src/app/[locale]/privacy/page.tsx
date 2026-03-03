import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata, PageProps } from '@/lib/metadata';
import { LegalHeader } from '@/components/sections/shared/LegalHeader';
import { LegalSection } from '@/components/sections/shared/LegalSection';
import { CompanyInfo } from '@/components/sections/shared/CompanyInfo';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale,
    namespace: 'metadata.privacy',
    path: { es: '/privacidad', ca: '/privacitat' },
  });
}

export default async function PrivacyPage() {
  const t = await getTranslations('privacy');

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <LegalHeader title={t('title')} intro={t('intro')} />

      <div className="mt-12 space-y-12">
        <LegalSection title={t('responsible.title')}>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {t('responsible.intro')}
          </p>
          <CompanyInfo />
        </LegalSection>

        <LegalSection title={t('dataCollected.title')}>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {t('dataCollected.intro')}
          </p>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>
              <strong>{t('dataCollected.contact.title')}:</strong>{' '}
              {t('dataCollected.contact.content')}
            </li>
            <li>
              <strong>{t('dataCollected.typeform.title')}:</strong>{' '}
              {t('dataCollected.typeform.content')}
            </li>
          </ul>
        </LegalSection>

        <LegalSection title={t('purpose.title')}>
          <p className="text-muted-foreground leading-relaxed mb-3">
            {t('purpose.intro')}
          </p>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>{t('purpose.point1')}</li>
            <li>{t('purpose.point2')}</li>
            <li>{t('purpose.point3')}</li>
          </ul>
        </LegalSection>

        <LegalSection title={t('legal.title')}>
          <p className="text-muted-foreground leading-relaxed">
            {t('legal.content')}
          </p>
        </LegalSection>

        <LegalSection title={t('retention.title')}>
          <p className="text-muted-foreground leading-relaxed">
            {t('retention.content')}
          </p>
        </LegalSection>

        <LegalSection title={t('recipients.title')}>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {t('recipients.intro')}
          </p>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>
              <strong>Typeform:</strong> {t('recipients.typeform')}
            </li>
            <li>
              <strong>Vercel:</strong> {t('recipients.vercel')}
            </li>
          </ul>
        </LegalSection>

        <LegalSection title={t('rights.title')}>
          <p className="text-muted-foreground leading-relaxed mb-3">
            {t('rights.intro')}
          </p>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>
              <strong>{t('rights.access')}:</strong> {t('rights.accessDesc')}
            </li>
            <li>
              <strong>{t('rights.rectification')}:</strong>{' '}
              {t('rights.rectificationDesc')}
            </li>
            <li>
              <strong>{t('rights.deletion')}:</strong>{' '}
              {t('rights.deletionDesc')}
            </li>
            <li>
              <strong>{t('rights.opposition')}:</strong>{' '}
              {t('rights.oppositionDesc')}
            </li>
            <li>
              <strong>{t('rights.portability')}:</strong>{' '}
              {t('rights.portabilityDesc')}
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            {t('rights.contact')}
          </p>
        </LegalSection>

        <LegalSection title={t('security.title')}>
          <p className="text-muted-foreground leading-relaxed">
            {t('security.content')}
          </p>
        </LegalSection>

        <LegalSection title={t('updates.title')}>
          <p className="text-muted-foreground leading-relaxed">
            {t('updates.content')}
          </p>
        </LegalSection>

        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground">{t('lastUpdated')}</p>
        </div>
      </div>
    </div>
  );
}
