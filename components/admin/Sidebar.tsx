"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { OnyuLogo } from "@/components/OnyuLogo";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "◈" },
  { href: "/admin/articles", label: "Articles", icon: "◉" },
  { href: "/admin/categories", label: "Categories", icon: "◎" },
  { href: "/admin/media", label: "Media", icon: "▣" },
  { href: "/admin/newsletter", label: "Newsletter", icon: "✉" },
  { href: "/admin/settings", label: "Settings", icon: "⚙" },
];

export function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col border-r border-line/70 bg-paper">
      <div className="flex items-center gap-3 border-b border-line/70 px-5 py-5">
        <OnyuLogo size={28} />
        <div>
          <span className="font-display text-[16px] leading-none text-ink">Onyu</span>
          <span className="ml-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-soft/60">
            Admin
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-[13.5px] font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-brass/10 text-brass-deep"
                    : "text-ink-soft hover:bg-ivory hover:text-ink"
                }`}
              >
                <span className="text-[15px]">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-line/70 px-5 py-4 space-y-2">
        <button
          onClick={async () => {
            const { supabase } = await import("@/lib/supabase/client");
            await supabase.auth.signOut();
          }}
          className="block text-[12.5px] text-red-600/70 transition-colors hover:text-red-700"
        >
          Sign Out
        </button>
        <Link
          href="/en"
          className="block text-[12.5px] text-ink-soft/70 transition-colors hover:text-brass-deep"
        >
          ← View Website
        </Link>
      </div>
    </aside>
  );
}
