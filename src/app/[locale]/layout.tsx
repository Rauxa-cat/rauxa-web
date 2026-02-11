import { NextIntlClientProvider } from 'next-intl';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SiteHeader } from '@/components/site/Header';
import { Footer } from '@/components/site/footer/Footer';
import { Toaster } from 'sonner';

export default async function localeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <>
      <NextIntlClientProvider locale={locale}>
        <SiteHeader />
        <main> {children} </main>
        <Footer />
        <Toaster position="top-right" richColors />
      </NextIntlClientProvider>
    </>
  );
}
