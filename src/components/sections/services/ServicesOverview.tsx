import { getTranslations } from 'next-intl/server';
import { SERVICES } from '@/lib/content/services';
import { SectionHeader } from '../shared/SectionHeader';
import { SectionShell } from '../shared/SectionShell';
import { RevealList } from '@/components/motion/Reveal';
import { ServiceRow } from './ServiceRow';

export async function ServicesOverview() {
  const t = await getTranslations('services.overview');
  const tItems = await getTranslations('services.items');

  return (
    <SectionShell className="pt-8 md:pt-12">
      <SectionHeader
        className="mx-auto max-w-page px-6 pb-20"
        hairline
        size="lg"
        eyebrow={t('eyebrow')}
        title={
          <>
            <span className="block">{t('title')}</span>
            <span className="block text-primary">{t('titleHighlight')}</span>
          </>
        }
        description={<p>{t('description')}</p>}
      />

      <RevealList className="border-t border-foreground/15">
        {SERVICES.map((service, i) => (
          <ServiceRow
            key={service.id}
            index={String(i + 1).padStart(2, '0')}
            title={tItems(`${service.id}.title`)}
            description={tItems(`${service.id}.desc`)}
            ctaLabel={t('cta')}
            href={service.formUrl}
          />
        ))}
      </RevealList>
    </SectionShell>
  );
}
