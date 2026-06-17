"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  cancelOrder,
  listOrderTrades
} from "@/features/orders/services/OrdersApiService";
import type { TradeResponse } from "@/types/backend";

export const useOrderActions = () => {
  const router = useRouter();
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [tradesError, setTradesError] = useState<string | null>(null);
  const [trades, setTrades] = useState<TradeResponse[]>([]);
  const [isCancelling, startCancelTransition] = useTransition();
  const [isLoadingTrades, startTradesTransition] = useTransition();
  const tradesRequestIdRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const submitCancel = (orderId: string) => {
    setCancelError(null);
    startCancelTransition(async () => {
      try {
        await cancelOrder(orderId);
        router.refresh();
      } catch (error) {
        setCancelError(
          error instanceof Error ? error.message : "Could not cancel order.",
        );
      }
    });
  };

  const loadTrades = (orderId: string) => {
    setTradesError(null);
    setTrades([]);
    abortControllerRef.current?.abort();

    const requestId = tradesRequestIdRef.current + 1;
    tradesRequestIdRef.current = requestId;
    const controller = new AbortController();
    abortControllerRef.current = controller;

    startTradesTransition(async () => {
      try {
        const response = await listOrderTrades(orderId, controller.signal);
        if (tradesRequestIdRef.current !== requestId) {
          return;
        }
        setTrades(response);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        if (tradesRequestIdRef.current !== requestId) {
          return;
        }
        setTradesError(
          error instanceof Error ? error.message : "Could not load trades.",
        );
      }
    });
  };

  const clearTrades = () => {
    abortControllerRef.current?.abort();
    setTrades([]);
    setTradesError(null);
  };

  return {
    cancelError,
    tradesError,
    isCancelling,
    isLoadingTrades,
    trades,
    submitCancel,
    loadTrades,
    clearTrades
  };
};
