"use client";

import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "@/lib/api/errors";
import { mapAdminUserToRow } from "@/lib/mappers/user";
import type { AdminUserRow } from "@/lib/mappers/user";
import { listUsers } from "@/lib/services/users-api-service";

type UsersPageData = {
  users: AdminUserRow[];
  totalUsers: number;
  activeUsers: number;
  pendingKyc: number;
  error: string | null;
  isLoading: boolean;
};

export const useUsersPageData = (): UsersPageData => {
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await listUsers();
      setUsers(response.map(mapAdminUserToRow));
    } catch (loadError) {
      setUsers([]);
      setError(getErrorMessage(loadError, "Could not load users from GET /admin/users."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect justified: data fetch — load users on mount
  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    totalUsers: users.length,
    activeUsers: users.filter((user) => user.status === "ACTIVE").length,
    pendingKyc: users.filter((user) => user.kyc === "PENDING").length,
    error,
    isLoading
  };
};
