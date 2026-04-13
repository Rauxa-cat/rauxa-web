'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { SERVICES } from '@/lib/content/services';
import { useTranslations } from 'next-intl';
import { SectionShell } from '@/components/sections/shared/SectionShell';
import { SectionHeader } from '@/components/sections/shared/SectionHeader';
import { ArrowIcon } from '@/components/icons/ArrowIcon';
import { fadeInUp } from '@/lib/animations';
import { ServicesList } from '../services/ServicesList';

export function WhatIsRauxa() {
  const t = useTranslations('home.whatIsRauxa');
  const tItems = useTranslations('services.items');
  const featured = SERVICES.filter((s) => s.featured).slice(0, 3);

  const services = featured.map((item) => ({
    id: item.id,
    title: tItems(`${item.id}.title`),
    desc: tItems(`${item.id}.desc`),
  }));

  return (
    <SectionShell>
      <SectionHeader
        eyebrow={t('eyebrow')}
        title={
          <>
            {t('title')}{' '}
            <span className="text-primary">{t('titleHighlight')}</span>
          </>
        }
        description={
          <>
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
          </>
        }
      />

      <ServicesList services={services} />

      <motion.div
        className="mt-12 flex justify-start"
        {...fadeInUp}
        transition={{ duration: 0.5 }}
      >
        <Button asChild size="lg" variant="outline">
          <Link href="/services">
            <p>{t('cta')}</p>
            <ArrowIcon />
          </Link>
        </Button>
      </motion.div>
    </SectionShell>
  );
}
