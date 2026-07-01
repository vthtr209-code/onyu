import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  getArticleBySlug,
  getAllSlugsForLocale,
  getRelatedArticles,
} from "@/lib/data/queries";
import { CoverImage } from "@/components/CoverImage";
import { ArticleCard } from "@/components/ArticleCard";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getAllSlugsForLocale(lang).map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const article = getArticleBySlug(lang, slug);
  if (!article) return {};
  return {
    title: `${article.seoTitle ?? article.title} | Onyu`,
    description: article.seoDescription ?? article.summary,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = getDictionary(locale);

  const article = getArticleBySlug(locale, slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3);

  const dateFormatted = new Intl.DateTimeFormat(
    locale === "ko" ? "ko-KR" : locale === "vi" ? "vi-VN" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  ).format(new Date(article.publishDate));

  return (
    <article>
      <div className="mx-auto max-w-3xl px-6 pt-14 lg:px-10">
        <Link
          href={`/${locale}#${article.sections[0] ?? "latest"}`}
          className="text-[13px] font-medium text-ink-soft transition-colors hover:text-brass-deep"
        >
          ← {dict.article.backToHome}
        </Link>

        <div className="mt-8">
          <span className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-brass-deep">
            {dict.categories[article.category]}
          </span>
          <h1 className="font-display mt-4 text-[32px] leading-[1.2] text-ink text-balance md:text-[44px]">
            {article.title}
          </h1>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">
            {article.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-[13px] text-ink-soft/80">
            <span>
              {dict.article.by} {article.author}
            </span>
            <span aria-hidden>·</span>
            <span>{dateFormatted}</span>
            <span aria-hidden>·</span>
            <span>
              {article.readingTime} {dict.article.readingTime}
            </span>
          </div>
        </div>
      </div>

      <CoverImage
        id={article.coverImage}
        label={article.title}
        className="mx-auto mt-10 aspect-[16/9] w-full max-w-5xl rounded-sm px-0 lg:rounded-md"
      />

      <div className="mx-auto max-w-3xl px-6 py-14 lg:px-10">
        <div className="space-y-6">
          {article.content.map((paragraph, i) => (
            <p
              key={i}
              className="text-[16.5px] leading-[1.85] text-ink-soft first:text-[18px] first:text-ink"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-soft/60">
            {dict.article.tags}
          </span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-3 py-1 text-[12.5px] text-ink-soft"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line/70 bg-paper">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
            <h2 className="font-display text-[24px] text-ink">
              {dict.article.relatedTitle}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
