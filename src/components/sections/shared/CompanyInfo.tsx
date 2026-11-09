import { LEGAL_LINK } from './LegalSection';
import { getTranslations } from 'next-intl/server';
import { COMPANY } from '@/lib/content/company';
import { CONTACT } from '@/lib/content/contact';

export async function CompanyInfo({
  withRegistry = false,
}: {
  withRegistry?: boolean;
}) {
  const t = await getTranslations('company');

  return (
    <ul className="space-y-1 text-muted-foreground">
      <li>
        <strong>{t('name')}:</strong> {COMPANY.legalName}
      </li>
      <li>
        <strong>{t('taxId')}:</strong> {COMPANY.taxId}
      </li>
      <li>
        <strong>{t('address')}:</strong> {t('addressValue')}
      </li>
      {withRegistry && (
        <li>
          <strong>{t('registry')}:</strong> {t('registryValue')}
        </li>
      )}
      <li>
        <strong>{t('email')}:</strong>{' '}
        <a href={`mailto:${CONTACT.email}`} className={LEGAL_LINK}>
          {CONTACT.email}
        </a>
      </li>
    </ul>
  );
}
