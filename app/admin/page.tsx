"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";

interface ArticleRow {
  id: string;
  title: string;
  language: string;
  status: string;
  publish_date: string | null;
}

export default function DashboardPage() {
  const [total, setTotal] = useState(0);
  const [published, setPublished] = useState(0);
  const [drafts, setDrafts] = useState(0);
  const [subscribers, setSubscribers] = useState(0);
  const [recent, setRecent] = useState<ArticleRow[]>([]);

  useEffect(() => {
    async function load() {
      const { count: totalCount } = await supabase
        .from("articles")
        .select("*", { count: "exact", head: true });

      const { count: pubCount } = await supabase
        .from("articles")
        .select("*", { count: "exact", head: true })
        .eq("status", "published");

      const { count: draftCount } = await supabase
        .from("articles")
        .select("*", { count: "exact", head: true })
        .eq("status", "draft");

      const { count: subCount } = await supabase
        .from("newsletter")
        .select("*", { count: "exact", head: true });

      const { data: recentData } = await supabase
        .from("articles")
        .select("id, title, language, status, publish_date")
        .order("created_at", { ascending: false })
        .limit(8);

      setTotal(totalCount ?? 0);
      setPublished(pubCount ?? 0);
      setDrafts(draftCount ?? 0);
      setSubscribers(subCount ?? 0);
      setRecent(recentData ?? []);
    }
    load();
  }, []);

  return (
    <div className="max-w-5xl">
      <PageHeader title="Dashboard" description="Overview of your content library" />

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Articles" value={total} icon="◉" />
        <StatCard label="Published" value={published} icon="✓" />
        <StatCard label="Drafts" value={drafts} icon="◌" />
        <StatCard label="Subscribers" value={subscribers} icon="✉" />
      </div>

      <div className="mt-10">
        <h2 className="text-[14px] font-semibold uppercase tracking-wider text-ink-soft/70">
          Quick Actions
        </h2>
        <div className="mt-4 flex gap-3">
          <Link
            href="/admin/articles/new"
            className="rounded-md bg-brass px-5 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-brass-deep hover:text-ivory"
          >
            + New Article
          </Link>
          <Link
            href="/admin/articles"
            className="rounded-md border border-line px-5 py-2.5 text-[13px] font-medium text-ink-soft transition-colors hover:border-brass hover:text-brass-deep"
          >
            View All Articles
          </Link>
        </div>
      </div>

      {recent.length > 0 && (
        <div className="mt-10">
          <h2 className="text-[14px] font-semibold uppercase tracking-wider text-ink-soft/70">
            Recent Articles
          </h2>
          <div className="mt-4 overflow-hidden rounded-md border border-line/70">
            <table className="w-full text-left text-[13.5px]">
              <thead className="border-b border-line/70 bg-paper">
                <tr>
                  <th className="px-4 py-3 font-medium text-ink-soft">Title</th>
                  <th className="px-4 py-3 font-medium text-ink-soft">Language</th>
                  <th className="px-4 py-3 font-medium text-ink-soft">Status</th>
                  <th className="px-4 py-3 font-medium text-ink-soft">Date</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((a) => (
                  <tr key={a.id} className="border-b border-line/40 last:border-0">
                    <td className="px-4 py-3 font-medium text-ink">{a.title}</td>
                    <td className="px-4 py-3 uppercase text-ink-soft">{a.language}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11.5px] font-medium ${
                          a.status === "published"
                            ? "bg-pine/10 text-pine"
                            : "bg-brass/10 text-brass-deep"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink-soft">{a.publish_date ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
