import { CONTACT } from './contact.constants';
import { ContactDetails } from '@/components/contact/ContactDetails';
import { getTranslations } from 'next-intl/server';

export async function ContactInfo() {
  const t = await getTranslations('contact.info');
  return (
    <div>
      <p className="font-accent tracking-[0.35em] text-foreground/60">
        {t('eyebrow')}
      </p>

      <h1 className="mt-4 text-5xl tracking-tight md:text-6xl text-primary">
        {t('title')}
      </h1>

      <p className="mt-6 max-w-md text-base leading-7 text-foreground/70">
        {t('subtitle')}
      </p>

      <div className="mt-10 space-y-4 text-sm text-foreground/70">
        <ContactDetails {...CONTACT} socialSize="lg" />
      </div>
    </div>
  );
}
