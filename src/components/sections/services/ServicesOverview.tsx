import { SERVICES } from '@/lib/content/services';
import { ServicesList } from './ServicesList';
import { SectionHeader } from '../shared/SectionHeader';
import { SectionShell } from '../shared/SectionShell';
import { getTranslations } from 'next-intl/server';

export async function ServicesOverview() {
  const t = await getTranslations('services.overview');
  const tItems = await getTranslations('services.items');

  const services = SERVICES.map((s) => ({
    id: s.id,
    title: tItems(`${s.id}.title`),
    desc: tItems(`${s.id}.desc`),
    href: s.formUrl,
    ctaLabel: t('cta'),
  }));

  return (
    <SectionShell>
      <SectionHeader
        title={
          <>
            {t('title')}{' '}
            <span className="text-primary">{t('titleHighlight')}</span>
          </>
        }
        description={<p>{t('description')}</p>}
      />
      {/* Fase 2 */}
      {/* description
            Selecciona el servicio que mejor encaje y cuéntanos tu idea. Te
            responderemos con los siguientes pasos.
           */}

      <ServicesList services={services} />
    </SectionShell>
  );
}
