"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AUTH } from "@/constants/auth";
import {
  ACCESS_DENIED_PATH,
  LOGIN_PATH
} from "@/constants/routes";
import { fetchProfile } from "@/features/settings/services/SettingsApiService";
import { isUnauthorizedError } from "@/lib/auth/unauthorized";
import { handleClientUnauthorized } from "@/lib/auth/unauthorized-client";

type AdminSessionState = {
  isChecking: boolean;
  isAuthorized: boolean;
};

export const useRequireAdminSession = (): AdminSessionState => {
  const router = useRouter();
  const [state, setState] = useState<AdminSessionState>({
    isChecking: true,
    isAuthorized: false
  });

  // useEffect justified: data fetch — verify admin session on mount before rendering protected layout
  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      try {
        const profile = await fetchProfile();

        if (!isMounted) {
          return;
        }

        if (profile.role !== AUTH.ADMIN_ROLE) {
          router.replace(ACCESS_DENIED_PATH);
          setState({ isChecking: false, isAuthorized: false });
          return;
        }

        setState({ isChecking: false, isAuthorized: true });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        if (isUnauthorizedError(error)) {
          await handleClientUnauthorized();
          return;
        }

        router.replace(LOGIN_PATH);
        setState({ isChecking: false, isAuthorized: false });
      }
    };

    void verifySession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return state;
};
