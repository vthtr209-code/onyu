"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: string;
  size: string;
  uploadDate: string;
}

const mockMedia: MediaItem[] = [
  { id: "1", name: "burnout-cover.webp", url: "/media/burnout-cover.webp", type: "webp", size: "245 KB", uploadDate: "2026-06-10" },
  { id: "2", name: "career-hero.jpg", url: "/media/career-hero.jpg", type: "jpg", size: "380 KB", uploadDate: "2026-06-15" },
  { id: "3", name: "sleep-research.png", url: "/media/sleep-research.png", type: "png", size: "520 KB", uploadDate: "2026-06-18" },
  { id: "4", name: "onyu-logo.svg", url: "/onyu-logo.svg", type: "svg", size: "12 KB", uploadDate: "2026-06-01" },
  { id: "5", name: "healing-journey.webp", url: "/media/healing-journey.webp", type: "webp", size: "180 KB", uploadDate: "2026-06-22" },
  { id: "6", name: "leadership-team.jpg", url: "/media/leadership-team.jpg", type: "jpg", size: "410 KB", uploadDate: "2026-06-24" },
];

export default function MediaPage() {
  const [items, setItems] = useState<MediaItem[]>(mockMedia);
  const [copied, setCopied] = useState<string | null>(null);

  function handleCopyUrl(url: string, id: string) {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  function handleDelete(id: string) {
    setItems(items.filter((i) => i.id !== id));
  }

  return (
    <div className="max-w-5xl">
      <PageHeader title="Media Library" description="Upload and manage images" />

      {/* Upload Area */}
      <div className="mt-8 flex h-40 items-center justify-center rounded-md border-2 border-dashed border-line bg-paper">
        <div className="text-center">
          <p className="text-[14px] text-ink-soft">
            Drag & drop files here, or{" "}
            <button className="font-medium text-brass-deep hover:underline">
              browse
            </button>
          </p>
          <p className="mt-1 text-[12px] text-ink-soft/60">
            Supports: jpg, png, webp, svg
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-md border border-line/70 bg-paper"
          >
            {/* Preview */}
            <div className="flex h-32 items-center justify-center bg-line/30">
              <span className="text-[24px] text-ink-soft/40">
                {item.type === "svg" ? "◇" : "▣"}
              </span>
            </div>
            <div className="p-3">
              <p className="truncate text-[12.5px] font-medium text-ink">
                {item.name}
              </p>
              <p className="mt-0.5 text-[11px] text-ink-soft/70">
                {item.type.toUpperCase()} · {item.size}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleCopyUrl(item.url, item.id)}
                  className="text-[11px] font-medium text-brass-deep hover:underline"
                >
                  {copied === item.id ? "Copied!" : "Copy URL"}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-[11px] font-medium text-red-600/70 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
