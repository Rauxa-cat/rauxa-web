import {
  CONSENT_COOKIE,
  CONSENT_MAX_AGE,
  consentSignals,
  serializeConsent,
  type ConsentCategories,
} from './consent';
import { loadGtm } from '@/lib/analytics/gtm';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function storeConsent(categories: ConsentCategories) {
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${serializeConsent(categories)}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
}

export function signalConsent(
  next: ConsentCategories,
  previous: ConsentCategories,
) {
  // Only exists when GTM is configured; without it there is nobody to tell.
  window.gtag?.('consent', 'update', consentSignals(next));
  if (next.analytics && !previous.analytics) loadGtm();
}

const ANALYTICS_COOKIES = [/^_ga$/, /^_ga_/, /^_gid$/];

// GA writes its cookies on the widest domain they are
// allowed (`.rauxa.cat`), and an expiry only removes a cookie when it names
// the same domain, so every parent of the host is tried along with the host.
function domainsOf(hostname: string) {
  const labels = hostname.split('.');
  const parents = labels
    .slice(0, -1)
    .map((_, i) => `.${labels.slice(i).join('.')}`)
    .filter((domain) => domain.split('.').length > 2);
  return [undefined, ...parents];
}

export function clearAnalyticsCookies() {
  const names = document.cookie
    .split(';')
    .map((pair) => pair.split('=')[0].trim())
    .filter((name) => ANALYTICS_COOKIES.some((pattern) => pattern.test(name)));

  for (const name of names) {
    for (const domain of domainsOf(location.hostname)) {
      document.cookie = `${name}=; Path=/; Max-Age=0${domain ? `; Domain=${domain}` : ''}`;
    }
  }
}
