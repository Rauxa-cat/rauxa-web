import { Link } from '@/i18n/navigation';
import { Mail, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SocialActions } from './SocialActions';
import { getTranslations } from 'next-intl/server';
import { ArrowIcon } from '@/components/icons/ArrowIcon';

type ContactDetailsProps = {
  email: string;
  phoneDisplay: string;
  phoneE164: string;
  location: string;
  whatsappUrl: string;
  instagramUrl: string;

  className?: string;
  servicesLink?: boolean;
  socialSize?: 'default' | 'lg';
};

export async function ContactDetails({
  email,
  phoneDisplay,
  phoneE164,
  location,
  whatsappUrl,
  instagramUrl,
  className,
  servicesLink = true,
  socialSize = 'default',
}: ContactDetailsProps) {
  const t = await getTranslations('contactDetails');
  return (
    <div className={cn('flex flex-col items-start gap-8', className)}>
      <div className="flex flex-col gap-5 text-[17px]">
        <div className="flex items-center gap-3.5">
          <Mail className="size-5 shrink-0 text-blue-ink" aria-hidden />
          <a
            href={`mailto:${email}`}
            className="underline-offset-4 hover:underline"
          >
            {email}
          </a>
        </div>

        <div className="flex items-center gap-3.5">
          <Phone className="size-5 shrink-0 text-blue-ink" aria-hidden />
          <a
            href={`tel:${phoneE164}`}
            className="underline-offset-4 hover:underline"
          >
            {phoneDisplay}
          </a>
        </div>

        <div className="flex items-center gap-3.5 text-foreground/80">
          <MapPin className="size-5 shrink-0 text-blue-ink" aria-hidden />
          <span>{location}</span>
        </div>
      </div>

      {servicesLink && (
        <p className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          {t('lookingFor')}{' '}
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-blue-ink underline-offset-4 hover:underline"
          >
            {t('viewServices')} <ArrowIcon />
          </Link>
        </p>
      )}

      <SocialActions
        whatsappUrl={whatsappUrl}
        instagramUrl={instagramUrl}
        size={socialSize}
      />
    </div>
  );
}
