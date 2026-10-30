import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { NotFoundSection } from '@/components/sections/not-found/NotFoundSection';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('notFound');
  return { title: t('metadata') };
}

export default function NotFound() {
  return <NotFoundSection />;
}
