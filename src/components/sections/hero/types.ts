import type { AppHref } from '@/i18n/navigation';

type HeroCTACommon = {
  label: string;
  variant?: 'default' | 'outline';
  withArrow?: boolean;
};
interface HeroCTAExternal extends HeroCTACommon {
  external: true;
  href: string;
}

interface HeroCTAInternal extends HeroCTACommon {
  external?: false;
  href: AppHref;
}

export type HeroCTA = HeroCTAExternal | HeroCTAInternal;

// The three bands read as one continuous phrase: lead → bridge → punch.
// Nothing is ever inserted between them.
export type HeroBandVariant = 'lead' | 'bridge' | 'punch';

// `size: 'lg'` sets the punch at the lead's size. Only for a punch short enough
// to hold it, such as a name: a long one wraps.
export type HeroBand =
  | { text: string; variant: Exclude<HeroBandVariant, 'punch'> }
  | { text: string; variant: 'punch'; size?: 'lg' };

export interface HeroSectionProps {
  backgroundImage?: string;
  backgroundAlt?: string;

  eyebrow?: string;
  bands: HeroBand[];
  subtitle?: string;

  ctas?: HeroCTA[];

  className?: string;
  contentClassName?: string;
}
