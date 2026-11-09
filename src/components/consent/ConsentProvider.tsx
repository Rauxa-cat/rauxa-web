'use client';

import {
  createContext,
  use,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AnimatePresence } from 'motion/react';
import {
  CONSENT_COOKIE,
  NO_CONSENT,
  type ConsentCategories,
} from '@/lib/consent/consent';
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

// Tags that already ran keep their scripts and timers in the page; only a
// reload leaves it with nothing but what is still granted. The GA cookies go
// on any rejection, since they can outlive an earlier grant the visitor is no
// longer bound to.
function applyConsent(next: ConsentCategories, previous: ConsentCategories) {
  signalConsent(next, previous);
  if (next.analytics) return false;
  clearAnalyticsCookies();
  if (!previous.analytics) return false;
  window.location.reload();
  return true;
}

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
  const [settingsSession, setSettingsSession] = useState(0);
  const triggerRef = useRef<HTMLElement | null>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const categoriesRef = useRef(state.categories);

  useEffect(() => {
    categoriesRef.current = state.categories;
  }, [state.categories]);

  // A choice made in another tab applies here too, or a withdrawal there
  // would leave GA4 running in this tab and writing its cookies back.
  useEffect(() => {
    const channel = new BroadcastChannel(CONSENT_COOKIE);
    channel.onmessage = ({ data }: MessageEvent<ConsentCategories>) => {
      if (applyConsent(data, categoriesRef.current)) return;
      setState({ decided: true, categories: data });
    };
    channelRef.current = channel;
    return () => channel.close();
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      ...state,
      save: (next) => {
        storeConsent(next);
        channelRef.current?.postMessage(next);
        if (applyConsent(next, state.categories)) return;

        setState({ decided: true, categories: next });
        setSettingsOpen(false);
      },
      openSettings: () => {
        triggerRef.current =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
        setSettingsSession((session) => session + 1);
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
        session={settingsSession}
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
