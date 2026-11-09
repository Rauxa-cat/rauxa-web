import { getConsent } from '@/lib/consent/server';
import { ConsentProvider } from './ConsentProvider';

// Read on the server so a visitor who already chose never receives the banner,
// instead of getting it in the HTML and losing it at hydration.
export async function Consent({ children }: { children: React.ReactNode }) {
  const stored = await getConsent();
  const initial = stored && { analytics: stored.analytics };

  return <ConsentProvider initial={initial}>{children}</ConsentProvider>;
}
