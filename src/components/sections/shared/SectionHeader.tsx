'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { fadeInUp } from '@/lib/animations';

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  animate?: boolean;
} & Omit<HTMLMotionProps<'div'>, 'children' | 'title'>;

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  animate = true,
  ...motionProps
}: SectionHeaderProps) {
  const defaultAnimation = animate ? fadeInUp : {};

  return (
    <motion.div
      className={cn('max-w-2xl', className)}
      {...defaultAnimation}
      transition={{ duration: 0.6 }}
      {...motionProps}
    >
      {eyebrow && (
        <p className="font-accent tracking-[0.35em] text-foreground/60">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>

      {description && (
        <div className="mt-5 space-y-3 text-foreground/70">{description}</div>
      )}
    </motion.div>
  );
}
