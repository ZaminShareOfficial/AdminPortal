import { AdminLayout } from "@/components/admin/admin-layout";
import { requireAdminSession } from "@/lib/auth/admin-access";

export default async function AdminRouteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  await requireAdminSession();

  return <AdminLayout>{children}</AdminLayout>;
}
