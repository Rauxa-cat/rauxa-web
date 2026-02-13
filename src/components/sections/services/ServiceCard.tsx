import { ArrowIcon } from '@/components/icons/ArrowIcon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ServiceCardProps = {
  title: string;
  desc: string;
  href?: string;
  ctaLabel?: string;
  className?: string;
};

export function ServiceCard({
  title,
  desc,
  href,
  ctaLabel = 'Ver detalles',
  className,
}: ServiceCardProps) {
  const isClickable = Boolean(href);

  return (
    <Card
      className={cn(
        'group relative rounded-3xl border border-border/60 backdrop-blur gap-4',
        'transition-all duration-200',
        isClickable && 'hover:-translate-y-0.5 hover:shadow-sm',
        className,
      )}
    >
      <CardHeader className="pb-2 ">
        <div className="mb-3 h-px w-10 bg-primary/60 transition-all duration-200 group-hover:w-14" />

        <CardTitle className="flex text-lg leading-snug">
          <p className="">{title}</p>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex h-full flex-col">
        <p className="text-sm leading-6 text-foreground/70">{desc}</p>

        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-foreground/85',
              'underline-offset-4 transition-colors hover:text-primary hover:underline text-primary',
            )}
          >
            {ctaLabel}
            <ArrowIcon animate className="group-hover:translate-x-0.5" />
          </a>
        ) : null}
      </CardContent>
    </Card>
  );
}
