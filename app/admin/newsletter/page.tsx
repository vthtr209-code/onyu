"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { PageHeader } from "@/components/admin/PageHeader";

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSubscribers();
  }, []);

  async function loadSubscribers() {
    const { data } = await supabase.from("newsletter").select("*").order("created_at", { ascending: false });
    setSubscribers(data ?? []);
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this subscriber?")) return;
    await supabase.from("newsletter").delete().eq("id", id);
    loadSubscribers();
  }

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  function handleExportCsv() {
    const csv = ["email,subscribed_date", ...filtered.map((s) => `${s.email},${s.created_at.slice(0, 10)}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `onyu-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-4xl">
      <PageHeader title="Newsletter" description="Manage newsletter subscribers" />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-md border border-line bg-paper px-4 py-2 text-[13.5px] text-ink outline-none focus:border-brass focus:ring-1 focus:ring-brass"
        />
        <button onClick={handleExportCsv} className="rounded-md border border-line px-4 py-2 text-[13px] font-medium text-ink-soft transition-colors hover:border-brass hover:text-brass-deep">
          Export CSV
        </button>
        <span className="ml-auto text-[12.5px] text-ink-soft/70">{filtered.length} subscribers</span>
      </div>

      <div className="mt-5 overflow-hidden rounded-md border border-line/70">
        <table className="w-full text-left text-[13.5px]">
          <thead className="border-b border-line/70 bg-paper">
            <tr>
              <th className="px-4 py-3 font-medium text-ink-soft">Email</th>
              <th className="px-4 py-3 font-medium text-ink-soft">Subscribed Date</th>
              <th className="px-4 py-3 font-medium text-ink-soft">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-ink-soft/60">No subscribers yet</td></tr>
            )}
            {filtered.map((s) => (
              <tr key={s.id} className="border-b border-line/40 last:border-0">
                <td className="px-4 py-3 text-ink">{s.email}</td>
                <td className="px-4 py-3 text-ink-soft">{s.created_at.slice(0, 10)}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(s.id)} className="text-[12px] font-medium text-red-600/70 hover:text-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
