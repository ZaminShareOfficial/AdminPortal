"use client";

import { AdminRouteGuard } from "@/components/admin/admin-route-guard";

export default function AdminRouteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <AdminRouteGuard>{children}</AdminRouteGuard>;
}
