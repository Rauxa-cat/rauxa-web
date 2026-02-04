import { CONTACT } from './contact.constants';
import { ContactDetails } from '@/components/common/ContactDetails';

export function ContactInfo() {
  return (
    <div>
      <p className="font-mono tracking-widest text-foreground/60">CONTACTO</p>

      <h1 className="mt-4 text-5xl tracking-tight md:text-6xl text-primary">
        Hablemos
      </h1>

      <p className="mt-6 max-w-md text-base leading-7 text-foreground/70">
        ¿Tienes un proyecto en mente? ¿Quieres unirte a la comunidad?
      </p>

      <div className="mt-10 space-y-4 text-sm text-foreground/70">
        <ContactDetails {...CONTACT} socialSize="lg" />
      </div>
    </div>
  );
}
