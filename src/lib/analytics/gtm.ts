import {
  NO_CONSENT,
  consentSignals,
  type ConsentCategories,
} from '@/lib/consent/consent';

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const GTM_SRC = 'https://www.googletagmanager.com/gtm.js?id=';

// Has to reach the dataLayer before gtm.js does: GTM reads the defaults on
// Consent Initialization, and a tag that sees no consent state yet treats it
// as granted. gtm.js itself only loads once Análisis is granted (here for a
// stored choice, `loadGtm` for one made mid-visit), so its Initialization
// always sees the final state and tags fire there exactly once.
//
// Guarded so it can run more than once: a 404 is rendered in the browser,
// where React never executes the inline copy in the root layout, so the GTM
// script and `bootConsent` carry it as well.
export const consentScript = (stored: ConsentCategories | null) =>
  [
    'if(!window.gtag){',
    'window.dataLayer=window.dataLayer||[];',
    'window.gtag=function(){dataLayer.push(arguments);};',
    `gtag('consent','default',${JSON.stringify(consentSignals(NO_CONSENT))});`,
    stored &&
      `gtag('consent','update',${JSON.stringify(consentSignals(stored))});`,
    '}',
  ]
    .filter(Boolean)
    .join('\n');

export const gtmScript = (id: string) =>
  `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='${GTM_SRC}'+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`;

export function loadGtm() {
  if (!GTM_ID || document.querySelector(`script[src^="${GTM_SRC}"]`)) return;
  window.dataLayer?.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = GTM_SRC + GTM_ID;
  document.head.append(script);
}

// A script element created here runs on insertion, unlike one React renders.
export function bootConsent() {
  if (!GTM_ID || window.gtag) return;
  const script = document.createElement('script');
  script.textContent = consentScript(null);
  document.head.append(script);
}
