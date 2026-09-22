'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

let mediaQuery: MediaQueryList | undefined;
const media = () => (mediaQuery ??= window.matchMedia(QUERY));

const subscribe = (onStoreChange: () => void) => {
  const mq = media();
  mq.addEventListener('change', onStoreChange);
  return () => mq.removeEventListener('change', onStoreChange);
};

// Motion's own `useReducedMotion` reads the media query *during* render, where
// the server can only ever answer `false`. Branching rendered output on it means
// a reduced-motion visitor hydrates a tree that differs from the served HTML and
// React discards the subtree. The server snapshot below keeps both renders
// identical, and React re-reads the real preference right after hydration. That
// makes this safe only for output that can change after mount: a class, a
// scroll-linked `style`, whether a decoration renders at all. Never branch an
// `initial`/`animate` target on it, since flipping the target mid-animation
// strands the element; those degrade through `MotionConfig reducedMotion="user"`.
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => media().matches,
    () => false,
  );
}
