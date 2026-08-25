import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { Logo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-page items-center px-6">
        <Logo />

        <DesktopNav />

        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-0">
            <LanguageSelector />
            <ThemeToggle />
          </div>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
