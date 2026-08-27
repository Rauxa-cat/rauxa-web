import { cn } from '@/lib/utils';

type SectionShellProps = {
  children: React.ReactNode;
  className?: string;
};

// Unified section wrapper: background token + top vertical rhythm. Children own
// their horizontal layout, so both centered headers (`mx-auto max-w-page`) and
// full-bleed lists (edge-to-edge borders and hover backgrounds) compose on top.
export function SectionShell({ children, className }: SectionShellProps) {
  return (
    <section className={cn('bg-background pt-24 md:pt-32', className)}>
      {children}
    </section>
  );
}
