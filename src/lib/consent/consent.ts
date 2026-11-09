export const CONSENT_COOKIE = 'rauxa_consent';

// Bump it when the categories or the vendors behind them change: a stored
// choice with another version counts as undecided and the banner comes back.
export const CONSENT_VERSION = 1;

export const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

// Analytics only: the site runs no ad tags (no Meta pixel, no Google Ads
// conversions or remarketing). Adding one means a new category here and a
// bumped CONSENT_VERSION, so everyone is asked again.
export type ConsentCategories = { analytics: boolean };

export type StoredConsent = ConsentCategories & {
  version: number;
  date: string;
};

export const NO_CONSENT: ConsentCategories = { analytics: false };
export const ALL_CONSENT: ConsentCategories = { analytics: true };

export function parseConsent(raw: string | undefined): StoredConsent | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(decodeURIComponent(raw));
    if (
      typeof value !== 'object' ||
      value === null ||
      !('version' in value) ||
      value.version !== CONSENT_VERSION
    ) {
      return null;
    }
    const { analytics, date } = value as Partial<StoredConsent>;
    return {
      version: CONSENT_VERSION,
      date: typeof date === 'string' ? date : '',
      analytics: analytics === true,
    };
  } catch {
    return null;
  }
}

export function serializeConsent(categories: ConsentCategories): string {
  const stored: StoredConsent = {
    version: CONSENT_VERSION,
    date: new Date().toISOString(),
    analytics: categories.analytics,
  };
  return encodeURIComponent(JSON.stringify(stored));
}

export const consentCookie = (categories: ConsentCategories, secure: boolean) =>
  `${CONSENT_COOKIE}=${serializeConsent(categories)}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${secure ? '; Secure' : ''}`;

export const consentSignals = ({ analytics }: ConsentCategories) =>
  ({
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  }) as const;
