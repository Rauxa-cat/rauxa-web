import { headers } from 'next/headers';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const locale = headersList.get('x-next-intl-locale') ?? 'es';

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={[
        rauxaPrimary.variable,
        rauxaSecondary.variable,
        rauxaBody.variable,
      ].join(' ')}
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
