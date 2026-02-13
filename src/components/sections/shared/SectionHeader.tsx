import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('max-w-2xl', className)}>
      {eyebrow && (
        <p className="font-accent tracking-[0.35em] text-foreground/60">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>

      {description && (
        <div className="mt-5 space-y-3 text-foreground/70">{description}</div>
      )}
    </div>
  );
}
