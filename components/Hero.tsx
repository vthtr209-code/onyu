import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="relative overflow-hidden border-b border-line/70">
      <div
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, #a97c50 0%, transparent 45%), radial-gradient(circle at 85% 75%, #2f3b32 0%, transparent 45%)",
        }}
      />
      <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10 lg:py-32">
        <span className="text-[12px] font-semibold uppercase tracking-[0.25em] text-brass-deep">
          {dict.hero.eyebrow}
        </span>
        <h1 className="font-display mt-5 text-[36px] leading-[1.2] text-ink text-balance md:text-[52px]">
          {dict.hero.title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-[15.5px] leading-relaxed text-ink-soft">
          {dict.hero.subtitle}
        </p>
        <div className="mt-9">
          <Link
            href={`/${locale}#latest`}
            className="inline-flex items-center gap-2 border-b border-brass-deep pb-1 text-[14px] font-semibold tracking-wide text-brass-deep transition-colors hover:text-ink hover:border-ink"
          >
            {dict.hero.cta}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
