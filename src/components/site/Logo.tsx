import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  const t = useTranslations('logo');
  return (
    <Link
      href="/"
      aria-label={t('ariaLabel')}
      className={`flex items-center ${className ?? ''}`}
    >
      <Image
        src="/images/logo-rauxa.webp"
        alt={t('alt')}
        width={2467}
        height={407}
        className="w-24 h-auto"
        loading="eager"
      />
    </Link>
  );
}
