import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function Newsletter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="bg-pine">
      <div className="mx-auto max-w-6xl px-6 py-20 text-center lg:px-10">
        <h2 className="font-display text-[26px] leading-tight text-ivory md:text-[32px]">
          {dict.newsletter.title}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-ivory/70">
          {dict.newsletter.subtitle}
        </p>

        <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder={dict.newsletter.placeholder}
            className="w-full rounded-sm border border-ivory/20 bg-ivory/5 px-4 py-3 text-[14px] text-ivory placeholder:text-ivory/40 outline-none focus:border-brass focus:ring-1 focus:ring-brass"
          />
          <button
            type="submit"
            className="shrink-0 rounded-sm bg-brass px-6 py-3 text-[13.5px] font-semibold tracking-wide text-ink transition-colors hover:bg-brass-deep hover:text-ivory"
          >
            {dict.newsletter.cta}
          </button>
        </form>
        <p className="mt-4 text-[12px] text-ivory/40">
          {dict.newsletter.disclaimer}
        </p>
      </div>
    </section>
  );
}
