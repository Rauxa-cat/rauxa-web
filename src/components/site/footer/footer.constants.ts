import { NAV_ITEMS } from '@/lib/content/nav';
import { CONTACT } from '@/components/sections/contact/contact.constants';

export const FOOTER_NAV = NAV_ITEMS;

export const FOOTER_CONTACT = CONTACT;

export const FOOTER_LEGAL = [
  { href: '/privacy' },
  { href: '/cookies' },
  { href: '/legal-notice' },
] as const;
