'use client';

import { useEffect, useLayoutEffect } from 'react';
import { holdUntilDecoded } from './hold';

// The hold has to land before the browser paints the incoming hero, which a
// layout effect does and `useEffect` does not. There is nothing to pause on the
// server, so that side takes the plain effect and React stops warning about a
// layout effect it cannot run.
const useHoldEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function HeroHold() {
  useHoldEffect(holdUntilDecoded, []);
  return null;
}
