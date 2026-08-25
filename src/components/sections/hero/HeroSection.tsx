import { cn } from '@/lib/utils';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import type { HeroSectionProps } from './types';

export function HeroSection({
  backgroundImage,
  backgroundAlt = '',
  eyebrow,
  bands,
  subtitle,
  ctas = [],
  className,
  contentClassName,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative isolate min-h-svh overflow-hidden bg-[var(--rauxa-black)]',
        className,
      )}
    >
      <HeroBackground src={backgroundImage} alt={backgroundAlt} />
      <HeroContent
        eyebrow={eyebrow}
        bands={bands}
        subtitle={subtitle}
        ctas={ctas}
        className={contentClassName}
      />
    </section>
  );
}
