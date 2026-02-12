import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/sections/services/ServiceCard';
import { SERVICES } from '@/lib/content/services';
import { getTranslations } from 'next-intl/server';

export async function WhatIsRauxa() {
  const t = await getTranslations('home.whatIsRauxa');
  const tItems = await getTranslations('services.items');
  const featured = SERVICES.filter((s) => s.featured).slice(0, 3);

  return (
    <section className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="font-accent text-md tracking-[0.35em] text-foreground/60 md:text-md">
            {t('eyebrow')}
          </p>

          <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
            {t('title')}{' '}
            <span className="text-primary">{t('titleHighlight')}</span>.
          </h2>

          <p className="mt-5 text-foreground/70">{t('p1')}</p>
          <p className="mt-3 text-foreground/70">{t('p2')}</p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {featured.map((item) => (
            <ServiceCard
              key={item.id}
              title={tItems(`${item.id}.title`)}
              desc={tItems(`${item.id}.desc`)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-start">
          <Button asChild size="lg" variant="outline">
            <Link href="/services" className="inline-flex items-center gap-2">
              {t('cta')}
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
