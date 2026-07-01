"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
}

const sectionOptions = [
  { key: "latest", label: "Latest Articles" },
  { key: "featured", label: "Featured Topic" },
  { key: "research", label: "Research Highlights" },
  { key: "popular", label: "Popular Reads" },
  { key: "healing", label: "Healing Journey" },
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

interface ArticleFormProps {
  articleId?: string;
}

export function ArticleForm({ articleId }: ArticleFormProps) {
  const router = useRouter();
  const isEdit = !!articleId;

  const [categories, setCategories] = useState<Category[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [language, setLanguage] = useState("en");
  const [translationGroupId, setTranslationGroupId] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [author, setAuthor] = useState("");
  const [readingTime, setReadingTime] = useState(5);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  useEffect(() => {
    async function load() {
      const [{ data: cats }, { data: tags }] = await Promise.all([
        supabase.from("categories").select("id, name, slug").order("name"),
        supabase.from("tags").select("id, name").order("name"),
      ]);
      setCategories(cats ?? []);
      setAllTags(tags ?? []);

      if (isEdit) {
        const { data: article } = await supabase
          .from("articles")
          .select("*, article_sections(section), article_tags(tag_id)")
          .eq("id", articleId)
          .single();

        if (article) {
          setTitle(article.title);
          setSlug(article.slug);
          setLanguage(article.language);
          setTranslationGroupId(article.translation_group_id);
          setSummary(article.summary ?? "");
          setContent(article.content ?? "");
          setCategoryId(article.category_id ?? "");
          setSelectedSections(article.article_sections?.map((s: { section: string }) => s.section) ?? []);
          setSelectedTagIds(article.article_tags?.map((t: { tag_id: string }) => t.tag_id) ?? []);
          setAuthor(article.author ?? "");
          setReadingTime(article.reading_time ?? 5);
          setSeoTitle(article.seo_title ?? "");
          setSeoDescription(article.seo_description ?? "");
        }
      }

      setLoading(false);
    }
    load();
  }, [articleId, isEdit]);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!isEdit) setSlug(slugify(value));
  }

  function toggleSection(key: string) {
    setSelectedSections((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    );
  }

  function toggleTag(tagId: string) {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  }

  async function handleSubmit(status: "draft" | "published") {
    if (!title.trim() || !slug.trim()) {
      alert("Title and slug are required");
      return;
    }

    setSaving(true);

    const groupId = translationGroupId || slug;

    const articleData = {
      title,
      slug,
      language,
      translation_group_id: groupId,
      summary,
      content,
      category_id: categoryId || null,
      author,
      reading_time: readingTime,
      seo_title: seoTitle || null,
      seo_description: seoDescription || null,
      status,
      publish_date: status === "published" ? new Date().toISOString().slice(0, 10) : null,
    };

    let savedId = articleId;

    if (isEdit) {
      await supabase.from("articles").update(articleData).eq("id", articleId);
    } else {
      const { data } = await supabase.from("articles").insert(articleData).select("id").single();
      savedId = data?.id;
    }

    if (savedId) {
      // Update sections
      await supabase.from("article_sections").delete().eq("article_id", savedId);
      if (selectedSections.length > 0) {
        await supabase.from("article_sections").insert(
          selectedSections.map((section) => ({ article_id: savedId, section }))
        );
      }

      // Update tags
      await supabase.from("article_tags").delete().eq("article_id", savedId);
      if (selectedTagIds.length > 0) {
        await supabase.from("article_tags").insert(
          selectedTagIds.map((tag_id) => ({ article_id: savedId, tag_id }))
        );
      }
    }

    setSaving(false);
    router.push("/admin/articles");
  }

  if (loading) {
    return <div className="py-20 text-center text-ink-soft">Loading...</div>;
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/articles" className="text-[13px] text-ink-soft hover:text-brass-deep">
          ← Back to Articles
        </Link>
      </div>

      <h1 className="font-display mt-6 text-[24px] text-ink">
        {isEdit ? "Edit Article" : "New Article"}
      </h1>

      <div className="mt-8 space-y-8">
        {/* Language */}
        <fieldset>
          <legend className="text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">Language</legend>
          <div className="mt-2 flex gap-3">
            {(["en", "ko", "vi"] as const).map((l) => (
              <label key={l} className={`cursor-pointer rounded-md border px-4 py-2 text-[13px] font-medium transition-colors ${language === l ? "border-brass bg-brass/10 text-brass-deep" : "border-line text-ink-soft hover:border-brass/50"}`}>
                <input type="radio" name="language" value={l} checked={language === l} onChange={() => setLanguage(l)} className="sr-only" />
                {l === "en" ? "English" : l === "ko" ? "Korean" : "Vietnamese"}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Translation Group ID */}
        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">
            Translation Group ID
          </label>
          <p className="mt-1 text-[12px] text-ink-soft/60">
            Same ID links EN/KO/VI versions. Auto-generated from slug if empty.
          </p>
          <input
            type="text"
            value={translationGroupId}
            onChange={(e) => setTranslationGroupId(e.target.value)}
            className="mt-2 w-full rounded-md border border-line bg-paper px-4 py-2.5 text-[14px] font-mono text-ink-soft outline-none focus:border-brass focus:ring-1 focus:ring-brass"
            placeholder={slug || "auto-generated"}
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">Title</label>
          <input type="text" value={title} onChange={(e) => handleTitleChange(e.target.value)} className="mt-2 w-full rounded-md border border-line bg-paper px-4 py-2.5 text-[15px] text-ink outline-none focus:border-brass focus:ring-1 focus:ring-brass" placeholder="Article title" />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">Slug</label>
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-2 w-full rounded-md border border-line bg-paper px-4 py-2.5 text-[14px] font-mono text-ink-soft outline-none focus:border-brass focus:ring-1 focus:ring-brass" />
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">Short Description</label>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} className="mt-2 w-full rounded-md border border-line bg-paper px-4 py-2.5 text-[14px] text-ink outline-none focus:border-brass focus:ring-1 focus:ring-brass" placeholder="Brief summary" />
        </div>

        {/* Content */}
        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">Content</label>
          <p className="mt-1 text-[12px] text-ink-soft/60">Write in HTML or plain text. (Tiptap rich editor can be added later)</p>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12} className="mt-2 w-full rounded-md border border-line bg-paper px-4 py-3 text-[14px] leading-relaxed text-ink outline-none focus:border-brass focus:ring-1 focus:ring-brass" placeholder="Write your article content..." />
        </div>

        {/* Author + Reading Time */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">Author</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="mt-2 w-full rounded-md border border-line bg-paper px-4 py-2.5 text-[14px] text-ink outline-none focus:border-brass focus:ring-1 focus:ring-brass" />
          </div>
          <div>
            <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">Reading Time (min)</label>
            <input type="number" value={readingTime} onChange={(e) => setReadingTime(Number(e.target.value))} min={1} className="mt-2 w-full rounded-md border border-line bg-paper px-4 py-2.5 text-[14px] text-ink outline-none focus:border-brass focus:ring-1 focus:ring-brass" />
          </div>
        </div>

        {/* Category */}
        <fieldset>
          <legend className="text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">Category</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((c) => (
              <label key={c.id} className={`cursor-pointer rounded-md border px-3.5 py-2 text-[13px] font-medium transition-colors ${categoryId === c.id ? "border-brass bg-brass/10 text-brass-deep" : "border-line text-ink-soft hover:border-brass/50"}`}>
                <input type="radio" name="category" value={c.id} checked={categoryId === c.id} onChange={() => setCategoryId(c.id)} className="sr-only" />
                {c.name}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Sections */}
        <fieldset>
          <legend className="text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">Homepage Sections</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {sectionOptions.map((s) => (
              <label key={s.key} className={`cursor-pointer rounded-md border px-3.5 py-2 text-[13px] font-medium transition-colors ${selectedSections.includes(s.key) ? "border-brass bg-brass/10 text-brass-deep" : "border-line text-ink-soft hover:border-brass/50"}`}>
                <input type="checkbox" checked={selectedSections.includes(s.key)} onChange={() => toggleSection(s.key)} className="sr-only" />
                {s.label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Tags */}
        <fieldset>
          <legend className="text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">Tags</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <label key={tag.id} className={`cursor-pointer rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${selectedTagIds.includes(tag.id) ? "border-brass bg-brass/10 text-brass-deep" : "border-line text-ink-soft hover:border-brass/50"}`}>
                <input type="checkbox" checked={selectedTagIds.includes(tag.id)} onChange={() => toggleTag(tag.id)} className="sr-only" />
                #{tag.name}
              </label>
            ))}
          </div>
        </fieldset>

        {/* SEO */}
        <div className="space-y-4 rounded-md border border-line/70 bg-paper p-5">
          <h3 className="text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">SEO</h3>
          <div>
            <label className="text-[12px] text-ink-soft">SEO Title</label>
            <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="mt-1 w-full rounded-md border border-line bg-ivory px-3 py-2 text-[13.5px] text-ink outline-none focus:border-brass" placeholder={title ? `${title} | Onyu` : "SEO title"} />
          </div>
          <div>
            <label className="text-[12px] text-ink-soft">Meta Description</label>
            <textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} rows={2} className="mt-1 w-full rounded-md border border-line bg-ivory px-3 py-2 text-[13.5px] text-ink outline-none focus:border-brass" placeholder={summary || "Meta description"} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 border-t border-line/70 pt-6">
          <button type="button" onClick={() => handleSubmit("published")} disabled={saving} className="rounded-md bg-brass px-6 py-2.5 text-[13.5px] font-semibold text-ink transition-colors hover:bg-brass-deep hover:text-ivory disabled:opacity-50">
            {saving ? "Saving..." : isEdit ? "Update" : "Publish"}
          </button>
          <button type="button" onClick={() => handleSubmit("draft")} disabled={saving} className="rounded-md border border-line px-6 py-2.5 text-[13.5px] font-medium text-ink-soft transition-colors hover:border-brass hover:text-brass-deep disabled:opacity-50">
            Save Draft
          </button>
          <Link href="/admin/articles" className="ml-auto text-[13px] text-ink-soft/70 hover:text-ink">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
