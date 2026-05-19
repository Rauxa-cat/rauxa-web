import { ServiceCard } from './ServiceCard';
import { cn } from '@/lib/utils';

type Service = {
  id: string;
  title: string;
  desc: string;
  href?: string;
  ctaLabel?: string;
};

type ServicesListProps = {
  services: Service[];
  columns?: 2 | 3;
  className?: string;
};

export function ServicesList({
  services,
  columns = 3,
  className,
}: ServicesListProps) {
  return (
    <div
      className={cn(
        'mt-12 grid gap-6',
        columns === 2 && 'md:grid-cols-2 lg:grid-cols-2',
        columns === 3 && 'md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {services.map((service) => (
        <div key={service.id} className="view-animate">
          <ServiceCard
            title={service.title}
            desc={service.desc}
            href={service.href}
            ctaLabel={service.ctaLabel}
          />
        </div>
      ))}
    </div>
  );
}
