import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';
import { ArrowIcon } from '@/components/icons/ArrowIcon';
import { RevealItem } from '@/components/motion/Reveal';
import { ParallaxLayer } from '@/components/motion/Parallax';
import { ServiceRequestTrigger } from '@/components/service-request/ServiceRequestTrigger';
import type { ServiceId } from '@/lib/content/services';
import { ActiveBar } from './ActiveBar';
import { RowIndex } from './RowIndex';

type ServiceRowSize = 'compact' | 'large';

const SIZES: Record<
  ServiceRowSize,
  { row: string; index: string; title: string; text: string }
> = {
  compact: {
    row: 'py-6 transition-[min-height] duration-300 md:min-h-30 md:py-0 md:group-hover:min-h-40',
    index: 'text-lg md:w-14 md:text-[22px]',
    title: 'text-[clamp(1.75rem,4.5vw,3.25rem)] leading-none',
    text: 'text-sm leading-[1.72] md:w-90',
  },
  large: {
    row: 'py-10 md:py-12',
    index: 'text-xl md:w-16 md:text-2xl',
    title: 'text-[clamp(2rem,3.6vw,3rem)] leading-[1.05]',
    text: 'text-base leading-[1.7] md:w-80',
  },
};

export async function ServiceRow({
  service,
  position,
  size = 'compact',
}: {
  service: ServiceId;
  position: number;
  size?: ServiceRowSize;
}) {
  const t = await getTranslations('services');
  const s = SIZES[size];
  const id = (part: string) => `service-${service}-${part}`;

  const row = (
    // The whole row is the link, so it is named by the title and the action
    // alone; left to its content, a screen reader would read the tagline and
    // the description as the link's label.
    <ServiceRequestTrigger
      service={service}
      aria-labelledby={`${id('title')} ${id('action')}`}
      aria-describedby={id('text')}
      className="group relative block"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [background:linear-gradient(90deg,--alpha(var(--color-primary)/16%)_0%,--alpha(var(--color-primary)/2%)_62%,transparent_100%)]"
        aria-hidden
      />
      <div
        className={cn(
          'relative mx-auto flex max-w-page items-center gap-4 px-6 md:gap-8',
          s.row,
        )}
      >
        <ActiveBar />
        <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row md:items-center md:gap-8">
          <div className="flex items-baseline gap-4 md:contents">
            <RowIndex className={s.index}>
              {String(position + 1).padStart(2, '0')}
            </RowIndex>
            <h3
              id={id('title')}
              className={cn(
                'min-w-0 flex-1 font-normal text-foreground transition-colors duration-300 group-hover:text-primary group-hover:[text-shadow:0_0_60px_--alpha(var(--color-primary)/50%)]',
                s.title,
              )}
            >
              {t(`items.${service}.title`)}
            </h3>
          </div>
          <div id={id('text')} className={cn('md:shrink-0', s.text)}>
            <p className="font-medium text-foreground/85">
              {t(`items.${service}.tagline`)}
            </p>
            <p className="text-foreground/60 transition-colors duration-300 group-hover:text-foreground/80">
              {t(`items.${service}.desc`)}
            </p>
          </div>
          {size === 'large' && (
            <span className="font-accent mt-3 inline-flex items-center gap-3 text-[clamp(1.1rem,1.6vw,1.4rem)] tracking-[0.2em] whitespace-nowrap text-blue-ink uppercase md:mt-0 md:w-40 md:shrink-0 md:justify-end">
              <span id={id('action')}>{t('overview.cta')}</span>
              <ArrowIcon animate />
            </span>
          )}
        </div>
        {size === 'compact' && (
          <>
            <span id={id('action')} className="sr-only">
              {t('overview.cta')}
            </span>
            <ArrowIcon
              animate
              className="shrink-0 text-right text-2xl text-foreground/45 transition-all duration-300 group-hover:text-blue-ink md:w-12"
            />
          </>
        )}
      </div>
    </ServiceRequestTrigger>
  );

  return (
    // The border stays on the list item, outside the depth pass, so the rhythm
    // of the rules never moves.
    <RevealItem className="border-b border-foreground/15">
      {size === 'large' ? (
        <ParallaxLayer
          className="relative"
          y={[56, 0, -36]}
          scale={[0.86, 1, 0.93]}
          opacity={[0.4, 1, 0.7]}
        >
          {row}
        </ParallaxLayer>
      ) : (
        row
      )}
    </RevealItem>
  );
}
