'use client';

import { useEffect, useRef, type ComponentProps } from 'react';
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
  const ref = useRef<HTMLAnchorElement>(null);

  // A phone has no hover, so pointerenter only preloads on the tap itself.
  // Idle, so the fetch and parse stay off the scroll.
  useEffect(() => {
    const el = ref.current;
    if (!serviceRequest || !el) return;

    let cancelIdle: (() => void) | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        // Safari has no requestIdleCallback.
        if (typeof requestIdleCallback === 'function') {
          const handle = requestIdleCallback(serviceRequest.preload, {
            timeout: 2000,
          });
          cancelIdle = () => cancelIdleCallback(handle);
        } else {
          const handle = setTimeout(serviceRequest.preload, 200);
          cancelIdle = () => clearTimeout(handle);
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelIdle?.();
    };
  }, [serviceRequest]);

  return (
    <Link
      {...props}
      ref={ref}
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
