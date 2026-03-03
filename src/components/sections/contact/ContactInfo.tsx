import { CONTACT } from './contact.constants';
import { ContactDetails } from '@/components/contact/ContactDetails';
import { getTranslations } from 'next-intl/server';
import { SectionHeader } from '../shared/SectionHeader';

export async function ContactInfo() {
  const t = await getTranslations('contact.info');
  return (
    <div>
      <SectionHeader
        eyebrow={t('eyebrow')}
        title={<span className="text-primary">{t('title')}</span>}
        description={t('subtitle')}
        animate={false}
      />

      <div className="mt-10 space-y-4 text-sm text-foreground/70">
        <ContactDetails {...CONTACT} socialSize="lg" />
      </div>
    </div>
  );
}
