import { NAV_ITEMS } from '@/lib/content/nav';
import { CONTACT } from '@/components/sections/contact/contact.constants';

export const FOOTER_NAV = NAV_ITEMS;

export const FOOTER_CONTACT = CONTACT;

export const FOOTER_LEGAL = [
  { href: '/privacidad', label: 'Privacidad' },
  { href: '/cookies', label: 'Cookies' },
  { href: '/aviso-legal', label: 'Aviso legal' },
] as const;

export const FOOTER_COPY =
  'Comunidad gastronómica y cultural. Experiencias donde la gastronomía, la música y el arte se encuentran.';
