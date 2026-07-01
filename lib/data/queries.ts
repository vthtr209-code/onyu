import type { Locale } from "@/lib/i18n/config";
import { articles } from "./articles";
import type { Article, SectionKey } from "./types";

export function getArticlesByLocale(locale: Locale): Article[] {
  return articles
    .filter((a) => a.language === locale && a.status === "published")
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
}

export function getArticlesBySection(locale: Locale, section: SectionKey): Article[] {
  return getArticlesByLocale(locale).filter((a) => a.sections.includes(section));
}

export function getArticleBySlug(locale: Locale, slug: string): Article | undefined {
  return articles.find(
    (a) => a.language === locale && a.slug === slug && a.status === "published"
  );
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return getArticlesByLocale(article.language)
    .filter(
      (a) =>
        a.translationGroupId !== article.translationGroupId &&
        (a.category === article.category ||
          a.tags.some((t) => article.tags.includes(t)))
    )
    .slice(0, limit);
}

export function getTranslations(article: Article): Article[] {
  return articles.filter(
    (a) => a.translationGroupId === article.translationGroupId
  );
}

export function getAllSlugsForLocale(locale: Locale): string[] {
  return getArticlesByLocale(locale).map((a) => a.slug);
}
