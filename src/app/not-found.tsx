import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { SiteHeader } from '@/components/site/Header';
import { Footer } from '@/components/site/footer/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { NotFoundSection } from '@/components/sections/not-found/NotFoundSection';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('notFound');
  const tMeta = await getTranslations('metadata');
  return { title: `${t('metadata')} — ${tMeta('siteName')}` };
}

// Reached only by paths the proxy skips (anything with a dot), so it has no
// locale layout above it and mounts the providers that layout would.
export default async function RootNotFound() {
  const locale = await getLocale();

  return (
    <NextIntlClientProvider locale={locale}>
      <MotionProvider>
        <SiteHeader />
        <main>
          <NotFoundSection />
        </main>
        <Footer />
      </MotionProvider>
    </NextIntlClientProvider>
  );
}
