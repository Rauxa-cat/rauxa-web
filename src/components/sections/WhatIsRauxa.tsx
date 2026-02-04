import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/sections/services/ServiceCard';
import { SERVICES } from '@/lib/content/services';

export function WhatIsRauxa() {
  const featured = SERVICES.filter((s) => s.featured).slice(0, 3);

  return (
    <section className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="font-mono text-sm tracking-[0.35em] text-foreground/60 md:text-md">
            QUÉ HACEMOS
          </p>

          <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
            Experiencias gastronómicas y culturales{' '}
            <span className="text-primary">hechas a medida</span>.
          </h2>

          <p className="mt-5 text-foreground/70">
            En RAUXA organizamos cenas experienciales propias y creamos
            experiencias para particulares, empresas y marcas.
          </p>

          <p className="mt-3 text-foreground/70">
            No somos un catering tradicional: diseñamos el concepto completo
            (gastronomía, música y arte) para que cada evento se sienta único.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {featured.map((item) => (
            <ServiceCard key={item.title} title={item.title} desc={item.desc} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-start">
          <Button asChild size="lg" variant="outline">
            <Link href="/servicios" className="inline-flex items-center gap-2">
              Descubre nuestros servicios
              <span aria-hidden className="text-lg leading-none">
                →
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
