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

export interface HeroSectionProps {
  background?: string;
  backgroundAlt?: string;

  eyebrow?: string;
  title: string;
  highlightedTitle?: string;
  subtitle?: string;

  ctas?: HeroCTA[];

  className?: string;
  contentClassName?: string;
}
