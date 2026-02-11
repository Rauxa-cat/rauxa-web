import { Metadata } from 'next';
import { ContactSection } from '@/components/sections/contact/ContactSection';

export const metadata: Metadata = {
  title: 'Contacto - RAUXA',
  description:
    'Contacta con RAUXA para crear una experiencia gastronómica y cultural a medida. Escríbenos y cuéntanos qué tienes en mente.',
};

export default function ContactPage() {
  return <ContactSection />;
}
