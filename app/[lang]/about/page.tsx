import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { OnyuLogo } from "@/components/OnyuLogo";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center lg:px-10">
      <OnyuLogo size={56} className="mx-auto" />
      <h1 className="font-display mt-8 text-[32px] text-ink md:text-[40px]">
        {dict.about.title}
      </h1>
      <p className="mt-6 text-[16px] leading-[1.85] text-ink-soft">
        {dict.about.body}
      </p>
    </div>
  );
}
