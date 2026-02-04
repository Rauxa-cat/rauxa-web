import { cn } from '@/lib/utils';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import type { HeroSectionProps } from './types';

export function HeroSection({
  backgroundImage,
  backgroundAlt = '',
  eyebrow,
  title,
  highlightedTitle,
  subtitle,
  ctas = [],
  className,
  contentClassName,
}: HeroSectionProps) {
  return (
    <section className={cn('relative isolate min-h-dvh', className)}>
      <HeroBackground src={backgroundImage} alt={backgroundAlt} />
      <HeroContent
        eyebrow={eyebrow}
        title={title}
        highlightedTitle={highlightedTitle}
        subtitle={subtitle}
        ctas={ctas}
        className={contentClassName}
      />
    </section>
  );
}
