import { getTranslations } from 'next-intl/server';
import { SERVICE_IDS } from '@/lib/content/services';
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
        {SERVICE_IDS.map((service, i) => (
          <ServiceRow
            key={service}
            index={String(i + 1).padStart(2, '0')}
            service={service}
            title={tItems(`${service}.title`)}
            tagline={tItems(`${service}.tagline`)}
            description={tItems(`${service}.desc`)}
            ctaLabel={t('cta')}
          />
        ))}
      </RevealList>
    </SectionShell>
  );
}
