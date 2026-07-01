"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";

export function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();

  function pathFor(locale: Locale) {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }

  return (
    <div className="flex items-center gap-1 text-[13px] tracking-wide">
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          <Link
            href={pathFor(locale)}
            className={
              locale === current
                ? "text-ink font-semibold"
                : "text-ink-soft/70 hover:text-brass-deep transition-colors"
            }
            aria-current={locale === current ? "true" : undefined}
          >
            {localeNames[locale]}
          </Link>
          {i < locales.length - 1 && (
            <span className="text-line select-none">/</span>
          )}
        </span>
      ))}
    </div>
  );
}
