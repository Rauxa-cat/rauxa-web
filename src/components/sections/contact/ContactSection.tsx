import { ContactInfo } from './ContactInfo';
import { ContactForm } from './ContactForm';
import { ContactSectionMotion } from './ContactSectionMotion';

export function ContactSection() {
  return (
    <section className="bg-background">
      <ContactSectionMotion left={<ContactInfo />} right={<ContactForm />} />
    </section>
  );
}
