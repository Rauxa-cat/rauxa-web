// Inventoried in Chromium on 2026-11-09: a fresh visit, Análisis granted, and
// Análisis rejected followed by «Reservar» on /rauxa-lab. Re-run that check
// whenever a tag is added to GTM or CoverManager changes what its frame loads.
export type CookieOwner =
  | 'own'
  | 'google'
  | 'coverManager'
  | 'stripe'
  | 'newRelic';
export type CookieStorage = 'cookie' | 'local' | 'session';

export type CookieEntry = {
  name: string;
  owner: CookieOwner;
  storage: CookieStorage;
  key: string;
  duration: string;
};

export const COOKIE_GROUPS = [
  {
    key: 'technical',
    cookies: [
      {
        name: 'rauxa_consent',
        owner: 'own',
        storage: 'cookie',
        key: 'consent',
        duration: 'months12',
      },
      {
        name: 'rauxa_locale',
        owner: 'own',
        storage: 'cookie',
        key: 'locale',
        duration: 'months12',
      },
    ],
  },
  {
    key: 'analytics',
    cookies: [
      {
        name: '_ga',
        owner: 'google',
        storage: 'cookie',
        key: 'ga',
        duration: 'years2',
      },
      {
        // The GA4 measurement ID (G-NL6WN66QM9) without its `G-`; it changes
        // with the GA4 property the GTM tag sends to.
        name: '_ga_NL6WN66QM9',
        owner: 'google',
        storage: 'cookie',
        key: 'gaSession',
        duration: 'years2',
      },
    ],
  },
  {
    key: 'booking',
    cookies: [
      {
        name: 'PHPSESSID',
        owner: 'coverManager',
        storage: 'cookie',
        key: 'coverManagerSession',
        duration: 'days14',
      },
      {
        name: 'NRBA_SESSION',
        owner: 'newRelic',
        storage: 'local',
        key: 'newRelic',
        duration: 'hours4',
      },
      {
        name: 'm',
        owner: 'stripe',
        storage: 'cookie',
        key: 'stripe',
        duration: 'years2',
      },
      {
        name: '_ab, _mf, id',
        owner: 'stripe',
        storage: 'session',
        key: 'stripeSession',
        duration: 'tab',
      },
    ],
  },
] as const satisfies readonly {
  key: string;
  cookies: readonly CookieEntry[];
}[];
