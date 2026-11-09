import { cookies } from 'next/headers';
import { CONSENT_COOKIE, parseConsent } from './consent';

export async function getConsent() {
  const store = await cookies();
  return parseConsent(store.get(CONSENT_COOKIE)?.value);
}
