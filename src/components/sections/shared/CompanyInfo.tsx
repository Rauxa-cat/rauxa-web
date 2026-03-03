import { getTranslations } from 'next-intl/server';

export async function CompanyInfo() {
  const t = await getTranslations('company');

  return (
    <ul className="space-y-1 text-muted-foreground">
      <li>
        <strong>{t('name')}:</strong> Carles Serrano Biosca
      </li>
      <li>
        <strong>{t('nif')}:</strong> 48102691P
      </li>
      <li>
        <strong>{t('address')}:</strong> Valldaura 60, Sant Cugat del Vallès
      </li>
      <li>
        <strong>{t('email')}:</strong> cserranobiosca@gmail.com
      </li>
    </ul>
  );
}
