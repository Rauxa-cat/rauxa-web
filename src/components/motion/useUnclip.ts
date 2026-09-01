'use client';

import { useState } from 'react';

// Motion leaves its last frame in place, so a mask that clips while the content
// moves goes on clipping once it lands, shearing tall glyphs and cutting glows.
export function useUnclip() {
  const [unclipped, setUnclipped] = useState(false);
  return [unclipped, () => setUnclipped(true)] as const;
}
