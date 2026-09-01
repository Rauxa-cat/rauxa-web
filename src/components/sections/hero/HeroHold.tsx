'use client';

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { holdUntilDecoded } from './hold';

// False outside a hero, so text primitives borrowed elsewhere still animate.
const HeldContext = createContext(false);

export const useHeroHeld = () => useContext(HeldContext);

// The hold has to land before the browser paints the incoming hero, which a
// layout effect does and `useEffect` does not. The server has nothing to pause,
// so that side takes the plain effect and React stops warning about one it
// cannot run.
const useHoldEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

// Starts held. Guessing the other way would let the copy run through the first
// render, before the effect has had a chance to say the photo is not ready.
export function HeroHoldProvider({ children }: { children: React.ReactNode }) {
  const [held, setHeld] = useState(true);

  useHoldEffect(() => holdUntilDecoded(() => setHeld(false)), []);

  return <HeldContext.Provider value={held}>{children}</HeldContext.Provider>;
}
