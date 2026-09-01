import { cn } from '@/lib/utils';
import { ParallaxScene } from '@/components/motion/Parallax';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import { HeroHoldProvider } from './HeroHold';
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
    <section>
      <ParallaxScene
        className={cn(
          'relative isolate min-h-svh overflow-hidden bg-[var(--rauxa-black)]',
          className,
        )}
      >
        <HeroHoldProvider>
          <HeroBackground src={backgroundImage} alt={backgroundAlt} />
          <HeroContent
            eyebrow={eyebrow}
            bands={bands}
            subtitle={subtitle}
            ctas={ctas}
            className={contentClassName}
          />
        </HeroHoldProvider>
      </ParallaxScene>
    </section>
  );
}
