'use client';

import { useRef } from 'react';
import { m, useScroll, useTransform, type MotionValue } from 'motion/react';
import { NOJS } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const FAINT = 0.14;

// Wider than a word's own slot, so neighbours overlap into a soft front, not a
// ticker.
const WINDOW = 0.12;

type Word = { text: string; emphasis: boolean };

const EM = /<\/?em>/;

const toWords = (text: string): Word[] =>
  text.split(EM).flatMap((segment, i) =>
    segment
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ text: word, emphasis: i % 2 === 1 })),
  );

// Fully legible by the time it reaches the middle of the viewport.
export function InkParagraph({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.55'],
  });
  const words = toWords(text);

  return (
    <p ref={ref} className={className}>
      {/* One read for assistive tech instead of thirty-odd fragments. */}
      <span className="sr-only">{text.replace(new RegExp(EM, 'g'), '')}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <InkWord
            key={i}
            word={word}
            progress={scrollYProgress}
            start={(i / words.length) * (1 - WINDOW)}
            still={reduce}
          />
        ))}
      </span>
    </p>
  );
}

function InkWord({
  word,
  progress,
  start,
  still,
}: {
  word: Word;
  progress: MotionValue<number>;
  start: number;
  still: boolean;
}) {
  const opacity = useTransform(progress, [start, start + WINDOW], [FAINT, 1]);

  return (
    <>
      <m.span
        {...NOJS.reset}
        className={
          word.emphasis
            ? 'text-primary [text-shadow:0_0_40px_--alpha(var(--color-primary)/35%)]'
            : undefined
        }
        style={{ opacity: still ? 1 : opacity }}
      >
        {word.text}
      </m.span>{' '}
    </>
  );
}
