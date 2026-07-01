"use client";

import { useState } from "react";
import Link from "next/link";
import type { Article, CategoryKey, SectionKey } from "@/lib/data/types";

const categories: { key: CategoryKey; label: string }[] = [
  { key: "burnout", label: "Burnout" },
  { key: "career", label: "Career" },
  { key: "sleep", label: "Sleep" },
  { key: "workplace", label: "Workplace" },
  { key: "energy", label: "Energy" },
  { key: "leadership", label: "Leadership" },
];

const sections: { key: SectionKey; label: string }[] = [
  { key: "latest", label: "Latest Articles" },
  { key: "featured", label: "Featured Topic" },
  { key: "research", label: "Research Highlights" },
  { key: "popular", label: "Popular Reads" },
  { key: "healing", label: "Healing Journey" },
];

const tags = ["burnout", "stress", "career", "sleep", "wellbeing"];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

interface ArticleFormProps {
  initial?: Partial<Article>;
  mode: "create" | "edit";
}

export function ArticleForm({ initial, mode }: ArticleFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [language, setLanguage] = useState(initial?.language ?? "en");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [content, setContent] = useState(initial?.content?.join("\n\n") ?? "");
  const [category, setCategory] = useState<CategoryKey>(initial?.category ?? "burnout");
  const [selectedSections, setSelectedSections] = useState<SectionKey[]>(
    initial?.sections ?? []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(initial?.tags ?? []);
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [readingTime, setReadingTime] = useState(initial?.readingTime ?? 5);
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(initial?.seoDescription ?? "");

  function handleTitleChange(value: string) {
    setTitle(value);
    if (mode === "create") setSlug(slugify(value));
  }

  function toggleSection(key: SectionKey) {
    setSelectedSections((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    );
  }

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function handleSubmit(status: "draft" | "published") {
    const data = {
      title,
      slug,
      language,
      summary,
      content: content.split("\n\n").filter(Boolean),
      category,
      sections: selectedSections,
      tags: selectedTags,
      author,
      readingTime,
      seoTitle,
      seoDescription,
      status,
    };
    // TODO: Connect to Supabase
    console.log(`[${mode}] Article data:`, data);
    alert(`Article ${status === "published" ? "published" : "saved as draft"}! (Demo mode — connect Supabase to persist)`);
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/articles"
          className="text-[13px] text-ink-soft hover:text-brass-deep"
        >
          ← Back to Articles
        </Link>
      </div>

      <h1 className="font-display mt-6 text-[24px] text-ink">
        {mode === "create" ? "New Article" : "Edit Article"}
      </h1>

      <div className="mt-8 space-y-8">
        {/* Language */}
        <fieldset>
          <legend className="text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">
            Language
          </legend>
          <div className="mt-2 flex gap-3">
            {(["en", "ko", "vi"] as const).map((l) => (
              <label
                key={l}
                className={`cursor-pointer rounded-md border px-4 py-2 text-[13px] font-medium transition-colors ${
                  language === l
                    ? "border-brass bg-brass/10 text-brass-deep"
                    : "border-line text-ink-soft hover:border-brass/50"
                }`}
              >
                <input
                  type="radio"
                  name="language"
                  value={l}
                  checked={language === l}
                  onChange={() => setLanguage(l)}
                  className="sr-only"
                />
                {l === "en" ? "English" : l === "ko" ? "Korean" : "Vietnamese"}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Title */}
        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="mt-2 w-full rounded-md border border-line bg-paper px-4 py-2.5 text-[15px] text-ink outline-none focus:border-brass focus:ring-1 focus:ring-brass"
            placeholder="Article title"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">
            Slug
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-2 w-full rounded-md border border-line bg-paper px-4 py-2.5 text-[14px] font-mono text-ink-soft outline-none focus:border-brass focus:ring-1 focus:ring-brass"
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">
            Short Description
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            className="mt-2 w-full rounded-md border border-line bg-paper px-4 py-2.5 text-[14px] text-ink outline-none focus:border-brass focus:ring-1 focus:ring-brass"
            placeholder="Brief summary for cards and SEO"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">
            Content
          </label>
          <p className="mt-1 text-[12px] text-ink-soft/60">
            Separate paragraphs with blank lines. (Rich text editor will be added with Tiptap)
          </p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="mt-2 w-full rounded-md border border-line bg-paper px-4 py-3 text-[14px] leading-relaxed text-ink outline-none focus:border-brass focus:ring-1 focus:ring-brass"
            placeholder="Write your article content here..."
          />
        </div>

        {/* Author + Reading Time */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mt-2 w-full rounded-md border border-line bg-paper px-4 py-2.5 text-[14px] text-ink outline-none focus:border-brass focus:ring-1 focus:ring-brass"
            />
          </div>
          <div>
            <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">
              Reading Time (min)
            </label>
            <input
              type="number"
              value={readingTime}
              onChange={(e) => setReadingTime(Number(e.target.value))}
              min={1}
              className="mt-2 w-full rounded-md border border-line bg-paper px-4 py-2.5 text-[14px] text-ink outline-none focus:border-brass focus:ring-1 focus:ring-brass"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">
            Cover Image
          </label>
          <div className="mt-2 flex h-32 items-center justify-center rounded-md border-2 border-dashed border-line bg-paper text-[13px] text-ink-soft/60">
            Drag & drop or click to upload (Connect Supabase Storage)
          </div>
        </div>

        {/* Category */}
        <fieldset>
          <legend className="text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">
            Category
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((c) => (
              <label
                key={c.key}
                className={`cursor-pointer rounded-md border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                  category === c.key
                    ? "border-brass bg-brass/10 text-brass-deep"
                    : "border-line text-ink-soft hover:border-brass/50"
                }`}
              >
                <input
                  type="radio"
                  name="category"
                  value={c.key}
                  checked={category === c.key}
                  onChange={() => setCategory(c.key)}
                  className="sr-only"
                />
                {c.label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Sections */}
        <fieldset>
          <legend className="text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">
            Homepage Sections
          </legend>
          <p className="mt-1 text-[12px] text-ink-soft/60">
            Select one or more sections where this article appears.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {sections.map((s) => (
              <label
                key={s.key}
                className={`cursor-pointer rounded-md border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                  selectedSections.includes(s.key)
                    ? "border-brass bg-brass/10 text-brass-deep"
                    : "border-line text-ink-soft hover:border-brass/50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedSections.includes(s.key)}
                  onChange={() => toggleSection(s.key)}
                  className="sr-only"
                />
                {s.label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Tags */}
        <fieldset>
          <legend className="text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">
            Tags
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <label
                key={tag}
                className={`cursor-pointer rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? "border-brass bg-brass/10 text-brass-deep"
                    : "border-line text-ink-soft hover:border-brass/50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => toggleTag(tag)}
                  className="sr-only"
                />
                #{tag}
              </label>
            ))}
          </div>
        </fieldset>

        {/* SEO */}
        <div className="space-y-4 rounded-md border border-line/70 bg-paper p-5">
          <h3 className="text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">
            SEO
          </h3>
          <div>
            <label className="text-[12px] text-ink-soft">SEO Title</label>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className="mt-1 w-full rounded-md border border-line bg-ivory px-3 py-2 text-[13.5px] text-ink outline-none focus:border-brass"
              placeholder={title ? `${title} | Onyu` : "SEO title"}
            />
          </div>
          <div>
            <label className="text-[12px] text-ink-soft">Meta Description</label>
            <textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-md border border-line bg-ivory px-3 py-2 text-[13.5px] text-ink outline-none focus:border-brass"
              placeholder={summary || "Meta description for search engines"}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 border-t border-line/70 pt-6">
          <button
            type="button"
            onClick={() => handleSubmit("published")}
            className="rounded-md bg-brass px-6 py-2.5 text-[13.5px] font-semibold text-ink transition-colors hover:bg-brass-deep hover:text-ivory"
          >
            {mode === "create" ? "Publish" : "Update"}
          </button>
          <button
            type="button"
            onClick={() => handleSubmit("draft")}
            className="rounded-md border border-line px-6 py-2.5 text-[13.5px] font-medium text-ink-soft transition-colors hover:border-brass hover:text-brass-deep"
          >
            Save Draft
          </button>
          <Link
            href="/admin/articles"
            className="ml-auto text-[13px] text-ink-soft/70 hover:text-ink"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
