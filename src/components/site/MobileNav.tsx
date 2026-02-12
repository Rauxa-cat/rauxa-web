'use client';

import { Menu } from 'lucide-react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Link } from '@/i18n/navigation';
import { NAV_ITEMS } from '@/lib/content/nav';
import { Logo } from './Logo';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useTranslations } from 'next-intl';
import { LanguageSelector } from './LanguageSelector';

export function MobileNav() {
  const tNav = useTranslations('nav');
  const t = useTranslations('mobileNav');

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={t('openMenu')}
            className="
      hover:bg-transparent
      hover:text-current
      focus-visible:bg-transparent
      cursor-pointer
    "
          >
            <Menu className="size-6" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-full max-w-none! [&>button]:hidden"
        >
          <SheetHeader className="flex flex-row items-center justify-between">
            <VisuallyHidden>
              <SheetTitle>{t('mainMenu')}</SheetTitle>
              <SheetDescription>{t('mainMenuDescription')}</SheetDescription>
            </VisuallyHidden>

            <Logo />

            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={t('closeMenu')}
                className="
                    h-11 w-11
        hover:bg-transparent
        hover:text-current
        focus-visible:bg-transparent
        cursor-pointer
      "
              >
                <X className="size-6" />
              </Button>
            </SheetClose>
          </SheetHeader>

          <nav className="ml-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <SheetClose asChild key={item.href}>
                <Link href={item.href} className="text-base hover:text-primary">
                  {tNav(item.href)}
                </Link>
              </SheetClose>
            ))}
          </nav>

          <div className="ml-2">
            <LanguageSelector />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
