import { getTranslations } from 'next-intl/server';

export async function CookiesTable() {
  const t = await getTranslations('cookies');

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">
        {t('cookiesWeUse.essential.title')}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-semibold">
                {t('table.name')}
              </th>
              <th className="text-left py-3 px-4 font-semibold">
                {t('table.purpose')}
              </th>
              <th className="text-left py-3 px-4 font-semibold">
                {t('table.duration')}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-4 px-4">
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  NEXT_LOCALE
                </code>
              </td>
              <td className="py-4 px-4 text-muted-foreground">
                {t('cookiesWeUse.essential.nextLocale')}
              </td>
              <td className="py-4 px-4 text-muted-foreground">
                {t('duration.1year')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
