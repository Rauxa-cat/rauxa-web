import { ServiceCard } from '@/components/sections/services/ServiceCard';
import { SERVICES } from '@/lib/content/services';
import { getTranslations } from 'next-intl/server';

export async function ServicesOverview() {
  const t = await getTranslations('services.overview');
  const tItems = await getTranslations('services.items');

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl leading-tight md:text-4xl">{t('title')}</h2>
          {/* Fase 2 */}
          {/* <p className="mt-4 text-foreground/70">
            Selecciona el servicio que mejor encaje y cuéntanos tu idea. Te
            responderemos con los siguientes pasos.
          </p> */}

          <p className="mt-4 text-foreground/70">{t('subtitle')}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard
              key={s.id}
              title={tItems(`${s.id}.title`)}
              desc={tItems(`${s.id}.desc`)}
              href={s.formUrl}
              ctaLabel={t('cta')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
