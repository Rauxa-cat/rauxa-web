import Link from 'next/link';
import Image from 'next/image';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="RAUXA - Inicio"
      className={`flex items-center ${className ?? ''}`}
    >
      <Image
        src="/images/logo-rauxa.webp"
        alt="RAUXA - Experiencias culturales y gastronómicas"
        width={2467}
        height={407}
        className="w-24 h-auto"
        loading="eager"
      />
    </Link>
  );
}
