// Shared motion tokens so every animation reads from the same easing/spring vocabulary.
export const EASE = [0.22, 1, 0.36, 1] as const;

// Text rising from behind a clip (hero bands, section headings). The short
// opacity leg is invisible under the mask at full motion, but it is what a
// reduced-motion visitor gets instead of a hard pop: `reducedMotion: 'user'`
// snaps the `y` and leaves the fade to play.
export const maskTransition = (delay = 0) =>
  ({
    duration: 0.8,
    ease: EASE,
    delay,
    opacity: { duration: 0.3, delay },
  }) as const;

export const IGNITION = { duration: 0.75 } as const;
