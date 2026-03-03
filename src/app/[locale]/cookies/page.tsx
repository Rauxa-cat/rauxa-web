import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata, PageProps } from '@/lib/metadata';
import { LegalHeader } from '@/components/sections/shared/LegalHeader';
import { LegalSection } from '@/components/sections/shared/LegalSection';
import { CookiesTable } from '@/components/sections/cookies/CookiesTable';
import { AnalyticsTools } from '@/components/sections/cookies/AnalyticsTools';
import { BrowserLinks } from '@/components/sections/cookies/BrowserLinks';

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
          <p className="text-muted-foreground leading-relaxed mb-8">
            {t('cookiesWeUse.intro')}
          </p>
          <CookiesTable />
          <AnalyticsTools />
        </LegalSection>

        <LegalSection title={t('disableCookies.title')}>
          <p className="text-muted-foreground leading-relaxed">
            {t('disableCookies.content')}
          </p>
        </LegalSection>

        <LegalSection title={t('moreInfo.title')}>
          <BrowserLinks />
        </LegalSection>

        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground">{t('lastUpdated')}</p>
        </div>
      </div>
    </div>
  );
}
