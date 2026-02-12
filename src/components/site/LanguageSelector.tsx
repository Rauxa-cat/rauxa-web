'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

type Props = {
  className?: string;
};

const { locales } = routing;

export function LanguageSelector({ className }: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('locale');

  function handleLocaleChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'inline-flex items-center gap-1.5 font-medium',
          'px-2 py-1 rounded-md',
          'transition-colors duration-150',
          'hover:text-primary data-[state=open]:text-primary',
          // 'hover:bg-foreground/5 data-[state=open]:bg-foreground/5',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
          'focus:outline-none cursor-pointer',
          className,
        )}
      >
        <span>{t(locale)}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-16">
        {locales.map((code) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLocaleChange(code)}
            className={cn(
              'flex items-center gap-2 cursor-pointer',
              locale === code && 'font-medium',
            )}
          >
            <span>{t(code)}</span>
            {locale === code && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
