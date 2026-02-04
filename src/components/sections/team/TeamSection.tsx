import { TEAM } from '@/lib/content/team';
import { TeamMemberCard } from './TeamMemberCard';

export function TeamSection() {
  return (
    <section className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.35em] text-foreground/60 md:text-sm">
            EQUIPO
          </p>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-4xl">
            Personas detrás de la experiencia.
          </h2>

          <p className="mt-5 text-foreground/70">
            RAUXA nace de la colaboración entre gastronomía, música y arte.
            Diseñamos y producimos experiencias con intención y detalle.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m) => (
            <TeamMemberCard
              key={m.name}
              name={m.name}
              role={m.role}
              bio={m.bio}
              image={m.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
