import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { OnyuLogo } from "./OnyuLogo";

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const navItems: { href: string; label: string }[] = [
    { href: `/${locale}#latest`, label: dict.nav.latest },
    { href: `/${locale}#featured`, label: dict.nav.featured },
    { href: `/${locale}#research`, label: dict.nav.research },
    { href: `/${locale}#popular`, label: dict.nav.popular },
    { href: `/${locale}#healing`, label: dict.nav.healing },
    { href: `/${locale}/about`, label: dict.nav.about },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 shrink-0"
          aria-label="Onyu — home"
        >
          <OnyuLogo size={34} />
          <span className="font-display text-xl leading-none text-ink">
            Onyu
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13.5px] font-medium tracking-wide text-ink-soft transition-colors hover:text-brass-deep"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher current={locale} />
        </div>
      </div>

      <nav className="flex items-center gap-5 overflow-x-auto border-t border-line/60 px-6 py-2.5 text-[12.5px] tracking-wide text-ink-soft lg:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap transition-colors hover:text-brass-deep"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
