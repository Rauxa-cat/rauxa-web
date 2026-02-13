import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/sections/services/ServiceCard';
import { SERVICES } from '@/lib/content/services';
import { getTranslations } from 'next-intl/server';
import { SectionShell } from '@/components/sections/shared/SectionShell';
import { SectionHeader } from '@/components/sections/shared/SectionHeader';
import { ArrowIcon } from '@/components/icons/ArrowIcon';

export async function WhatIsRauxa() {
  const t = await getTranslations('home.whatIsRauxa');
  const tItems = await getTranslations('services.items');
  const featured = SERVICES.filter((s) => s.featured).slice(0, 3);

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

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
        {featured.map((item) => (
          <ServiceCard
            key={item.id}
            title={tItems(`${item.id}.title`)}
            desc={tItems(`${item.id}.desc`)}
          />
        ))}
      </div>

      <div className="mt-12 flex justify-start">
        <Button asChild size="lg" variant="outline">
          <Link href="/services">
            <p>{t('cta')}</p>
            <ArrowIcon />
          </Link>
        </Button>
      </div>
    </SectionShell>
  );
}
