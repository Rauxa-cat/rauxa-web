export const EASE = [0.22, 1, 0.36, 1] as const;

export const MASK_DURATION = 0.8;

// The short opacity leg is invisible under the mask at full motion, but it is
// what a reduced-motion visitor gets instead of a hard pop: `reducedMotion:
// 'user'` snaps the `y` and leaves the fade to play.
export const maskTransition = (delay = 0) =>
  ({
    duration: MASK_DURATION,
    ease: EASE,
    delay,
    opacity: { duration: 0.3, delay },
  }) as const;

export const STAGGER_GAP = 0.12;

export const IGNITION = { duration: 0.75 } as const;

// Motion writes each primitive's `initial` state into the server HTML as an
// inline style, and with scripts off nothing ever runs to clear it: the hero
// copy, the service rows and every contact field ship invisible. NO_JS_CSS puts
// the marked elements back.
export const NOJS = {
  reset: { 'data-nojs': 'reset' },
  // For the scroll-driven pin, which has no scroll to be driven by.
  auto: { 'data-nojs': 'auto' },
  hide: { 'data-nojs': 'hide' },
  show: { 'data-nojs': 'show' },
} as const;

export const NO_JS_CSS = [
  "[data-nojs='reset']{opacity:1!important;transform:none!important;clip-path:none!important;background-position-x:0!important}",
  "[data-nojs='auto']{height:auto!important}",
  "[data-nojs='hide']{display:none!important}",
  "[data-nojs='show']{display:block!important}",
].join('');
