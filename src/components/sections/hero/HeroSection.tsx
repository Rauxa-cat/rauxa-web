import { cn } from '@/lib/utils';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import type { HeroSectionProps } from './types';

export function HeroSection({
  background,
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
    <section className={cn('relative isolate min-h-svh', className)}>
      <HeroBackground src={background} alt={backgroundAlt} />
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
