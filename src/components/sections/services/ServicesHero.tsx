import { SERVICES } from '@/lib/content/services';

export function ServicesHero() {
  return (
    <section className="border-b bg-background">
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-12">
        <p className="font-mono tracking-widest text-foreground/70">
          SERVICIOS · EXPERIENCIAS · EVENTOS
        </p>

        <h1 className="mt-5 -ml-[0.06em] text-4xl leading-[1.05] tracking-tight md:text-6xl">
          Servicios RAUXA
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-foreground/80 md:text-lg md:leading-8">
          Desde cenas íntimas hasta eventos a gran escala.
        </p>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-foreground/70">
          {SERVICES.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="hover:text-foreground underline-offset-4 hover:underline"
            >
              {s.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
