'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { HeroCTA } from './types';
import { ArrowIcon } from '@/components/icons/ArrowIcon';

interface HeroContentProps {
  eyebrow?: string;
  title: string;
  highlightedTitle?: string;
  subtitle?: string;
  ctas?: HeroCTA[];
  className?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

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
        'mx-auto flex min-h-[78svh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center',
        className,
      )}
    >
      {eyebrow && (
        <motion.p
          className="font-accent tracking-[0.35em] text-white/70  md:text-2xl"
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h1
        className="font-brand mt-6 text-4xl text-balance font-semibold leading-[1.05] text-white md:text-6xl"
        {...fadeInUp}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {title}
        {highlightedTitle && (
          <span className="block text-primary">{highlightedTitle}</span>
        )}
      </motion.h1>

      {subtitle && (
        <motion.p
          className="font-accent mt-6 max-w-2xl text-pretty leading-7 text-white/85 md:text-2xl md:leading-8"
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {subtitle}
        </motion.p>
      )}

      {ctas.length > 0 && (
        <motion.div
          className="mt-10 flex flex-col items-center gap-4 md:flex-row md:gap-6"
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {ctas.map((cta, index) => (
            <motion.div
              key={`${cta.href}-${cta.label}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                opacity: { duration: 0.4, delay: 0.8 + index * 0.1 },
                scale: { duration: 0.15, ease: 'easeOut' },
              }}
              whileHover={{
                scale: 1.05,
              }}
            >
              <Button
                asChild
                size="lg"
                variant={cta.variant ?? 'default'}
                className={cn(
                  'group h-12 min-w-35 rounded-none px-8 font-semibold transition-colors tracking-wide',
                  (cta.variant ?? 'default') === 'default' &&
                    'bg-primary hover:bg-primary',
                  cta.variant === 'outline' &&
                    'border-white/70 bg-transparent px-10 text-white hover:border-white hover:bg-white/15 hover:text-white',
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
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
