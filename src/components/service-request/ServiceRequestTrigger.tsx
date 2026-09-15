'use client';

import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import type { ServiceId } from '@/lib/content/services';
import { useServiceRequest } from './ServiceRequestProvider';

type ServiceRequestTriggerProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  service: ServiceId;
};

// A real link to the contact page underneath: before hydration, with scripts
// off, or opened in a new tab, the visitor still lands on a form.
export function ServiceRequestTrigger({
  service,
  onClick,
  onPointerEnter,
  onFocus,
  ...props
}: ServiceRequestTriggerProps) {
  const serviceRequest = useServiceRequest();

  return (
    <Link
      {...props}
      href="/contact"
      aria-haspopup={serviceRequest ? 'dialog' : undefined}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        serviceRequest?.preload();
      }}
      onFocus={(event) => {
        onFocus?.(event);
        serviceRequest?.preload();
      }}
      onClick={(event) => {
        onClick?.(event);
        const modified =
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey;
        if (!serviceRequest || event.defaultPrevented || modified) return;

        event.preventDefault();
        serviceRequest.open(service, event.currentTarget);
      }}
    />
  );
}
