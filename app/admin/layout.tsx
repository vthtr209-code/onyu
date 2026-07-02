import { AuthGuard } from "@/components/admin/AuthGuard";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin | Onyu CMS",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AdminShell>{children}</AdminShell>
    </AuthGuard>
  );
}
