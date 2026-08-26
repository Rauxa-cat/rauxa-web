import { CONTACT } from './contact.constants';
import { ContactDetails } from '@/components/contact/ContactDetails';
import { getTranslations } from 'next-intl/server';
import { SectionHeader } from '../shared/SectionHeader';

export async function ContactInfo() {
  const t = await getTranslations('contact.info');
  return (
    <div className="flex flex-col items-start">
      <SectionHeader
        as="h1"
        size="display"
        animate={false}
        eyebrow={t('eyebrow')}
        title={
          <span className="text-primary [text-shadow:0_0_62px_rgba(0,76,255,0.55)]">
            {t('title')}
          </span>
        }
      />

      <p className="mt-8 max-w-140 font-accent text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.38] text-foreground/80">
        {t('subtitle')}
      </p>

      <ContactDetails {...CONTACT} className="mt-11" socialSize="lg" />
    </div>
  );
}
