'use client';

import { createContext, use, useMemo, useRef, useState } from 'react';
import type { ServiceId } from '@/lib/content/services';

type DialogComponent =
  typeof import('./ServiceRequestDialog').ServiceRequestDialog;

let dialogModule: Promise<DialogComponent> | undefined;
const loadDialog = () =>
  (dialogModule ??= import('./ServiceRequestDialog').then(
    (mod) => mod.ServiceRequestDialog,
    (error: unknown) => {
      // Cleared so a flaky connection gets another try on the next tap.
      dialogModule = undefined;
      throw error;
    },
  ));

type ServiceRequestContextValue = {
  open: (service: ServiceId, trigger: HTMLAnchorElement) => void;
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
  // Held in state rather than wrapped in `next/dynamic`: a lazy component
  // suspends on its first render even when its chunk is already loaded, and
  // React holds a Suspense reveal for ~300ms, which delayed every first open.
  const [Dialog, setDialogComponent] = useState<DialogComponent | null>(null);
  const [dialog, setDialog] = useState<{
    service: ServiceId;
    open: boolean;
  } | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const value = useMemo<ServiceRequestContextValue>(() => {
    const load = () =>
      loadDialog().then((component) => {
        setDialogComponent(() => component);
      });

    return {
      open: (service, trigger) => {
        triggerRef.current = trigger;
        load().then(
          () => setDialog({ service, open: true }),
          // The click was already prevented; the link's own page has a form.
          () => window.location.assign(trigger.href),
        );
      },
      preload: () => void load().catch(() => {}),
    };
  }, []);

  return (
    <ServiceRequestContext value={value}>
      {children}
      {/* Kept mounted after the first open, so closing the dialog keeps the draft. */}
      {Dialog && dialog && (
        <Dialog
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
