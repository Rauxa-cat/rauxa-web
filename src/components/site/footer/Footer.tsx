import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/site/Logo';
import {
  FOOTER_COPY,
  FOOTER_NAV,
  FOOTER_CONTACT,
  FOOTER_LEGAL,
} from './footer.constants';
import { FooterSocial } from './FooterSocial';
import { ContactDetails } from '@/components/common/ContactDetails';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-footer">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-5 md:pr-6">
            <Logo className="opacity-95" />

            <p className="max-w-sm leading-6 ">{FOOTER_COPY}</p>
          </div>

          <div className="space-y-4">
            <p className="tracking-[0.15em] ">NAVEGACIÓN</p>

            <nav className="grid gap-2">
              {FOOTER_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className=" underline-offset-4  hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <p className="font-mono tracking-[0.15em] ">CONTACTO</p>
            <ContactDetails
              {...FOOTER_CONTACT}
              servicesLink
              socialSize="default"
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm">
            © {year} RAUXA. Todos los derechos reservados.
          </p>

          {/* <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
            {FOOTER_LEGAL.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className=" underline-offset-4  hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
}
