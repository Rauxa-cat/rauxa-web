'use client';

import type { ReactNode } from 'react';
import { NOJS } from '@/lib/motion';

// A `<details>` can only be closed from its summary; this second handle sits at
// the end of a long panel. It needs a script, so without one it is not shown.
export function DetailsCloseButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      {...NOJS.hide}
      className={className}
      onClick={(event) => {
        const details = event.currentTarget.closest('details');
        if (!details) return;
        details.open = false;
        details.querySelector('summary')?.focus();
      }}
    >
      {children}
    </button>
  );
}
