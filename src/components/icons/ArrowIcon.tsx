import { cn } from '@/lib/utils';

interface ArrowIconProps {
  className?: string;
  animate?: boolean;
  size?: 'sm' | 'md';
}

export function ArrowIcon({
  className,
  animate = false,
  size = 'md',
}: ArrowIconProps) {
  return (
    <span
      aria-hidden
      className={cn(
        // `[line-height:1]` and not `leading-none`: tailwind-merge drops a
        // `leading-*` once a font size follows it, and one always does.
        'inline-block [line-height:1] transition-transform',
        size === 'md' && 'text-lg',
        size === 'sm' && 'text-base',
        animate && 'group-hover:translate-x-1',
        className,
      )}
    >
      →
    </span>
  );
}
