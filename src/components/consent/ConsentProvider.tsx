'use client';

import { createContext, use, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { NO_CONSENT, type ConsentCategories } from '@/lib/consent/consent';
import {
  clearAnalyticsCookies,
  signalConsent,
  storeConsent,
} from '@/lib/consent/browser';
import { CookieBanner } from './CookieBanner';
import { ConsentSettingsDialog } from './ConsentSettingsDialog';

type ConsentState = { decided: boolean; categories: ConsentCategories };

type ConsentContextValue = ConsentState & {
  save: (categories: ConsentCategories) => void;
  openSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({
  initial,
  children,
}: {
  initial: ConsentCategories | null;
  children: React.ReactNode;
}) {
  const [state, setState] = useState<ConsentState>({
    decided: initial !== null,
    categories: initial ?? NO_CONSENT,
  });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const value = useMemo<ConsentContextValue>(
    () => ({
      ...state,
      save: (next) => {
        storeConsent(next);
        signalConsent(next, state.categories);

        // Tags that already ran keep their scripts and timers in the page;
        // only a reload leaves it with nothing but what is still granted.
        if (state.categories.analytics && !next.analytics) {
          clearAnalyticsCookies();
          window.location.reload();
          return;
        }

        setState({ decided: true, categories: next });
        setSettingsOpen(false);
      },
      openSettings: () => {
        triggerRef.current =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
        setSettingsOpen(true);
      },
    }),
    [state],
  );

  return (
    <ConsentContext value={value}>
      {children}
      <AnimatePresence>{!state.decided && <CookieBanner />}</AnimatePresence>
      <ConsentSettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        returnFocusRef={triggerRef}
      />
    </ConsentContext>
  );
}

export function useConsent() {
  const context = use(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
}
