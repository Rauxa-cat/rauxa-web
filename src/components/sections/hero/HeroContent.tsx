import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { HeroBand, HeroCTA } from './types';
import { HeroBands } from './HeroBands';
import { HeroFade } from './HeroFade';
import { ParallaxLayer } from '@/components/motion/Parallax';
import { ArrowIcon } from '@/components/icons/ArrowIcon';

interface HeroContentProps {
  eyebrow?: string;
  bands: HeroBand[];
  subtitle?: string;
  ctas?: HeroCTA[];
  className?: string;
}

export function HeroContent({
  eyebrow,
  bands,
  subtitle,
  ctas = [],
  className,
}: HeroContentProps) {
  return (
    // Slightly faster than the page, so the copy separates from the photo on the way out.
    <ParallaxLayer
      className="relative z-10"
      y={['0%', '-4%', '-22%']}
      scale={[1, 0.99, 0.9]}
      opacity={[1, 0.9, 0]}
    >
      <div
        className={cn(
          'mx-auto flex min-h-svh w-full max-w-page flex-col justify-center px-6 pt-16 pb-16',
          className,
        )}
      >
        {eyebrow && (
          <HeroFade delay={0}>
            <p className="font-accent text-[clamp(0.85rem,1.3vw,1.3rem)] tracking-[0.35em] text-white/60">
              {eyebrow}
            </p>
          </HeroFade>
        )}

        <HeroBands bands={bands} />

        {subtitle && (
          <HeroFade delay={0.5}>
            <p className="font-accent mt-8 max-w-[34rem] text-[clamp(1rem,1.5vw,1.6rem)] leading-relaxed text-white/80">
              {subtitle}
            </p>
          </HeroFade>
        )}

        {ctas.length > 0 && (
          <HeroFade
            delay={0.62}
            className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:gap-5"
          >
            {ctas.map((cta) => (
              <Button
                key={`${cta.href}-${cta.label}`}
                asChild
                size="lg"
                variant={cta.variant ?? 'default'}
                className={cn(
                  'h-14 w-full rounded-none px-8 font-semibold tracking-wide sm:w-auto',
                  (cta.variant ?? 'default') === 'default' &&
                    'bg-[var(--rauxa-electric)] text-white shadow-[0_20px_54px_-14px_rgba(0,76,255,0.9)] hover:bg-[var(--rauxa-electric)]',
                  cta.variant === 'outline' &&
                    'border-white/50 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white',
                )}
              >
                {cta.external ? (
                  <a
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex items-center',
                      cta.withArrow && 'gap-3',
                    )}
                  >
                    {cta.label}
                    {cta.withArrow && <ArrowIcon animate />}
                  </a>
                ) : (
                  <Link
                    href={cta.href}
                    className={cn(
                      'inline-flex items-center',
                      cta.withArrow && 'gap-3',
                    )}
                  >
                    {cta.label}
                    {cta.withArrow && (
                      <span aria-hidden className="text-lg leading-none">
                        →
                      </span>
                    )}
                  </Link>
                )}
              </Button>
            ))}
          </HeroFade>
        )}
      </div>
    </ParallaxLayer>
  );
}
