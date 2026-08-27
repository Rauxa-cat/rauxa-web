'use client';

import { useRef } from 'react';
import { m, useScroll, useTransform, useReducedMotion } from 'motion/react';

// The blue halo fades as the hero scrolls away. The text-shadow stays fixed (animating it drops fps).
export function HeroGlow() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.9, 0.2]);

  return (
    <m.div
      ref={ref}
      aria-hidden
      style={reduce ? undefined : { opacity }}
      className="absolute top-[46%] left-[6%] h-[500px] w-[900px] max-w-[85%] bg-[radial-gradient(ellipse_at_center,rgba(0,76,255,0.30)_0%,rgba(0,76,255,0.06)_46%,transparent_72%)]"
    />
  );
}
