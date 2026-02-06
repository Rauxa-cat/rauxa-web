import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/site/footer/Footer';
import { Toaster } from 'sonner';

const rauxaPrimary = localFont({
  src: './fonts/AlfredinoSemirounded.ttf',
  variable: '--font-rauxa-primary',
  display: 'swap',
});

const rauxaSecondary = localFont({
  src: './fonts/VT323-Regular.ttf',
  variable: '--font-rauxa-secondary',
  display: 'swap',
});

const rauxaBody = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-rauxa-body-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RAUXA',
  description:
    'Rauxa es una comunidad gastronómica y cultural que crea experiencias donde la gastronomía, la música y el arte se encuentran. Barcelona.',

  openGraph: {
    type: 'website',
    siteName: 'RAUXA',
    title: 'RAUXA',
    description:
      'Experiencias gastronómicas y culturales donde se unen gastronomía, música y arte.',
    // sin images
  },

  twitter: {
    card: 'summary',
    title: 'RAUXA',
    description:
      'Experiencias gastronómicas y culturales donde se unen gastronomía, música y arte.',
    // sin images
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={[
          rauxaPrimary.variable,
          rauxaSecondary.variable,
          rauxaBody.variable,
          'antialiased',
        ].join(' ')}
      >
        {children}
        <Toaster position="top-right" richColors />
        <Footer />
      </body>
    </html>
  );
}
