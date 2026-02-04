import { ContactInfo } from './ContactInfo';
import { ContactForm } from './ContactForm';

export function ContactSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-20 pb-20 md:grid-cols-2 md:items-start">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}
