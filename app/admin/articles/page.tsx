"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/admin/PageHeader";
import { articles } from "@/lib/data/articles";
import type { Article } from "@/lib/data/types";

export default function ArticlesListPage() {
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = articles
    .filter((a) => {
      if (langFilter !== "all" && a.language !== langFilter) return false;
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));

  return (
    <div className="max-w-6xl">
      <PageHeader
        title="Articles"
        description="Manage all articles across languages"
        action={{ label: "New Article", href: "/admin/articles/new" }}
      />

      {/* Filters */}
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
          {filtered.length} articles
        </span>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-hidden rounded-md border border-line/70">
        <table className="w-full text-left text-[13px]">
          <thead className="border-b border-line/70 bg-paper">
            <tr>
              <th className="px-4 py-3 font-medium text-ink-soft">Title</th>
              <th className="px-4 py-3 font-medium text-ink-soft">Category</th>
              <th className="px-4 py-3 font-medium text-ink-soft">Section</th>
              <th className="px-4 py-3 font-medium text-ink-soft">Lang</th>
              <th className="px-4 py-3 font-medium text-ink-soft">Status</th>
              <th className="px-4 py-3 font-medium text-ink-soft">Date</th>
              <th className="px-4 py-3 font-medium text-ink-soft">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <ArticleRow key={a.id} article={a} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ArticleRow({ article: a }: { article: Article }) {
  return (
    <tr className="border-b border-line/40 last:border-0 hover:bg-paper/60">
      <td className="max-w-[240px] truncate px-4 py-3 font-medium text-ink">
        {a.title}
      </td>
      <td className="px-4 py-3 capitalize text-ink-soft">{a.category}</td>
      <td className="px-4 py-3 text-ink-soft">
        {a.sections.map((s) => (
          <span
            key={s}
            className="mr-1 inline-block rounded bg-line/50 px-1.5 py-0.5 text-[11px]"
          >
            {s}
          </span>
        ))}
      </td>
      <td className="px-4 py-3 uppercase text-ink-soft">{a.language}</td>
      <td className="px-4 py-3">
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
            a.status === "published"
              ? "bg-pine/10 text-pine"
              : "bg-brass/10 text-brass-deep"
          }`}
        >
          {a.status}
        </span>
      </td>
      <td className="px-4 py-3 text-ink-soft">{a.publishDate}</td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <Link
            href={`/admin/articles/${a.id}`}
            className="text-[12px] font-medium text-brass-deep hover:underline"
          >
            Edit
          </Link>
          <button className="text-[12px] font-medium text-red-600/70 hover:text-red-700">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
