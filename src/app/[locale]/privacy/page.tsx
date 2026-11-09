import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata, PageProps } from '@/lib/metadata';
import { Link } from '@/i18n/navigation';
import { LegalHeader } from '@/components/sections/shared/LegalHeader';
import {
  LEGAL_LINK,
  LegalSection,
} from '@/components/sections/shared/LegalSection';
import { CompanyInfo } from '@/components/sections/shared/CompanyInfo';
import { COVERMANAGER } from '@/lib/content/lab';
import { CONTACT } from '@/lib/content/contact';

const TREATMENTS = ['forms', 'booking', 'hosting', 'analytics'] as const;

const TREATMENT_FIELDS = ['data', 'purpose', 'basis', 'retention'] as const;

const RECIPIENTS = [
  { name: 'Brevo', key: 'brevo' },
  { name: 'Upstash', key: 'upstash' },
  { name: 'Vercel', key: 'vercel' },
  { name: 'Google', key: 'google' },
  { name: 'CoverManager', key: 'coverManager' },
] as const;

const RIGHTS = [
  'access',
  'rectification',
  'deletion',
  'opposition',
  'limitation',
  'portability',
  'withdrawal',
] as const;

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

  const richLinks = {
    cookies: (chunks: React.ReactNode) => (
      <Link href="/cookies" className={LEGAL_LINK}>
        {chunks}
      </Link>
    ),
    coverManager: (chunks: React.ReactNode) => (
      <a
        href={COVERMANAGER.privacyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={LEGAL_LINK}
      >
        {chunks}
      </a>
    ),
    email: (chunks: React.ReactNode) => (
      <a href={`mailto:${CONTACT.email}`} className={LEGAL_LINK}>
        {chunks}
      </a>
    ),
    aepd: (chunks: React.ReactNode) => (
      <a
        href="https://www.aepd.es"
        target="_blank"
        rel="noopener noreferrer"
        className={LEGAL_LINK}
      >
        {chunks}
      </a>
    ),
  };

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

        <LegalSection title={t('treatments.title')}>
          <p className="text-muted-foreground leading-relaxed">
            {t('treatments.intro')}
          </p>
          {TREATMENTS.map((treatment) => (
            <div key={treatment} className="mt-8">
              <h3 className="font-sans text-xl font-semibold mb-3">
                {t(`treatments.${treatment}.title`)}
              </h3>
              <dl className="space-y-2 text-muted-foreground leading-relaxed">
                {TREATMENT_FIELDS.map((field) => (
                  <div key={field}>
                    <dt className="inline font-semibold text-foreground">
                      {t(`treatments.fields.${field}`)}:
                    </dt>{' '}
                    <dd className="inline">
                      {t.rich(`treatments.${treatment}.${field}`, richLinks)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </LegalSection>

        <LegalSection title={t('recipients.title')}>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {t('recipients.intro')}
          </p>
          <ul className="space-y-3 text-muted-foreground leading-relaxed">
            {RECIPIENTS.map(({ name, key }) => (
              <li key={key}>
                <strong className="font-semibold text-foreground">
                  {name}:
                </strong>{' '}
                {t.rich(`recipients.${key}`, richLinks)}
              </li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection title={t('transfers.title')}>
          <p className="text-muted-foreground leading-relaxed">
            {t('transfers.content')}
          </p>
        </LegalSection>

        <LegalSection title={t('rights.title')}>
          <p className="text-muted-foreground leading-relaxed mb-3">
            {t('rights.intro')}
          </p>
          <ul className="space-y-2 text-muted-foreground leading-relaxed">
            {RIGHTS.map((right) => (
              <li key={right}>
                <strong className="font-semibold text-foreground">
                  {t(`rights.${right}.label`)}:
                </strong>{' '}
                {t(`rights.${right}.content`)}
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            {t.rich('rights.contact', richLinks)}
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            {t.rich('rights.complaint', richLinks)}
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
