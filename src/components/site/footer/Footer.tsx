import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/site/Logo';
import { FOOTER_NAV, FOOTER_CONTACT, FOOTER_LEGAL } from './footer.constants';
import { FooterSocial } from './FooterSocial';
import { ContactDetails } from '@/components/contact/ContactDetails';
import { getTranslations } from 'next-intl/server';

export async function Footer() {
  const tFooter = await getTranslations('footer');
  const tNav = await getTranslations('nav');
  const tLegal = await getTranslations('legal');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-footer">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-5 md:pr-6">
            <Logo className="opacity-95" />

            <p className="max-w-sm leading-6 ">{tFooter('copy')}</p>
          </div>

          <div className="space-y-4">
            <p className="tracking-[0.15em]">{tFooter('navigation')}</p>

            <nav className="grid gap-2">
              {FOOTER_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className=" underline-offset-4  hover:underline"
                >
                  {tNav(item.href)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <p className="tracking-[0.15em] ">{tFooter('contact')}</p>
            <ContactDetails
              {...FOOTER_CONTACT}
              servicesLink
              socialSize="default"
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm">{tFooter('copyright', { year })}</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {FOOTER_LEGAL.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className=" underline-offset-4  hover:underline"
              >
                {tLegal(item.href)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
