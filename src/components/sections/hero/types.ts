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

export interface HeroBand {
  text: string;
  variant: HeroBandVariant;
}

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
