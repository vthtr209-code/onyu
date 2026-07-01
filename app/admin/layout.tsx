import { Sidebar } from "@/components/admin/Sidebar";

export const metadata = {
  title: "Admin | Onyu CMS",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-60 flex-1 bg-ivory px-8 py-8">{children}</main>
    </div>
  );
}
