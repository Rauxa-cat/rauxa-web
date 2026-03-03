import { getTranslations } from 'next-intl/server';

export async function AnalyticsTools() {
  const t = await getTranslations('cookies');

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        {t('cookiesWeUse.analytics.title')}
      </h3>
      <p className="text-muted-foreground leading-relaxed mb-4">
        {t('cookiesWeUse.analytics.content')}
      </p>
      <ul className="space-y-3">
        <li className="flex gap-3">
          <span className="text-primary font-medium shrink-0">•</span>
          <div>
            <strong className="font-semibold">Vercel Analytics:</strong>{' '}
            <span className="text-muted-foreground">
              {t('cookiesWeUse.analytics.vercelAnalytics')}
            </span>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="text-primary font-medium shrink-0">•</span>
          <div>
            <strong className="font-semibold">Vercel Speed Insights:</strong>{' '}
            <span className="text-muted-foreground">
              {t('cookiesWeUse.analytics.vercelInsights')}
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}
