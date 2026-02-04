'use client';

import { Menu } from 'lucide-react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { NAV_ITEMS } from '@/lib/content/nav';
import { Logo } from './Logo';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export function MobileNav() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Abrir menú"
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
              <SheetTitle>Menú principal</SheetTitle>
            </VisuallyHidden>
            <Logo />
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Cerrar menú"
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
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base hover:text-primary"
                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
