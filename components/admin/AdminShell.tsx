"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Login page has its own full-page layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-60 flex-1 bg-ivory px-8 py-8">{children}</main>
    </div>
  );
}
