import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Article } from "@/lib/data/types";
import { CoverImage } from "./CoverImage";

export function ArticleCard({
  article,
  locale,
  variant = "default",
}: {
  article: Article;
  locale: Locale;
  variant?: "default" | "featured" | "compact";
}) {
  const dict = getDictionary(locale);
  const href = `/${locale}/articles/${article.slug}`;

  if (variant === "featured") {
    return (
      <Link
        href={href}
        className="group grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center"
      >
        <CoverImage
          id={article.coverImage}
          label={article.title}
          className="aspect-[4/3] w-full rounded-sm transition-transform duration-500 group-hover:scale-[1.01]"
        />
        <div>
          <span className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-brass-deep">
            {dict.categories[article.category]}
          </span>
          <h3 className="font-display mt-3 text-[28px] leading-[1.2] text-ink text-balance md:text-[32px]">
            {article.title}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            {article.summary}
          </p>
          <div className="mt-5 flex items-center gap-3 text-[13px] text-ink-soft/80">
            <span>{article.author}</span>
            <span aria-hidden>·</span>
            <span>
              {article.readingTime} {dict.article.readingTime}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={href} className="group flex gap-4">
        <CoverImage
          id={article.coverImage}
          label={article.title}
          className="h-20 w-20 shrink-0 rounded-sm"
        />
        <div className="min-w-0">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brass-deep">
            {dict.categories[article.category]}
          </span>
          <h4 className="font-display mt-1.5 text-[16px] leading-snug text-ink transition-colors group-hover:text-brass-deep text-balance">
            {article.title}
          </h4>
          <p className="mt-1 text-[12.5px] text-ink-soft/80">
            {article.readingTime} {dict.article.readingTime}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="group block">
      <CoverImage
        id={article.coverImage}
        label={article.title}
        className="aspect-[4/3] w-full rounded-sm transition-transform duration-500 group-hover:scale-[1.01]"
      />
      <span className="mt-4 block text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-deep">
        {dict.categories[article.category]}
      </span>
      <h3 className="font-display mt-2 text-[19px] leading-snug text-ink transition-colors group-hover:text-brass-deep text-balance">
        {article.title}
      </h3>
      <p className="mt-2.5 text-[14px] leading-relaxed text-ink-soft line-clamp-2">
        {article.summary}
      </p>
      <div className="mt-3 flex items-center gap-3 text-[12.5px] text-ink-soft/70">
        <span>{article.author}</span>
        <span aria-hidden>·</span>
        <span>
          {article.readingTime} {dict.article.readingTime}
        </span>
      </div>
    </Link>
  );
}
