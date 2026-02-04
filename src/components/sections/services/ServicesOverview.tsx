import { ServiceCard } from '@/components/sections/services/ServiceCard';
import { SERVICES } from '@/lib/content/services';

export function ServicesOverview() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl leading-tight md:text-4xl">
            Elige tu experiencia
          </h2>
          {/* Fase 2 */}
          {/* <p className="mt-4 text-foreground/70">
            Selecciona el servicio que mejor encaje y cuéntanos tu idea. Te
            responderemos con los siguientes pasos.
          </p> */}

          <p className="mt-4 text-foreground/70">
            Escríbenos y te proponemos la mejor opción.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard
              key={s.id}
              title={s.title}
              desc={s.desc}
              icon={s.emoji}
              href={s.formUrl}
              ctaLabel="Contacta con RAUXA"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
