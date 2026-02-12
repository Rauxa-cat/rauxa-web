'use client';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { NAV_ITEMS } from '@/lib/content/nav';

export function DesktopNav() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  return (
    <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={[
              'relative transition-colors duration-100 font-medium',
              'after:absolute after:bottom-0 after:left-0 after:h-px after:w-full',
              'after:origin-left after:bg-current after:transition-transform after:duration-150',
              isActive
                ? 'text-primary after:scale-x-100'
                : 'text-foreground/80 hover:text-primary after:scale-x-0 hover:after:scale-x-100',
            ].join(' ')}
          >
            {t(item.href)}
          </Link>
        );
      })}
    </nav>
  );
}
