import { getTranslations } from 'next-intl/server';
import { COVERMANAGER } from '@/lib/content/lab';

// What the booking frame on /rauxa-lab stores when it loads, as observed on the
// live page. Update it if CoverManager starts loading other providers.
const PROVIDERS = [
  { name: 'CoverManager', key: 'coverManager' },
  { name: 'Stripe', key: 'stripe' },
  { name: 'New Relic', key: 'newRelic' },
] as const;

export async function ThirdPartyCookies() {
  const t = await getTranslations('cookies.cookiesWeUse.thirdParty');

  return (
    <div className="mt-8">
      <h3 className="font-sans text-xl font-semibold mb-4">{t('title')}</h3>
      <p className="text-muted-foreground leading-relaxed mb-4">
        {t('content')}
      </p>
      <ul className="space-y-3">
        {PROVIDERS.map(({ name, key }) => (
          <li key={key} className="flex gap-3">
            <span className="text-primary font-medium shrink-0">•</span>
            <div>
              <strong className="font-semibold">{name}:</strong>{' '}
              <span className="text-muted-foreground">{t(key)}</span>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-muted-foreground leading-relaxed mt-4">
        {t.rich('more', {
          link: (chunks) => (
            <a
              href={COVERMANAGER.cookiesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-4"
            >
              {chunks}
            </a>
          ),
        })}
      </p>
    </div>
  );
}
