'use client';

import { useEffect, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, m } from 'motion/react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { StaggerItem, staggerContainer } from '@/components/motion/Stagger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { ServiceId } from '@/lib/content/services';
import { EASE } from '@/lib/motion';
import { serviceRequestSchema } from '@/lib/validation/serviceRequest.schema';
import {
  Blast,
  BlastFlash,
  ChargedFrame,
  PANEL,
  PanelFlicker,
  PanelGlow,
} from './Detonation';
import {
  ServiceRequestForm,
  type ServiceRequestValues,
} from './ServiceRequestForm';

export function ServiceRequestDialog({
  service,
  open,
  onOpenChange,
  returnFocusRef,
}: {
  service: ServiceId;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocusRef: React.RefObject<HTMLElement | null>;
}) {
  const t = useTranslations('serviceRequest');
  const tForm = useTranslations('contact.form');
  const reducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const sentRef = useRef(false);

  const form = useForm<ServiceRequestValues>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service,
      message: '',
      company: '',
      acceptPrivacy: false,
    },
    mode: 'onBlur',
  });
  const { setValue, reset } = form;

  // Every open preselects the service that was clicked; the rest of the draft stays.
  useEffect(() => {
    if (open) setValue('service', service);
  }, [open, service, setValue]);

  const handleSent = () => {
    sentRef.current = true;
    onOpenChange(false);
  };

  // Radix hides the rest of the page from assistive tech until the panel has
  // unmounted, so a toast raised any earlier would never be announced.
  const handleExitComplete = () => {
    if (!sentRef.current) return;
    sentRef.current = false;
    reset();
    toast.success(tForm('api.serviceRequest.success'));
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence onExitComplete={handleExitComplete}>
        {open && (
          <Dialog.Portal forceMount>
            {/* Content lives inside the overlay so a panel taller than the
                viewport scrolls within the scroll lock Radix puts on the page. */}
            <Dialog.Overlay
              forceMount
              className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto overscroll-contain"
            >
              <m.div
                aria-hidden
                // A backdrop blur is redone every frame the blast moves over it,
                // which on a phone GPU costs more than the blur is worth.
                className="fixed inset-0 bg-[var(--rauxa-black)]/85 backdrop-blur-sm max-sm:bg-[var(--rauxa-black)]/92 max-sm:backdrop-blur-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              />
              {!reducedMotion && <BlastFlash />}

              <div className="relative flex min-h-full items-center justify-center px-4 py-16">
                <div className="relative w-full max-w-xl">
                  <PanelGlow />

                  <Dialog.Content
                    forceMount
                    asChild
                    onOpenAutoFocus={(event) => {
                      // Focusing the first field would raise the keyboard on a
                      // phone before the panel has even appeared.
                      event.preventDefault();
                      panelRef.current?.focus();
                    }}
                    onCloseAutoFocus={(event) => {
                      event.preventDefault();
                      returnFocusRef.current?.focus();
                    }}
                    onPointerDownOutside={(event) => {
                      // A press on the overlay's own scrollbar counts as outside.
                      const { originalEvent } = event.detail;
                      const target = originalEvent.target as HTMLElement;
                      if (originalEvent.clientX > target.clientWidth) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <m.div
                      ref={panelRef}
                      className="relative bg-background text-foreground outline-none"
                      initial={{ opacity: 0, scale: 0.82 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0.97,
                        transition: { duration: 0.2, ease: EASE },
                      }}
                      transition={{
                        delay: PANEL,
                        duration: 0.6,
                        // Overshoots, so the panel lands with the kick of the blast.
                        ease: [0.34, 1.4, 0.64, 1],
                        opacity: { delay: PANEL, duration: 0.2 },
                      }}
                    >
                      <ChargedFrame />
                      {!reducedMotion && <PanelFlicker />}

                      <m.div
                        className="relative px-6 pt-12 pb-8 sm:px-10 sm:pb-10"
                        variants={staggerContainer(PANEL + 0.1, 0.05)}
                        initial="hidden"
                        animate="show"
                      >
                        <StaggerItem>
                          <Dialog.Title className="text-[clamp(2.25rem,7vw,3.25rem)] leading-[1.05] font-normal tracking-tight">
                            {t('title')}{' '}
                            <span className="text-primary [text-shadow:0_0_40px_--alpha(var(--color-primary)/60%)]">
                              {t('titleHighlight')}
                            </span>
                          </Dialog.Title>
                        </StaggerItem>

                        <StaggerItem>
                          <Dialog.Description className="mt-3 max-w-md text-foreground/70">
                            {t('description')}
                          </Dialog.Description>
                        </StaggerItem>

                        <ServiceRequestForm form={form} onSent={handleSent} />
                      </m.div>

                      <Dialog.Close className="absolute top-2 right-2 grid size-11 cursor-pointer place-items-center text-foreground/60 transition-colors outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50">
                        <X aria-hidden className="size-5" />
                        <span className="sr-only">{t('close')}</span>
                      </Dialog.Close>
                    </m.div>
                  </Dialog.Content>
                </div>
              </div>

              {/* Over the panel, so the panel is what the blast leaves behind. */}
              {!reducedMotion && <Blast />}
            </Dialog.Overlay>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
