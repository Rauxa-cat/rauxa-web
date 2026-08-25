import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { HeroBand, HeroBandVariant, HeroCTA } from './types';
import { ArrowIcon } from '@/components/icons/ArrowIcon';

interface HeroContentProps {
  eyebrow?: string;
  bands: HeroBand[];
  subtitle?: string;
  ctas?: HeroCTA[];
  className?: string;
}

const bandVariant: Record<HeroBandVariant, string> = {
  lead: 'text-white text-[clamp(1.7rem,8.7vw,8.5rem)]',
  bridge: 'text-white/50 text-[clamp(0.9rem,3.95vw,3.87rem)] leading-[0.92]',
  punch:
    'text-[var(--rauxa-electric)] text-[clamp(1.42rem,7.1vw,7.1rem)] [text-shadow:0_0_90px_rgba(0,76,255,0.6)]',
};

export function HeroContent({
  eyebrow,
  bands,
  subtitle,
  ctas = [],
  className,
}: HeroContentProps) {
  return (
    <div
      className={cn(
        'relative z-10 mx-auto flex min-h-svh w-full max-w-page flex-col justify-center px-6 pt-16 pb-16',
        className,
      )}
    >
      {eyebrow && (
        <p className="font-accent text-[clamp(0.85rem,1.3vw,1.3rem)] tracking-[0.35em] text-white/60">
          {eyebrow}
        </p>
      )}

      <h1 className="font-brand mt-6 font-normal tracking-[-0.012em]">
        {bands.map((band, i) => (
          <span
            key={i}
            className={cn(
              'block leading-[0.82] whitespace-pre-line',
              bandVariant[band.variant],
            )}
          >
            {band.text}
          </span>
        ))}
      </h1>

      {subtitle && (
        <p className="font-accent mt-8 max-w-[34rem] text-[clamp(1rem,1.5vw,1.6rem)] leading-relaxed text-white/80">
          {subtitle}
        </p>
      )}

      {ctas.length > 0 && (
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:gap-5">
          {ctas.map((cta) => (
            <Button
              key={`${cta.href}-${cta.label}`}
              asChild
              size="lg"
              variant={cta.variant ?? 'default'}
              className={cn(
                'h-14 rounded-none px-8 font-semibold tracking-wide',
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
        </div>
      )}
    </div>
  );
}
