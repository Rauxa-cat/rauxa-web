import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

// The `::details-content` transition keeps the body rendered while it closes;
// where that pseudo-element is unsupported the body still opens with the
// animation and closes at once.
export function Details({ className, ...props }: ComponentProps<'details'>) {
  return (
    <details
      className={cn(
        'group/details details-content:transition-[content-visibility] details-content:transition-discrete details-content:duration-500 motion-reduce:details-content:transition-none',
        className,
      )}
      {...props}
    />
  );
}

// The two wrappers are what let the height run from 0 to its content: the grid
// track interpolates between `0fr` and `1fr`, and `min-h-0` lets it shrink below
// the content.
export function DetailsBody({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-open/details:grid-rows-[1fr] motion-reduce:transition-none starting:group-open/details:grid-rows-[0fr]">
      <div className="min-h-0 overflow-hidden">
        <div className={className} {...props} />
      </div>
    </div>
  );
}
