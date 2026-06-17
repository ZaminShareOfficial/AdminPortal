"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  cancelOrder,
  listOrderTrades
} from "@/features/orders/services/orders-client";
import type { TradeResponse } from "@/types/backend";

export const useOrderActions = () => {
  const router = useRouter();
  const [actionError, setActionError] = useState<string | null>(null);
  const [trades, setTrades] = useState<TradeResponse[]>([]);
  const [isPending, startTransition] = useTransition();

  const refresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const submitCancel = useCallback(
    (orderId: string) => {
      setActionError(null);
      startTransition(async () => {
        try {
          await cancelOrder(orderId);
          refresh();
        } catch (error) {
          setActionError(
            error instanceof Error ? error.message : "Could not cancel order.",
          );
        }
      });
    },
    [refresh],
  );

  const loadTrades = useCallback((orderId: string) => {
    setActionError(null);
    setTrades([]);
    startTransition(async () => {
      try {
        const response = await listOrderTrades(orderId);
        setTrades(response);
      } catch (error) {
        setActionError(
          error instanceof Error ? error.message : "Could not load trades.",
        );
      }
    });
  }, []);

  const clearActionError = useCallback(() => setActionError(null), []);

  return {
    actionError,
    isPending,
    trades,
    submitCancel,
    loadTrades,
    clearActionError,
    clearTrades: () => setTrades([])
  };
};
