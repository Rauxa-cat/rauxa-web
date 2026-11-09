'use client';

import { NOJS } from '@/lib/motion';
import { useConsent } from './ConsentProvider';

export function CookieSettingsButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { openSettings } = useConsent();

  return (
    <button
      type="button"
      onClick={openSettings}
      className={className}
      {...NOJS.hide}
    >
      {children}
    </button>
  );
}
