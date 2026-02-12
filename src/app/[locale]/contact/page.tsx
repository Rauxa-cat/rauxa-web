import { Metadata } from 'next';
import { ContactSection } from '@/components/sections/contact/ContactSection';
import { generatePageMetadata, type PageProps } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale,
    namespace: 'metadata.contact',
    path: { es: '/contacto', ca: '/contacte' },
  });
}

export default function ContactPage() {
  return <ContactSection />;
}
