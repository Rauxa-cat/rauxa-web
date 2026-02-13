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
        'inline-block leading-none transition-transform',
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
