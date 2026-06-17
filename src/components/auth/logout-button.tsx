"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { clearSession } from "@/lib/auth/auth-service";
import { Icon } from "@/components/admin/icon";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await clearSession();
          router.replace("/login");
          router.refresh();
        });
      }}
      className="text-on-surface-variant transition-colors hover:text-primary disabled:opacity-60"
      aria-label="Sign out"
      title="Sign out"
    >
      <Icon name="logout" className="text-[20px]" />
    </button>
  );
}
