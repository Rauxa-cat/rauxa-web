'use client';

import { createContext, use, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { ServiceId } from '@/lib/content/services';

const loadDialog = () => import('./ServiceRequestDialog');

const ServiceRequestDialog = dynamic(
  () => loadDialog().then((mod) => mod.ServiceRequestDialog),
  { ssr: false },
);

type ServiceRequestContextValue = {
  open: (service: ServiceId, trigger: HTMLElement) => void;
  preload: () => void;
};

const ServiceRequestContext = createContext<ServiceRequestContextValue | null>(
  null,
);

export function ServiceRequestProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dialog, setDialog] = useState<{
    service: ServiceId;
    open: boolean;
  } | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const value = useMemo<ServiceRequestContextValue>(
    () => ({
      open: (service, trigger) => {
        triggerRef.current = trigger;
        setDialog({ service, open: true });
      },
      preload: () => void loadDialog(),
    }),
    [],
  );

  return (
    <ServiceRequestContext value={value}>
      {children}
      {/* Kept mounted after the first open, so closing the dialog keeps the draft. */}
      {dialog && (
        <ServiceRequestDialog
          service={dialog.service}
          open={dialog.open}
          onOpenChange={(open) =>
            setDialog((current) => current && { ...current, open })
          }
          returnFocusRef={triggerRef}
        />
      )}
    </ServiceRequestContext>
  );
}

export function useServiceRequest() {
  return use(ServiceRequestContext);
}
