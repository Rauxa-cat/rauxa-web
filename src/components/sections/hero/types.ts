export interface HeroCTA {
  label: string;
  href: string;
  variant?: 'default' | 'outline';
  withArrow?: boolean;
  external?: boolean;
}

export interface HeroSectionProps {
  backgroundImage?: string;
  backgroundAlt?: string;

  eyebrow?: string;
  title: string;
  highlightedTitle?: string;
  subtitle?: string;

  ctas?: HeroCTA[];

  className?: string;
  contentClassName?: string;
}
