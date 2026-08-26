import { Button } from '@/components/ui/button';
import { ArrowIcon } from '@/components/icons/ArrowIcon';
import { ActiveBar } from '../shared/ActiveBar';
import { RowIndex } from '../shared/RowIndex';

type ServiceRowProps = {
  index: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
};

export function ServiceRow({
  index,
  title,
  description,
  ctaLabel,
  href,
}: ServiceRowProps) {
  return (
    <li className="group relative border-b border-foreground/15">
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 [background:linear-gradient(90deg,rgba(0,76,255,0.16)_0%,rgba(0,76,255,0.02)_62%,transparent_100%)]"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-page flex-col gap-6 px-6 py-14 md:flex-row md:items-start md:gap-12 md:py-16">
        <ActiveBar />
        <RowIndex className="text-2xl md:w-20">{index}</RowIndex>
        <h3 className="min-w-0 flex-1 font-normal leading-[1.05] text-foreground text-[clamp(2.25rem,5vw,4rem)] transition-colors duration-300 group-hover:text-primary group-hover:[text-shadow:0_0_60px_rgba(0,76,255,0.5)] md:max-w-155">
          {title}
        </h3>
        <div className="flex shrink-0 flex-col items-start gap-6 md:w-100">
          <p className="text-base leading-[1.75] text-foreground/70">
            {description}
          </p>
          <Button
            asChild
            size="lg"
            className="h-13 rounded-none px-7 tracking-wider transition-shadow duration-300 group-hover:shadow-[0_18px_44px_-16px_rgba(0,76,255,0.9)] group-focus-within:shadow-[0_18px_44px_-16px_rgba(0,76,255,0.9)]"
          >
            <a href={href} target="_blank" rel="noopener noreferrer">
              {ctaLabel}
              <ArrowIcon className="ml-1" />
            </a>
          </Button>
        </div>
      </div>
    </li>
  );
}
