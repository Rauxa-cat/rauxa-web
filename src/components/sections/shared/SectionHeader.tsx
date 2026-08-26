import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type SectionHeaderSize = 'sm' | 'md' | 'lg' | 'display';

// Fluid sizes: keep the proportion between bands, not the pixel values.
const titleSize: Record<SectionHeaderSize, string> = {
  sm: 'text-[clamp(1.5rem,3vw,2rem)] leading-tight',
  md: 'text-[clamp(2rem,4vw,3.25rem)] leading-tight',
  lg: 'text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02]',
  display: 'text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.95]',
};

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  size?: SectionHeaderSize;
  hairline?: boolean;
  className?: string;
  animate?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'title'>;

export function SectionHeader({
  eyebrow,
  title,
  description,
  size = 'md',
  hairline = false,
  className,
  animate = true,
  ...rest
}: SectionHeaderProps) {
  return (
    <div className={cn(animate && 'view-animate', className)} {...rest}>
      {eyebrow && (
        <div className="flex items-center gap-3.5">
          {hairline && <span className="h-px w-7.5 bg-primary" aria-hidden />}
          <span className="font-accent tracking-[0.35em] text-foreground/60">
            {eyebrow}
          </span>
        </div>
      )}

      <h2 className={cn('mt-4 font-normal tracking-tight', titleSize[size])}>
        {title}
      </h2>

      {description && (
        <div className="mt-5 max-w-2xl space-y-3 text-foreground/70">
          {description}
        </div>
      )}
    </div>
  );
}
