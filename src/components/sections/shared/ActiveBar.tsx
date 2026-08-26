import { cn } from '@/lib/utils';

// The left accent bar that grows on row hover/focus. Expects a `group` ancestor.
export function ActiveBar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'absolute left-0 top-0 h-full w-0.75 origin-top scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100 group-focus-within:scale-y-100 motion-reduce:transition-none',
        className,
      )}
    />
  );
}
