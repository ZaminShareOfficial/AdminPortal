import { AdminLayout } from "@/components/admin/admin-layout";
import { requireSession } from "@/lib/auth/session";

export default async function AdminRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireSession();

  return <AdminLayout>{children}</AdminLayout>;
}
