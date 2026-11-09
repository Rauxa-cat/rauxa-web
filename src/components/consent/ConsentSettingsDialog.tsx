'use client';

import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ALL_CONSENT,
  NO_CONSENT,
  type ConsentCategories,
} from '@/lib/consent/consent';
import { useConsent } from './ConsentProvider';
import { BANNER_ATTR } from './CookieBanner';

type Category = 'technical' | keyof ConsentCategories;

export function ConsentSettingsDialog({
  open,
  session,
  onOpenChange,
  returnFocusRef,
}: {
  open: boolean;
  session: number;
  onOpenChange: (open: boolean) => void;
  returnFocusRef: React.RefObject<HTMLElement | null>;
}) {
  const t = useTranslations('consent.settings');
  const navigatingRef = useRef(false);
  const { decided } = useConsent();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        onCloseAutoFocus={(event) => {
          // After the policy link the opener belongs to the page left behind:
          // the footer one survives the navigation, and focusing it would
          // scroll the new page down to it.
          if (navigatingRef.current) {
            navigatingRef.current = false;
            event.preventDefault();
            return;
          }
          // A choice saved from the banner's «Configurar» sends the banner
          // out with its opener. Left there, focus would drop to <body> once
          // it unmounts, and the next Tab would leave the page, since the
          // banner is last in the DOM.
          const trigger = returnFocusRef.current;
          if (decided && trigger?.closest(`[${BANNER_ATTR}]`)) {
            event.preventDefault();
            document.querySelector('main')?.focus({ preventScroll: true });
            return;
          }
          // The opener is a plain button, not a Radix trigger.
          if (trigger?.isConnected) {
            event.preventDefault();
            trigger.focus();
          }
        }}
        className="max-h-[calc(100svh-2rem)] overflow-y-auto sm:max-w-xl"
      >
        <DialogHeader>
          <DialogTitle className="pr-10 font-sans text-xl">
            {t('title')}
          </DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        {/* Keyed per open, so the switches start from the stored choice every
            time instead of from a draft that was never saved, while the form
            stays in place through the closing animation. */}
        <ConsentSettingsForm
          key={session}
          onNavigate={() => {
            navigatingRef.current = true;
            onOpenChange(false);
          }}
        />

        <DialogClose className="absolute top-3 right-3 grid size-10 cursor-pointer place-items-center rounded-md text-foreground/60 transition-colors outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50">
          <X aria-hidden className="size-5" />
          <span className="sr-only">{t('close')}</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

function ConsentSettingsForm({ onNavigate }: { onNavigate: () => void }) {
  const t = useTranslations('consent.settings');
  const { categories, save } = useConsent();
  const [draft, setDraft] = useState(categories);

  return (
    <>
      <ul className="divide-y border-y">
        <CategoryRow category="technical" checked disabled />
        <CategoryRow
          category="analytics"
          checked={draft.analytics}
          onCheckedChange={(analytics) =>
            setDraft((current) => ({ ...current, analytics }))
          }
        />
      </ul>

      <div className="grid gap-2 sm:grid-cols-3">
        <Button variant="outline" onClick={() => save(draft)}>
          {t('save')}
        </Button>
        <Button variant="outline" onClick={() => save(ALL_CONSENT)}>
          {t('acceptAll')}
        </Button>
        <Button variant="outline" onClick={() => save(NO_CONSENT)}>
          {t('rejectAll')}
        </Button>
      </div>

      <Link
        href="/cookies"
        onClick={onNavigate}
        className="justify-self-start text-sm underline underline-offset-4"
      >
        {t('policy')}
      </Link>
    </>
  );
}

function CategoryRow({
  category,
  checked,
  disabled,
  onCheckedChange,
}: {
  category: Category;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  const t = useTranslations('consent.settings.categories');
  const id = `consent-${category}`;

  return (
    <li className="flex items-start justify-between gap-6 py-4">
      <div className="space-y-1">
        <label htmlFor={id} className="font-medium">
          {t(`${category}.title`)}
        </label>
        <p
          id={`${id}-description`}
          className="text-sm leading-relaxed text-muted-foreground"
        >
          {t(`${category}.description`)}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1 pt-0.5">
        <Switch
          id={id}
          checked={checked}
          disabled={disabled}
          onCheckedChange={onCheckedChange}
          aria-describedby={`${id}-description`}
        />
        {disabled && (
          <span className="text-xs text-muted-foreground">
            {t('alwaysActive')}
          </span>
        )}
      </div>
    </li>
  );
}
