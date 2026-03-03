'use client';

import { motion } from 'framer-motion';
import { ServiceCard } from './ServiceCard';
import {
  scrollViewport,
  staggerContainer,
  staggerItem,
} from '@/lib/animations';
import { cn } from '@/lib/utils';

type Service = {
  id: string;
  title: string;
  desc: string;
  href?: string;
  ctaLabel?: string;
};

type ServicesListProps = {
  services: Service[];
  columns?: 2 | 3;
  className?: string;
};

export function ServicesList({
  services,
  columns = 3,
  className,
}: ServicesListProps) {
  return (
    <motion.div
      className={cn(
        'mt-12 grid gap-6',
        columns === 2 && 'md:grid-cols-2 lg:grid-cols-2',
        columns === 3 && 'md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
    >
      {services.map((service) => (
        <motion.div key={service.id} variants={staggerItem}>
          <ServiceCard
            title={service.title}
            desc={service.desc}
            href={service.href}
            ctaLabel={service.ctaLabel}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
