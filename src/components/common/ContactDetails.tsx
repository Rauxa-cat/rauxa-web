import { Link } from '@/i18n/navigation';
import { Mail, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SocialActions } from '@/components/common/SocialActions';
import { getTranslations } from 'next-intl/server';

type ContactDetailsProps = {
  email: string;
  phoneDisplay: string;
  phoneE164: string;
  location: string;
  whatsappUrl: string;
  instagramUrl: string;

  /** Opcionales */
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
    <div className={cn('space-y-6', className)}>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Mail className="size-4" />
          <a
            href={`mailto:${email}`}
            className="underline-offset-4 hover:underline"
          >
            {email}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="size-4" />
          <a
            href={`tel:${phoneE164}`}
            className="underline-offset-4 hover:underline"
          >
            {phoneDisplay}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="size-4" />
          <span>{location}</span>
        </div>

        {servicesLink && (
          <div className="pt-2">
            {t('lookingFor')}{' '}
            <Link
              href="/services"
              className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
            >
              {t('viewServices')} <span aria-hidden>→</span>
            </Link>
          </div>
        )}
      </div>

      <SocialActions
        whatsappUrl={whatsappUrl}
        instagramUrl={instagramUrl}
        size={socialSize}
      />
    </div>
  );
}
