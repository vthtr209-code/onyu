"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";

interface Subscriber {
  id: string;
  email: string;
  subscribedDate: string;
}

const mockSubscribers: Subscriber[] = [
  { id: "1", email: "hana.kim@gmail.com", subscribedDate: "2026-06-01" },
  { id: "2", email: "minjun.park@outlook.com", subscribedDate: "2026-06-03" },
  { id: "3", email: "sarah.wilson@protonmail.com", subscribedDate: "2026-06-05" },
  { id: "4", email: "linh.nguyen@gmail.com", subscribedDate: "2026-06-08" },
  { id: "5", email: "jiyoung.lee@naver.com", subscribedDate: "2026-06-10" },
  { id: "6", email: "david.cho@yahoo.com", subscribedDate: "2026-06-12" },
  { id: "7", email: "minh.tran@gmail.com", subscribedDate: "2026-06-15" },
  { id: "8", email: "yuna.oh@hanmail.net", subscribedDate: "2026-06-18" },
  { id: "9", email: "alex.r@company.co.kr", subscribedDate: "2026-06-22" },
  { id: "10", email: "soyeon.j@gmail.com", subscribedDate: "2026-06-25" },
];

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(mockSubscribers);
  const [search, setSearch] = useState("");

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  function handleExportCsv() {
    const csv = [
      "email,subscribed_date",
      ...filtered.map((s) => `${s.email},${s.subscribedDate}`),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `onyu-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleDelete(id: string) {
    setSubscribers(subscribers.filter((s) => s.id !== id));
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
        <button
          onClick={handleExportCsv}
          className="rounded-md border border-line px-4 py-2 text-[13px] font-medium text-ink-soft transition-colors hover:border-brass hover:text-brass-deep"
        >
          Export CSV
        </button>
        <span className="ml-auto text-[12.5px] text-ink-soft/70">
          {filtered.length} subscribers
        </span>
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
            {filtered.map((s) => (
              <tr key={s.id} className="border-b border-line/40 last:border-0">
                <td className="px-4 py-3 text-ink">{s.email}</td>
                <td className="px-4 py-3 text-ink-soft">{s.subscribedDate}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-[12px] font-medium text-red-600/70 hover:text-red-700"
                  >
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
