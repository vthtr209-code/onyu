"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { PageHeader } from "@/components/admin/PageHeader";

interface ArticleRow {
  id: string;
  title: string;
  language: string;
  status: string;
  publish_date: string | null;
  category_id: string | null;
  categories: { name: string } | null;
  article_sections: { section: string }[];
}

export default function ArticlesListPage() {
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    setLoading(true);
    const { data } = await supabase
      .from("articles")
      .select("id, title, language, status, publish_date, category_id, categories(name), article_sections(section)")
      .order("created_at", { ascending: false });
    setArticles((data as unknown as ArticleRow[]) ?? []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this article?")) return;
    await supabase.from("article_sections").delete().eq("article_id", id);
    await supabase.from("article_tags").delete().eq("article_id", id);
    await supabase.from("articles").delete().eq("id", id);
    loadArticles();
  }

  const filtered = articles.filter((a) => {
    if (langFilter !== "all" && a.language !== langFilter) return false;
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-6xl">
      <PageHeader
        title="Articles"
        description="Manage all articles across languages"
        action={{ label: "New Article", href: "/admin/articles/new" }}
      />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-md border border-line bg-paper px-4 py-2 text-[13.5px] text-ink outline-none focus:border-brass focus:ring-1 focus:ring-brass"
        />
        <select
          value={langFilter}
          onChange={(e) => setLangFilter(e.target.value)}
          className="rounded-md border border-line bg-paper px-3 py-2 text-[13.5px] text-ink-soft outline-none focus:border-brass"
        >
          <option value="all">All Languages</option>
          <option value="en">English</option>
          <option value="ko">Korean</option>
          <option value="vi">Vietnamese</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border border-line bg-paper px-3 py-2 text-[13.5px] text-ink-soft outline-none focus:border-brass"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <span className="ml-auto text-[12.5px] text-ink-soft/70">
          {loading ? "Loading..." : `${filtered.length} articles`}
        </span>
      </div>

      <div className="mt-5 overflow-hidden rounded-md border border-line/70">
        <table className="w-full text-left text-[13px]">
          <thead className="border-b border-line/70 bg-paper">
            <tr>
              <th className="px-4 py-3 font-medium text-ink-soft">Title</th>
              <th className="px-4 py-3 font-medium text-ink-soft">Category</th>
              <th className="px-4 py-3 font-medium text-ink-soft">Sections</th>
              <th className="px-4 py-3 font-medium text-ink-soft">Lang</th>
              <th className="px-4 py-3 font-medium text-ink-soft">Status</th>
              <th className="px-4 py-3 font-medium text-ink-soft">Date</th>
              <th className="px-4 py-3 font-medium text-ink-soft">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-b border-line/40 last:border-0 hover:bg-paper/60">
                <td className="max-w-[240px] truncate px-4 py-3 font-medium text-ink">
                  {a.title}
                </td>
                <td className="px-4 py-3 capitalize text-ink-soft">
                  {a.categories?.name ?? "—"}
                </td>
                <td className="px-4 py-3 text-ink-soft">
                  {a.article_sections?.map((s) => (
                    <span key={s.section} className="mr-1 inline-block rounded bg-line/50 px-1.5 py-0.5 text-[11px]">
                      {s.section}
                    </span>
                  ))}
                </td>
                <td className="px-4 py-3 uppercase text-ink-soft">{a.language}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                    a.status === "published" ? "bg-pine/10 text-pine" : "bg-brass/10 text-brass-deep"
                  }`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-soft">{a.publish_date ?? "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link href={`/admin/articles/${a.id}`} className="text-[12px] font-medium text-brass-deep hover:underline">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(a.id)} className="text-[12px] font-medium text-red-600/70 hover:text-red-700">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
