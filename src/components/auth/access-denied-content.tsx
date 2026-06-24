"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { Icon } from "@/components/admin/icon";
import { AUTH } from "@/constants/auth";
import { LOGIN_PATH } from "@/constants/routes";

export const AccessDeniedContent = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div
        className="w-full max-w-md border border-outline-variant/10 bg-surface-container p-8 shadow-2xl"
        data-testid="access-denied-card"
      >
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-error/10">
          <Icon name="block" className="text-3xl text-error" />
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          ZaminShare
        </p>
        <h1 className="mt-2 font-headline text-3xl font-extrabold text-on-surface">
          Access Denied
        </h1>
        <p className="mt-3 text-sm text-on-surface-variant" role="alert">
          {AUTH.NOT_ADMIN_MESSAGE}
        </p>

        <Button
          onPress={() => router.replace(LOGIN_PATH)}
          className="saffron-gradient mt-8 flex w-full items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-widest text-on-primary-fixed"
          data-testid="access-denied-login-link"
        >
          <Icon name="login" className="text-base" />
          Back to Sign In
        </Button>
      </div>
    </div>
  );
};
