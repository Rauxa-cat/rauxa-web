import {
  consentCookie,
  consentSignals,
  type ConsentCategories,
} from './consent';
import { bootConsent, loadGtm } from '@/lib/analytics/gtm';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Written here so the very next request, a reload included, already carries
// it. Safari caps a cookie written from script at 7 days, though, so the
// server sets it again to make the 12 months stick.
export function storeConsent(categories: ConsentCategories) {
  document.cookie = consentCookie(categories, location.protocol === 'https:');
  fetch('/api/consent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categories),
    keepalive: true,
  }).catch(() => {});
}

export function signalConsent(
  next: ConsentCategories,
  previous: ConsentCategories,
) {
  bootConsent();
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
