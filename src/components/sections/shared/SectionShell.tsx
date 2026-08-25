import { cn } from '@/lib/utils';

type SectionShellProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

export function SectionShell({
  children,
  className,
  innerClassName,
}: SectionShellProps) {
  return (
    <section className={cn('bg-background', className)}>
      <div
        className={cn('mx-auto max-w-page px-6 py-16 md:py-24', innerClassName)}
      >
        {children}
      </div>
    </section>
  );
}
