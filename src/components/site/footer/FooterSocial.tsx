import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SocialActions } from '@/components/common/SocialActions';

type FooterSocialProps = {
  email: string;
  phoneDisplay: string;
  phoneE164: string;
  location: string;
  whatsappUrl: string;
  instagramUrl: string;
  className?: string;
};

export function FooterSocial({
  email,
  phoneDisplay,
  phoneE164,
  location,
  whatsappUrl,
  instagramUrl,
  className,
}: FooterSocialProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="space-y-3 text-sm ">
        <div className="flex items-center gap-3">
          <Mail className="size-4" />
          <a
            href={`mailto:${email}`}
            className="underline-offset-4 hover:text-foreground hover:underline"
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

        <div className="pt-2 text-sm">
          ¿Buscas algo concreto?{' '}
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
          >
            Ver servicios <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <SocialActions
        whatsappUrl={whatsappUrl}
        instagramUrl={instagramUrl}
        size="default"
      />
    </div>
  );
}
