import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { HeroCTA } from './types';

interface HeroContentProps {
  eyebrow?: string;
  title: string;
  highlightedTitle?: string;
  subtitle?: string;
  ctas?: HeroCTA[];
  className?: string;
}

export function HeroContent({
  eyebrow,
  title,
  highlightedTitle,
  subtitle,
  ctas = [],
  className,
}: HeroContentProps) {
  return (
    <div
      className={cn(
        'mx-auto flex min-h-[78vh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className="font-accent tracking-[0.35em] text-white/70  md:text-2xl">
          {eyebrow}
        </p>
      )}

      <h1 className="font-brand mt-6 text-5xl font-semibold leading-[1.05] text-white md:text-7xl">
        {title}
        {highlightedTitle && (
          <span className="block text-primary">{highlightedTitle}</span>
        )}
      </h1>

      {subtitle && (
        <p className="font-accent mt-6 max-w-2xl leading-7 text-white/75 md:text-2xl md:leading-8">
          {subtitle}
        </p>
      )}

      {ctas.length > 0 && (
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          {ctas.map((cta) => (
            <Button
              key={`${cta.href}-${cta.label}`}
              asChild
              size="lg"
              variant={cta.variant ?? 'default'}
              className={cn(
                'h-12 min-w-35 rounded-none px-8 font-semibold',
                (cta.variant ?? 'default') === 'default' &&
                  'bg-white/95 text-black hover:bg-white',
                cta.variant === 'outline' &&
                  'border-white/70 bg-transparent px-10 text-white hover:bg-white/10 hover:text-white',
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
                  {cta.withArrow && (
                    <span aria-hidden className="text-lg leading-none">
                      →
                    </span>
                  )}
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
