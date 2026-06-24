"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { useRequireAdminSession } from "@/lib/auth/use-require-admin-session";

type AdminRouteGuardProps = {
  children: React.ReactNode;
};

export const AdminRouteGuard = ({ children }: AdminRouteGuardProps) => {
  const { isChecking, isAuthorized } = useRequireAdminSession();

  if (isChecking) {
    return (
      <div
        className="flex h-screen items-center justify-center bg-background text-on-surface-variant"
        data-testid="admin-session-loading"
      >
        Verifying session…
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <AdminLayout>{children}</AdminLayout>;
};
