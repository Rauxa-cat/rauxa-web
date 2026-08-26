import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

// VT323 index label for editorial rows (services index, services overview).
export function RowIndex({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'shrink-0 font-accent tracking-[0.2em] text-blue-ink',
        className,
      )}
    >
      {children}
    </span>
  );
}
