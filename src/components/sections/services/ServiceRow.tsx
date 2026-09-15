import { Button } from '@/components/ui/button';
import { ArrowIcon } from '@/components/icons/ArrowIcon';
import { ActiveBar } from '../shared/ActiveBar';
import { RowIndex } from '../shared/RowIndex';
import { RevealItem } from '@/components/motion/Reveal';
import { ParallaxLayer } from '@/components/motion/Parallax';
import { ServiceRequestTrigger } from '@/components/service-request/ServiceRequestTrigger';
import type { ServiceId } from '@/lib/content/services';

type ServiceRowProps = {
  index: string;
  service: ServiceId;
  title: string;
  tagline: string;
  description: string;
  ctaLabel: string;
};

export function ServiceRow({
  index,
  service,
  title,
  tagline,
  description,
  ctaLabel,
}: ServiceRowProps) {
  return (
    <RevealItem className="group relative border-b border-foreground/15">
      {/* Depth pass on top of the clip reveal: the row rises and settles into
          focus as it crosses the viewport, then eases back as it leaves. The
          border stays on the list item so the rhythm of the rules never moves. */}
      <ParallaxLayer
        className="relative"
        y={[56, 0, -36]}
        scale={[0.86, 1, 0.93]}
        opacity={[0.4, 1, 0.7]}
      >
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-has-focus-visible:opacity-100 [background:linear-gradient(90deg,--alpha(var(--color-primary)/16%)_0%,--alpha(var(--color-primary)/2%)_62%,transparent_100%)]"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-page flex-col gap-6 px-6 py-14 md:flex-row md:items-start md:gap-12 md:py-16">
          <ActiveBar />
          <RowIndex className="text-2xl md:w-20">{index}</RowIndex>
          <h3 className="min-w-0 flex-1 font-normal leading-[1.05] text-foreground text-[clamp(2.25rem,5vw,4rem)] transition-colors duration-300 group-hover:text-primary group-hover:[text-shadow:0_0_60px_--alpha(var(--color-primary)/50%)] md:max-w-155">
            {title}
          </h3>
          <div className="flex shrink-0 flex-col items-start gap-6 md:w-100">
            <div className="space-y-2">
              <p className="text-lg leading-snug text-foreground">{tagline}</p>
              <p className="text-base leading-[1.75] text-foreground/70">
                {description}
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="h-13 rounded-none px-7 tracking-wider transition-all duration-300 group-hover:shadow-[0_18px_44px_-16px_--alpha(var(--color-primary)/90%)] group-has-focus-visible:shadow-[0_18px_44px_-16px_--alpha(var(--color-primary)/90%)]"
            >
              <ServiceRequestTrigger service={service}>
                {ctaLabel}
                <ArrowIcon animate className="ml-1" />
              </ServiceRequestTrigger>
            </Button>
          </div>
        </div>
      </ParallaxLayer>
    </RevealItem>
  );
}
