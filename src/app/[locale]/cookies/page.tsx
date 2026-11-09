import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata, PageProps } from '@/lib/metadata';
import { LegalHeader } from '@/components/sections/shared/LegalHeader';
import {
  LEGAL_LINK,
  LegalSection,
} from '@/components/sections/shared/LegalSection';
import { CookiesTable } from '@/components/sections/cookies/CookiesTable';
import { BrowserLinks } from '@/components/sections/cookies/BrowserLinks';
import { CookieSettingsButton } from '@/components/consent/CookieSettingsButton';
import { buttonVariants } from '@/components/ui/button';
import { COOKIE_GROUPS } from '@/lib/content/cookies';
import { COVERMANAGER } from '@/lib/content/lab';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale,
    namespace: 'metadata.cookies',
    path: { es: '/cookies', ca: '/cookies' },
  });
}

export default async function CookiesPage() {
  const t = await getTranslations('cookies');

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <LegalHeader title={t('title')} intro={t('intro')} />

      <div className="mt-12 space-y-12">
        <LegalSection title={t('whatAreCookies.title')}>
          <p className="text-muted-foreground leading-relaxed">
            {t('whatAreCookies.content')}
          </p>
        </LegalSection>

        <LegalSection title={t('cookiesWeUse.title')}>
          <p className="text-muted-foreground leading-relaxed">
            {t('cookiesWeUse.intro')}
          </p>

          {COOKIE_GROUPS.map(({ key, cookies }) => (
            <div key={key} className="mt-10">
              <h3 className="font-sans text-xl font-semibold mb-3">
                {t(`groups.${key}.title`)}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.rich(`groups.${key}.content`, {
                  link: (chunks) => (
                    <a
                      href={COVERMANAGER.cookiesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={LEGAL_LINK}
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
              <CookiesTable group={key} cookies={cookies} />
            </div>
          ))}
        </LegalSection>

        <LegalSection title={t('transfers.title')}>
          <p className="text-muted-foreground leading-relaxed">
            {t('transfers.content')}
          </p>
        </LegalSection>

        <LegalSection title={t('consent.title')}>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {t('consent.content')}
          </p>
          <CookieSettingsButton className={buttonVariants()}>
            {t('consent.button')}
          </CookieSettingsButton>
        </LegalSection>

        <LegalSection title={t('browser.title')}>
          <BrowserLinks />
        </LegalSection>

        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground">{t('lastUpdated')}</p>
        </div>
      </div>
    </div>
  );
}
