import { ContactInfo } from './ContactInfo';
import { ContactForm } from './ContactForm';
import { ContactGlow } from './ContactGlow';

export function ContactSection() {
  return (
    <section className="bg-background">
      <div className="relative mx-auto max-w-page px-6 pt-28 pb-24 md:pt-36">
        <ContactGlow />
        <div className="relative grid gap-14 md:grid-cols-2 md:items-start md:gap-20">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
