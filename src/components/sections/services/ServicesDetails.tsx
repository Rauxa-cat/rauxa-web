import { Button } from '@/components/ui/button';

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-foreground/70">{label}</span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="min-h-28 w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
    />
  );
}

export function ServicesDetails() {
  return (
    <section className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 space-y-20">
        {/* 1) Cenas RAUXA */}
        <div id="cenas-rauxa" className="scroll-mt-24">
          <h2 className="text-2xl md:text-3xl">✨ Cenas RAUXA</h2>
          <p className="mt-3 max-w-3xl text-foreground/70">
            Cenas privadas donde se unen gastronomía, música y arte. El acceso
            es exclusivo: solo pueden asistir las personas que forman parte de
            la comunidad oficial de RAUXA.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Field label="Nombre completo">
              <Input placeholder="Tu nombre y apellidos" />
            </Field>
            <Field label="Email">
              <Input type="email" placeholder="tu@email.com" />
            </Field>
            <Field label="Teléfono de contacto">
              <Input placeholder="+34..." />
            </Field>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button size="lg">Registrarse en la comunidad</Button>
            <Button size="lg" variant="outline">
              Unirse al grupo de WhatsApp
            </Button>
          </div>

          <p className="mt-3 text-sm text-foreground/60">
            Únete a nuestro grupo de WhatsApp para no perderte ninguna.
          </p>
        </div>

        {/* 2) Cenas privadas */}
        <div id="cenas-privadas" className="scroll-mt-24">
          <h2 className="text-2xl md:text-3xl">🥂 Cenas privadas</h2>
          <p className="mt-3 max-w-3xl text-foreground/70">
            Cuéntanos qué tienes en mente y lo hacemos realidad. Diseñamos cenas
            privadas a medida, adaptadas a lo que buscas y al tipo de
            experiencia que quieres crear.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Field label="Día y hora del evento">
              <Input placeholder="dd/mm/aaaa - hh:mm" />
            </Field>
            <Field label="Número de personas">
              <Input type="number" placeholder="Ej. 12" />
            </Field>
            <Field label="¿Espacio propio o lo gestionamos nosotros?">
              <Input placeholder="Propio / RAUXA lo gestiona" />
            </Field>
            <Field label="Evento sentado o de pie">
              <Input placeholder="Sentado / De pie" />
            </Field>
            <Field label="Presupuesto por persona">
              <Input placeholder="Ej. 60€" />
            </Field>
            <Field label="Cuéntanos brevemente qué tienes en mente">
              <Textarea placeholder="Idea, ocasión, inspiración, restricciones..." />
            </Field>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button size="lg">Enviar solicitud</Button>
            <Button size="lg" variant="outline">
              Reservar reunión por Google Meet
            </Button>
          </div>
        </div>

        {/* 3) Organización de eventos */}
        <div id="eventos" className="scroll-mt-24">
          <h2 className="text-2xl md:text-3xl">🎉 Organización de eventos</h2>
          <p className="mt-3 max-w-3xl text-foreground/70">
            Creamos eventos completos adaptados a lo que buscas. Desde la
            gastronomía hasta la música, DJs, animación y espacios, nos
            encargamos de todo el proceso.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Field label="Día y hora del evento">
              <Input />
            </Field>
            <Field label="Número de personas">
              <Input type="number" />
            </Field>
            <Field label="¿Espacio propio o lo gestionamos nosotros?">
              <Input />
            </Field>
            <Field label="Evento sentado o de pie">
              <Input />
            </Field>
            <Field label="Presupuesto por persona">
              <Input />
            </Field>
            <Field label="Cuéntanos brevemente de qué va el evento">
              <Textarea />
            </Field>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button size="lg">Enviar solicitud</Button>
            <Button size="lg" variant="outline">
              Reservar reunión por Google Meet
            </Button>
          </div>
        </div>

        {/* 4) Catering */}
        <div id="catering" className="scroll-mt-24">
          <h2 className="text-2xl md:text-3xl">🍽️ Catering</h2>
          <p className="mt-3 max-w-3xl text-foreground/70">
            ¿Solo necesitas la comida? Preparamos y entregamos el catering listo
            para servir, sin organización de evento ni producción adicional.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Field label="Día y hora de entrega">
              <Input />
            </Field>
            <Field label="Número de personas">
              <Input type="number" />
            </Field>
            <Field label="Tipo de catering">
              <Input placeholder="snacks, finger food, coffee break..." />
            </Field>
            <Field label="Presupuesto aproximado">
              <Input />
            </Field>
            <Field label="Cuéntanos qué necesitas">
              <Textarea placeholder="restricciones, estilo, etc." />
            </Field>
          </div>

          <div className="mt-6">
            <Button size="lg">Solicitar catering</Button>
          </div>

          <p className="mt-3 text-sm text-foreground/60">
            Entrega de comida preparada y empaquetada.
          </p>
        </div>

        {/* 5) DJ */}
        <div id="dj" className="scroll-mt-24">
          <h2 className="text-2xl md:text-3xl">🎧 Servicios de DJ</h2>
          <p className="mt-3 max-w-3xl text-foreground/70">
            Sesiones musicales adaptadas a cada evento. Seleccionamos el DJ y el
            estilo musical que mejor encaje con la experiencia que quieres
            crear.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Field label="Día y hora del evento">
              <Input />
            </Field>
            <Field label="Cuéntanos qué tipo de música o vibe buscas">
              <Textarea />
            </Field>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button size="lg">Enviar solicitud</Button>
            <Button size="lg" variant="outline">
              Reservar llamada
            </Button>
          </div>
        </div>

        {/* 6) Marcas */}
        <div id="marcas" className="scroll-mt-24">
          <h2 className="text-2xl md:text-3xl">🤝 Colaboraciones con marcas</h2>
          <p className="mt-3 max-w-3xl text-foreground/70">
            Creamos experiencias a medida para marcas: pop-ups, eventos de
            marca, shootings, acciones especiales o lanzamientos. Siempre
            adaptándonos a vuestra identidad y objetivos.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Field label="Día y hora del evento">
              <Input />
            </Field>
            <Field label="Número de personas">
              <Input type="number" />
            </Field>
            <Field label="¿Espacio propio o lo gestionamos nosotros?">
              <Input />
            </Field>
            <Field label="Evento sentado o de pie">
              <Input />
            </Field>
            <Field label="Presupuesto por persona">
              <Input />
            </Field>
            <Field label="Cuéntanos brevemente qué tienes en mente">
              <Textarea />
            </Field>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button size="lg">Enviar solicitud</Button>
            <Button size="lg" variant="outline">
              Reservar reunión
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
