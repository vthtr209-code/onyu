import Link from "next/link";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { articles } from "@/lib/data/articles";

export default function DashboardPage() {
  const total = articles.length;
  const published = articles.filter((a) => a.status === "published").length;
  const drafts = articles.filter((a) => a.status === "draft").length;
  const subscribers = 128; // Mock

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
              {articles.slice(0, 8).map((a) => (
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
                  <td className="px-4 py-3 text-ink-soft">{a.publishDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
