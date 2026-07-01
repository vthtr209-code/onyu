import type { Locale } from "@/lib/i18n/config";

export type CategoryKey =
  | "burnout"
  | "career"
  | "sleep"
  | "workplace"
  | "energy"
  | "leadership";

export type SectionKey =
  | "latest"
  | "featured"
  | "research"
  | "popular"
  | "healing";

export type ArticleStatus = "draft" | "published";

export interface Article {
  id: string;
  translationGroupId: string;
  language: Locale;
  title: string;
  slug: string;
  summary: string;
  content: string[];
  coverImage: string;
  category: CategoryKey;
  sections: SectionKey[];
  tags: string[];
  author: string;
  readingTime: number;
  status: ArticleStatus;
  publishDate: string;
  seoTitle?: string;
  seoDescription?: string;
}
