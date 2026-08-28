// Shared motion tokens so every animation reads from the same easing/spring vocabulary.
export const EASE = [0.22, 1, 0.36, 1] as const;

export const PRESS_SPRING = {
  type: 'spring',
  stiffness: 400,
  damping: 24,
} as const;
