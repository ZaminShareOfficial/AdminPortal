"use client";

import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "@/lib/api/errors";
import { mapUserPortfolioToRow } from "@/lib/mappers/portfolio";
import type { UserRow } from "@/lib/mappers/portfolio";
import { listUserPortfolios } from "@/lib/services/portfolio-api-service";

type UsersPageData = {
  users: UserRow[];
  totalUsers: number;
  pendingKyc: number;
  error: string | null;
  isLoading: boolean;
};

export const useUsersPageData = (): UsersPageData => {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const portfolios = await listUserPortfolios();
      setUsers(portfolios.map(mapUserPortfolioToRow));
    } catch (loadError) {
      setUsers([]);
      setError(getErrorMessage(loadError, "Could not load users from GET /portfolio."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect justified: data fetch — load user portfolios on mount
  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    totalUsers: users.length,
    pendingKyc: users.filter((user) => user.kyc === "PENDING").length,
    error,
    isLoading
  };
};
