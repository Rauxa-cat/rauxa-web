import { getTranslations } from 'next-intl/server';

const BROWSERS = [
  {
    name: 'Google Chrome',
    url: 'https://www.google.com/policies/technologies/cookies/',
  },
  {
    name: 'Mozilla Firefox',
    url: 'https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias',
  },
  {
    name: 'Microsoft Edge',
    url: 'https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09',
  },
  {
    name: 'Safari',
    url: 'https://support.apple.com/es-es/guide/safari/sfri11471/mac',
  },
];

export async function BrowserLinks() {
  const t = await getTranslations('cookies');

  return (
    <>
      <p className="text-muted-foreground leading-relaxed mb-4">
        {t('moreInfo.content')}
      </p>
      <ul className="space-y-2">
        {BROWSERS.map((browser) => (
          <li key={browser.name}>
            <a
              href={browser.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-4"
            >
              {browser.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
