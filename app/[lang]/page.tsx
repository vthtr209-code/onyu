import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getArticlesBySection } from "@/lib/data/queries";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ArticleCard } from "@/components/ArticleCard";
import { Newsletter } from "@/components/Newsletter";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = getDictionary(locale);

  const latest = getArticlesBySection(locale, "latest");
  const featured = getArticlesBySection(locale, "featured");
  const research = getArticlesBySection(locale, "research");
  const popular = getArticlesBySection(locale, "popular");
  const healing = getArticlesBySection(locale, "healing");

  return (
    <>
      <Hero locale={locale} />

      {latest.length > 0 && (
        <section id="latest" className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <SectionHeading
            eyebrow="Onyu"
            title={dict.sections.latest}
            subtitle={dict.sections.latestSub}
          />
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((article) => (
              <ArticleCard key={article.id} article={article} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section
          id="featured"
          className="border-y border-line/70 bg-paper"
        >
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
            <SectionHeading
              eyebrow="Onyu"
              title={dict.sections.featured}
              subtitle={dict.sections.featuredSub}
            />
            <div className="mt-12 flex flex-col gap-16">
              {featured.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  locale={locale}
                  variant="featured"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {research.length > 0 && (
        <section id="research" className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <SectionHeading
            eyebrow="Onyu"
            title={dict.sections.research}
            subtitle={dict.sections.researchSub}
          />
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {research.map((article) => (
              <ArticleCard key={article.id} article={article} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {(popular.length > 0 || healing.length > 0) && (
        <section className="border-t border-line/70 bg-paper">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 py-20 lg:grid-cols-2 lg:px-10">
            {popular.length > 0 && (
              <div id="popular">
                <SectionHeading
                  title={dict.sections.popular}
                  subtitle={dict.sections.popularSub}
                />
                <div className="mt-8 flex flex-col gap-7">
                  {popular.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      locale={locale}
                      variant="compact"
                    />
                  ))}
                </div>
              </div>
            )}

            {healing.length > 0 && (
              <div id="healing">
                <SectionHeading
                  title={dict.sections.healing}
                  subtitle={dict.sections.healingSub}
                />
                <div className="mt-8 flex flex-col gap-7">
                  {healing.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      locale={locale}
                      variant="compact"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <Newsletter locale={locale} />
    </>
  );
}
