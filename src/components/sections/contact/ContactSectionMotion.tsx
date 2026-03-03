'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerItem } from '@/lib/animations';

export function ContactSectionMotion({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-20 pb-20 md:grid-cols-2 md:items-start">
      <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
        {left}
      </motion.div>
      <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }}>
        {right}
      </motion.div>
    </div>
  );
}
