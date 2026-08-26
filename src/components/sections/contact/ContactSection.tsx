import { ContactInfo } from './ContactInfo';
import { ContactForm } from './ContactForm';

export function ContactSection() {
  return (
    <section className="bg-background">
      <div className="relative mx-auto max-w-page px-6 pt-28 pb-24 md:pt-36">
        <div
          className="pointer-events-none absolute left-0 top-16 h-105 w-225 max-w-full [background:radial-gradient(ellipse_at_center,rgba(0,76,255,0.28)_0%,rgba(0,76,255,0.06)_46%,transparent_72%)]"
          aria-hidden
        />
        <div className="relative grid gap-14 md:grid-cols-2 md:items-start md:gap-20">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
