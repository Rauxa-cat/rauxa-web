import { cn } from '@/lib/utils';

// Expects a `group` ancestor: either the focusable row itself or one wrapping it.
// Keyed to focus-visible, not focus-within: the request dialog hands focus back to
// the row that opened it, which would leave a mouse user with a row stuck lit.
export function ActiveBar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'absolute left-0 top-0 h-full w-0.75 origin-top scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100 group-focus-visible:scale-y-100 group-has-focus-visible:scale-y-100 motion-reduce:transition-none',
        className,
      )}
    />
  );
}
