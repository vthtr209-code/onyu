import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { OnyuLogo } from "./OnyuLogo";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  const exploreLinks = [
    { href: `/${locale}#latest`, label: dict.sections.latest },
    { href: `/${locale}#featured`, label: dict.sections.featured },
    { href: `/${locale}#research`, label: dict.sections.research },
    { href: `/${locale}#popular`, label: dict.sections.popular },
    { href: `/${locale}#healing`, label: dict.sections.healing },
  ];

  return (
    <footer className="mt-24 border-t border-line/70 bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <OnyuLogo size={30} />
              <span className="font-display text-lg text-ink">Onyu</span>
            </div>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-ink-soft">
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-soft/70">
              {dict.footer.explore}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-ink-soft transition-colors hover:text-brass-deep"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-soft/70">
              {dict.footer.company}
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-[14px] text-ink-soft transition-colors hover:text-brass-deep"
                >
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@onyu.co"
                  className="text-[14px] text-ink-soft transition-colors hover:text-brass-deep"
                >
                  {dict.footer.contact}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-rule mt-12" />

        <div className="mt-6 flex flex-col items-start justify-between gap-2 text-[12.5px] text-ink-soft/70 sm:flex-row sm:items-center">
          <p>© {year} Onyu. {dict.footer.rights}</p>
          <p className="italic">온유 · Onyu · An Nhiên</p>
        </div>
      </div>
    </footer>
  );
}
