import { cn } from '@/lib/utils';

type SectionShellProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  withBorder?: boolean;
};

export function SectionShell({
  children,
  className,
  innerClassName,
  withBorder = true,
}: SectionShellProps) {
  return (
    <section
      className={cn('bg-background', withBorder && 'border-t', className)}
    >
      <div
        className={cn('mx-auto max-w-6xl px-6 py-20 md:py-24', innerClassName)}
      >
        {children}
      </div>
    </section>
  );
}
